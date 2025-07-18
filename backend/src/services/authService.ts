import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';
import { createUnauthorizedError, createValidationError, createConflictError } from '../middleware/errorHandler';
import { JWTPayload, UserRole } from '../types';

const prisma = new PrismaClient();

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResult {
  user: Omit<User, 'passwordHash'>;
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET!;
  private readonly JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
  private readonly BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || '12');

  async register(data: RegisterData): Promise<AuthResult> {
    const { email, password, firstName, lastName, role = UserRole.STUDENT } = data;

    // Validate input
    if (!email || !password || !firstName || !lastName) {
      throw createValidationError('All fields are required');
    }

    if (password.length < 8) {
      throw createValidationError('Password must be at least 8 characters long');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw createValidationError('Invalid email format');
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      throw createConflictError('User with this email already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, this.BCRYPT_ROUNDS);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        firstName,
        lastName,
        role,
      },
    });

    // If role is TEACHER, create teacher profile
    if (role === UserRole.TEACHER) {
      await prisma.teacher.create({
        data: {
          userId: user.id,
          specialties: [],
        },
      });
    }

    // Generate tokens
    const tokens = await this.generateTokens(user);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  async login(data: LoginData): Promise<AuthResult> {
    const { email, password } = data;

    if (!email || !password) {
      throw createValidationError('Email and password are required');
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        teacher: true,
      },
    });

    if (!user || !user.isActive) {
      throw createUnauthorizedError('Invalid credentials');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      // Log failed attempt
      await this.logAuditEvent(user.id, 'LOGIN_FAILED', 'USER', user.id);
      throw createUnauthorizedError('Invalid credentials');
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Generate tokens
    const tokens = await this.generateTokens(user);

    // Log successful login
    await this.logAuditEvent(user.id, 'LOGIN_SUCCESS', 'USER', user.id);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      // Verify refresh token
      const decoded = jwt.verify(refreshToken, this.JWT_REFRESH_SECRET) as JWTPayload;

      // Check if refresh token exists in database
      const storedToken = await prisma.refreshToken.findFirst({
        where: {
          userId: decoded.userId,
          expiresAt: { gt: new Date() },
        },
        include: {
          user: true,
        },
      });

      if (!storedToken || !storedToken.user.isActive) {
        throw createUnauthorizedError('Invalid refresh token');
      }

      // Revoke old token
      await prisma.refreshToken.delete({
        where: { id: storedToken.id },
      });

      // Generate new tokens
      return await this.generateTokens(storedToken.user);
    } catch (error) {
      throw createUnauthorizedError('Invalid refresh token');
    }
  }

  async logout(userId: string, _refreshToken?: string): Promise<void> {
    // Revoke all refresh tokens for user
    await prisma.refreshToken.deleteMany({
      where: { userId },
    });

    // Log logout
    await this.logAuditEvent(userId, 'LOGOUT', 'USER', userId);
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    if (newPassword.length < 8) {
      throw createValidationError('New password must be at least 8 characters long');
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw createUnauthorizedError('User not found');
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isValidPassword) {
      throw createUnauthorizedError('Current password is incorrect');
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, this.BCRYPT_ROUNDS);

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash: newPasswordHash },
    });

    // Revoke all refresh tokens to force re-login
    await prisma.refreshToken.deleteMany({
      where: { userId },
    });

    // Log password change
    await this.logAuditEvent(userId, 'PASSWORD_CHANGED', 'USER', userId);
  }

  private async generateTokens(user: User): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role as UserRole,
    };

    const jwtSecret = this.JWT_SECRET;
    const jwtRefreshSecret = this.JWT_REFRESH_SECRET;

    if (!jwtSecret || !jwtRefreshSecret) {
      throw new Error('JWT secrets not configured');
    }

    // Generate access token - use literal values to avoid TypeScript issues
    const accessToken = jwt.sign(payload, jwtSecret, { expiresIn: '15m' });

    // Generate refresh token  
    const refreshToken = jwt.sign(payload, jwtRefreshSecret, { expiresIn: '7d' });

    // Store refresh token in database
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    const tokenHash = await bcrypt.hash(refreshToken, 1);
    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt,
      },
    });

    return { accessToken, refreshToken };
  }

  private sanitizeUser(user: User): Omit<User, 'passwordHash'> {
    const { passwordHash, ...sanitizedUser } = user;
    return sanitizedUser;
  }

  private async logAuditEvent(
    userId: string,
    action: string,
    resource: string,
    resourceId?: string,
    details?: Record<string, any>
  ): Promise<void> {
    const auditData: any = {
      userId,
      action,
      resource,
      ipAddress: '127.0.0.1', // This should be passed from request
    };

    if (resourceId) {
      auditData.resourceId = resourceId;
    }

    if (details) {
      auditData.details = details;
    }

    await prisma.auditLog.create({
      data: auditData,
    });
  }

  async cleanupExpiredTokens(): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: {
        expiresAt: { lt: new Date() },
      },
    });
  }
}