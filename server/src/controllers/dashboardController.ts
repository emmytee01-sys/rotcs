import { Response } from 'express';
import pool from '../config/db.js';
import { RowDataPacket } from 'mysql2';
import { AuthRequest } from '../middlewares/authMiddleware.js';

export const getDashboardStats = async (req: AuthRequest, res: Response): Promise<void> => {
    const { state_id, role } = req.user!;

    try {
        // Multi-tenant logic: filter by state_id if the user is a state_admin
        const whereClause = role === 'state_admin' ? 'WHERE state_id = ?' : '';
        const params = role === 'state_admin' ? [state_id] : [];

        // Fetch aggregated metrics from daily_metrics
        const [stats] = await pool.query<RowDataPacket[]>(
            `SELECT 
                SUM(total_wager) as total_wager, 
                SUM(total_payout) as total_payout, 
                SUM(ggr) as total_ggr, 
                SUM(tax_due) as total_tax_due,
                SUM(active_users) as total_active_users
             FROM daily_metrics 
             ${whereClause}`,
            params
        );

        // Fetch operator status summary for the state
        const [operatorStatus] = await pool.query<RowDataPacket[]>(
            `SELECT status, COUNT(*) as count 
             FROM operators 
             ${whereClause} 
             GROUP BY status`,
            params
        );

        res.status(200).json({
            metrics: stats[0],
            operatorStatus
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getOperators = async (req: AuthRequest, res: Response): Promise<void> => {
    const { state_id, role } = req.user!;

    try {
        const whereClause = role === 'state_admin' ? 'WHERE state_id = ?' : '';
        const params = role === 'state_admin' ? [state_id] : [];

        const [operators] = await pool.query<RowDataPacket[]>(
            `SELECT * FROM operators ${whereClause}`,
            params
        );

        res.status(200).json(operators);
    } catch (error) {
        console.error('Error fetching operators:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/** Get territorial/LGA rankings for a state (Ondo, Taraba) from DB. */
export const getTerritorial = async (req: AuthRequest, res: Response): Promise<void> => {
    const { state_id, role } = req.user!;

    try {
        const sid = role === 'state_admin' ? state_id : Number(req.query.state_id);
        if (!sid) {
            res.status(400).json({ message: 'state_id required for territorial data' });
            return;
        }
        if (role === 'state_admin' && sid !== state_id) {
            res.status(403).json({ message: 'Access denied to other state data' });
            return;
        }

        const [states] = await pool.query<RowDataPacket[]>(
            `SELECT id, name, code FROM states WHERE id = ?`,
            [sid]
        );
        if (!states.length) {
            res.status(404).json({ message: 'State not found' });
            return;
        }
        const state = states[0];

        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT 
                l.id as lga_id,
                l.name as territory,
                COALESCE(SUM(m.active_users), 0) as users,
                COALESCE(SUM(m.ggr), 0) as ggr,
                COALESCE(SUM(m.total_payout), 0) as playerWins,
                COALESCE(SUM(m.total_wager - m.total_payout), 0) as playerLosses
             FROM lgas l
             LEFT JOIN lga_daily_metrics m ON m.lga_id = l.id AND m.report_date = CURDATE()
             WHERE l.state_id = ?
             GROUP BY l.id, l.name
             ORDER BY ggr DESC`,
            [sid]
        );

        const colors = ['#1890ff', '#52c41a', '#fa8c16', '#eb2f96', '#13c2c2'];
        const lgas = (rows as any[]).map((r, i) => ({
            territory: r.territory,
            users: Number(r.users) || 0,
            ggr: Number(r.ggr) || 0,
            playerWins: Number(r.playerWins) || 0,
            playerLosses: Number(r.playerLosses) || 0,
            penetration: r.users ? Math.min(15, (Number(r.users) / 2000) + 5) : 0,
            color: colors[i % colors.length],
        }));

        res.status(200).json({
            state: state.name,
            stateCode: state.code,
            lgas,
        });
    } catch (error) {
        console.error('Error fetching territorial:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/** Get player winning withholding summary for the current state (Taraba). */
export const getWithholding = async (req: AuthRequest, res: Response): Promise<void> => {
    const { state_id, role } = req.user!;

    const emptyResponse = () =>
        res.status(200).json({ withholdingTaxRate: 0, totalPayout: 0, taxWithheld: 0, byOperator: [] });

    try {
        if (role !== 'state_admin' || !state_id) {
            emptyResponse();
            return;
        }

        let rate = 0;
        try {
            const [taxRule] = await pool.query<RowDataPacket[]>(
                `SELECT withholding_tax_rate FROM tax_rules WHERE state_id = ? AND effective_from <= CURDATE() ORDER BY effective_from DESC LIMIT 1`,
                [state_id]
            );
            rate = taxRule.length ? Number((taxRule[0] as any).withholding_tax_rate) || 0 : 0;
        } catch (err: unknown) {
            const e = err as { errno?: number; code?: string };
            if (e.errno === 1054 || e.code === 'ER_BAD_FIELD_ERROR') {
                console.warn('tax_rules.withholding_tax_rate missing. Run: ALTER TABLE tax_rules ADD COLUMN withholding_tax_rate DECIMAL(5,2) NOT NULL DEFAULT 0 AFTER tax_rate;');
                emptyResponse();
                return;
            }
            throw err;
        }

        const [metrics] = await pool.query<RowDataPacket[]>(
            `SELECT 
                o.id as operator_id,
                o.name as operator_name,
                SUM(dm.total_payout) as total_payout,
                SUM(dm.total_wager) as total_wager,
                SUM(dm.ggr) as total_ggr
             FROM daily_metrics dm
             JOIN operators o ON o.id = dm.operator_id
             WHERE dm.state_id = ? AND dm.report_date = CURDATE()
             GROUP BY o.id, o.name`,
            [state_id]
        );

        const totalPayout = (metrics as any[]).reduce((sum, r) => sum + Number(r.total_payout || 0), 0);
        const taxWithheld = rate ? (totalPayout * rate) / 100 : 0;

        const byOperator = (metrics as any[]).map((r) => ({
            operator_id: r.operator_id,
            operator_name: r.operator_name,
            total_payout: Number(r.total_payout) || 0,
            tax_withheld: rate ? (Number(r.total_payout) * rate) / 100 : 0,
        }));

        res.status(200).json({
            withholdingTaxRate: rate,
            totalPayout,
            taxWithheld,
            byOperator,
        });
    } catch (error) {
        console.error('Error fetching withholding:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
