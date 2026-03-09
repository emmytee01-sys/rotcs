import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { getDashboardStats, getOperators, getTerritorial, getWithholding } from '../controllers/dashboardController.js';

const router = express.Router();

router.use(authenticate);

router.get('/stats', getDashboardStats);
router.get('/operators', getOperators);
router.get('/territorial', getTerritorial);
router.get('/withholding', getWithholding);

export default router;
