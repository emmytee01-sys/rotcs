import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import { testConnection } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', message: 'ROTCS Backend is running' });
});

app.get('/api/health/db', async (req: Request, res: Response) => {
    const result = await testConnection();
    if (result.ok) {
        res.status(200).json({ status: 'OK', db: 'connected' });
    } else {
        res.status(503).json({ status: 'ERROR', db: 'disconnected', error: result.error });
    }
});

app.listen(PORT, async () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    const db = await testConnection();
    if (db.ok) {
        console.log('✅ Database connected');
    } else {
        console.error('❌ Database connection failed:', db.error);
        console.error('   → Start MySQL (e.g. brew services start mysql, or mysql.server start)');
        console.error('   → If using a different host/port, set DB_HOST and DB_PORT in server/.env');
        console.error('   → Then run: mysql -u root < database/schema.sql && mysql -u root < database/seed.sql');
    }
});
