import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { asyncHandler } from '../middleware/errorHandler';
import { AuthenticatedRequest, ApiResponse } from '../types';

const prisma = new PrismaClient();
const router = Router();

// GET /api/classes
router.get('/',
  asyncHandler(async (_req: AuthenticatedRequest, res: Response) => {
    const classes = await prisma.class.findMany({
      include: {
        instructor: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              }
            }
          }
        },
        _count: {
          select: {
            rsvps: true
          }
        }
      },
      orderBy: {
        startTime: 'asc'
      }
    });

    const response: ApiResponse = {
      success: true,
      data: classes,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  })
);

export default router;