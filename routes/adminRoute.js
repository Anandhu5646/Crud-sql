
import express from 'express';
import AdminController from '../controllers/adminController.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router();

router.post('/activateUser/:userId', isAdmin,AdminController.activateUser );
router.post('/deactivateUser/:userId', isAdmin, AdminController.deactivateUser);

export default router;

