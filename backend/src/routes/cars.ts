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
      // Try to parse as JSON if it looks like JSON
      if (req.body.event_suitability.trim().startsWith('[') || req.body.event_suitability.trim().startsWith('{')) {
        try {
          req.body.event_suitability = JSON.parse(req.body.event_suitability);
        } catch (parseError) {
          // If parsing fails, treat as comma-separated string
          const items = req.body.event_suitability.split(',').map((e: string) => e.trim()).filter((e: string) => e);
          req.body.event_suitability = items;
        }
      } else {
        // If it doesn't look like JSON, treat as comma-separated string
        const items = req.body.event_suitability.split(',').map((e: string) => e.trim()).filter((e: string) => e);
        req.body.event_suitability = items;
      }
    }
    if (req.body.specs && typeof req.body.specs === 'string') {
      if (req.body.specs.trim().startsWith('[') || req.body.specs.trim().startsWith('{')) {
        try {
          req.body.specs = JSON.parse(req.body.specs);
        } catch (parseError) {
          // If parsing fails, leave as is or set to empty object
          req.body.specs = {};
        }
      }
    }
    next();
  } catch (error) {
    console.error('Error parsing car data:', error);
    next(); // Let controller handle the error
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
