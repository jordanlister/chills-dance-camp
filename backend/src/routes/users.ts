import { Router, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { AuthenticatedRequest, ApiResponse } from '../types';

const router = Router();

// GET /api/users/profile
router.get('/profile',
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const response: ApiResponse = {
      success: true,
      data: req.user,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  })
);

export default router;