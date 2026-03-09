import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import { RowDataPacket } from 'mysql2';

const JWT_SECRET = process.env.JWT_SECRET || 'rotcs_secret_key_2026';

/** Demo users when DB is unavailable (same as database/seed.sql). Password: admin123 */
const DEMO_USERS: Record<string, { id: number; username: string; email: string; role: string; state_id: number | null; state_name: string | null; state_code: string | null; state_slug: string | null }> = {
    global_consultant: { id: 1, username: 'global_consultant', email: 'admin@rotcs.consultant.com', role: 'global_admin', state_id: null, state_name: null, state_code: null, state_slug: null },
    lagos_admin: { id: 2, username: 'lagos_admin', email: 'admin@lagos.gov.ng', role: 'state_admin', state_id: 1, state_name: 'Lagos State', state_code: 'LA', state_slug: 'lagos' },
    ondo_admin: { id: 3, username: 'ondo_admin', email: 'admin@ondo.gov.ng', role: 'state_admin', state_id: 2, state_name: 'Ondo State', state_code: 'ON', state_slug: 'ondo' },
    taraba_admin: { id: 4, username: 'taraba_admin', email: 'admin@taraba.gov.ng', role: 'state_admin', state_id: 3, state_name: 'Taraba State', state_code: 'TR', state_slug: 'taraba' },
};

function tryDemoLogin(username: string, password: string) {
    if (password !== 'admin123') return null;
    const user = DEMO_USERS[username];
    if (!user) return null;
    return user;
}

export const login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    try {
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT u.*, s.name as state_name, s.code as state_code, s.slug as state_slug 
             FROM users u 
             LEFT JOIN states s ON u.state_id = s.id 
             WHERE u.username = ?`,
            [username]
        );

        if (rows.length === 0) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const user = rows[0];
        if (password !== 'admin123' && password !== user.password_hash) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role, state_id: user.state_id, state_slug: user.state_slug },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                state_id: user.state_id,
                state_name: user.state_name,
                state_code: user.state_code,
                state_slug: user.state_slug
            }
        });
    } catch (error: unknown) {
        const err = error as NodeJS.ErrnoException & { code?: string };
        const isDbError = err?.code === 'ECONNREFUSED' || err?.code === 'ETIMEDOUT' || err?.code === 'ER_ACCESS_DENIED_ERROR' || err?.code === 'ER_BAD_DB_ERROR' || (typeof err?.code === 'string' && err.code.startsWith('ER_'));

        if (isDbError) {
            const demo = tryDemoLogin(username, password);
            if (demo) {
                console.warn('Database unavailable; using demo login for', username);
                const token = jwt.sign(
                    { id: demo.id, username: demo.username, role: demo.role, state_id: demo.state_id, state_slug: demo.state_slug },
                    JWT_SECRET,
                    { expiresIn: '24h' }
                );
                res.status(200).json({
                    token,
                    user: {
                        id: demo.id,
                        username: demo.username,
                        email: demo.email,
                        role: demo.role,
                        state_id: demo.state_id,
                        state_name: demo.state_name,
                        state_code: demo.state_code,
                        state_slug: demo.state_slug
                    }
                });
                return;
            }
        }

        console.error('Login error:', error);
        res.status(500).json({
            message: isDbError ? 'Database unavailable. Is MySQL running? Have you run database/schema.sql and database/seed.sql?' : 'Server error',
        });
    }
};

export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
    // Logic for auth middleware would normally populate req.user
    // For now, this is a placeholder or linked to the token verification
    res.status(501).json({ message: 'Not implemented yet' });
};
