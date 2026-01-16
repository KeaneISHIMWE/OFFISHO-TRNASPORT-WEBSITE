import express from 'express';
import {
  getRequests,
  getRequestById,
  createRequest,
  updateRequestStatus,
  deleteRequest,
} from '../controllers/requestController';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { validate, requestSchema } from '../utils/validation';

const router = express.Router();

router.get('/', authenticateToken, getRequests);
router.get('/:id', authenticateToken, getRequestById);
router.post('/', authenticateToken, validate(requestSchema), createRequest);
router.put('/:id/status', authenticateToken, requireAdmin, updateRequestStatus);
router.delete('/:id', authenticateToken, deleteRequest);

export default router;
