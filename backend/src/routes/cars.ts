import express from 'express';
import {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} from '../controllers/carController';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { upload } from '../middleware/upload';
import { validate, carSchema } from '../utils/validation';

const router = express.Router();

router.get('/', getCars);
router.get('/:id', getCarById);
router.post(
  '/',
  authenticateToken,
  requireAdmin,
  upload.single('image'),
  validate(carSchema),
  createCar
);
router.put(
  '/:id',
  authenticateToken,
  requireAdmin,
  upload.single('image'),
  updateCar
);
router.delete('/:id', authenticateToken, requireAdmin, deleteCar);

export default router;
