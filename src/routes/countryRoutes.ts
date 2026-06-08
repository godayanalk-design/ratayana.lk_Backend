import { Router } from 'express';
import {
  getAllCountries,
  getCountryById,
  deleteCountry,
  createCountry,
  updateCountry
} from '../controllers/countryController';
import { protect } from '../middlewares/authMiddleware';
import { admin } from '../middlewares/adminMiddleware';
import upload from '../utils/upload';

const router = Router();

router.route('/')
  .get(getAllCountries)
  .post(
    protect, 
    admin, 
    upload.fields([{ name: 'cardImage', maxCount: 1 }, { name: 'bannerImage', maxCount: 1 }]), 
    createCountry
  );

router.route('/:id')
  .get(getCountryById)
  .put(
    protect, 
    admin, 
    upload.fields([{ name: 'cardImage', maxCount: 1 }, { name: 'bannerImage', maxCount: 1 }]), 
    updateCountry
  )
  .delete(protect, admin, deleteCountry);

export default router;
