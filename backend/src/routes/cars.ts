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

const parseCarData = (req: any, res: any, next: any) => {
  try {
    if (req.body.event_suitability && typeof req.body.event_suitability === 'string') {
      // Only parse if it looks like a JSON array/object or if it's not empty
      if (req.body.event_suitability.startsWith('[') || req.body.event_suitability.startsWith('{')) {
        req.body.event_suitability = JSON.parse(req.body.event_suitability);
      }
    }
    if (req.body.specs && typeof req.body.specs === 'string') {
      if (req.body.specs.startsWith('[') || req.body.specs.startsWith('{')) {
        req.body.specs = JSON.parse(req.body.specs);
      }
    }
    next();
  } catch (error) {
    next(); // Let Joi handle invalid data structure
  }
};

router.post(
  '/',
  authenticateToken,
  requireAdmin,
  upload.single('image'),
  parseCarData,
  validate(carSchema),
  createCar
);
router.put(
  '/:id',
  authenticateToken,
  requireAdmin,
  upload.single('image'),
  parseCarData,
  updateCar
);
router.delete('/:id', authenticateToken, requireAdmin, deleteCar);

export default router;
