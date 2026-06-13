import express from 'express';
import { getUsers, blockUser, deleteUser } from '../controllers/usermanageController';
import { protect } from '../middlewares/authMiddleware';
import { admin } from '../middlewares/adminMiddleware';

const router = express.Router();

router.route('/').get(protect, admin, getUsers);
router.route('/:id/block').put(protect, admin, blockUser);
router.route('/:id').delete(protect, admin, deleteUser);

export default router;
