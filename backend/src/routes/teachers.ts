import { Router, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { AuthenticatedRequest, ApiResponse } from '../types';

const router = Router();

// GET /api/teachers
router.get('/',
  asyncHandler(async (_req: AuthenticatedRequest, res: Response) => {
    const response: ApiResponse = {
      success: true,
      data: [],
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  })
);

export default router;