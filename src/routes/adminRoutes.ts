import express from 'express';
import User from '../models/User';
import Country from '../models/Country';
import { protect } from '../middlewares/authMiddleware';
import { admin } from '../middlewares/adminMiddleware';

const router = express.Router();

router.get('/stats', protect, admin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCountries = await Country.countDocuments();
    res.json({ users: totalUsers, countries: totalCountries });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ message: 'Server error fetching stats' });
  }
});

export default router;
