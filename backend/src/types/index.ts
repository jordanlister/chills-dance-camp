import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: UserRole;
  };
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  VIDEOGRAPHER = 'VIDEOGRAPHER',
  ADMIN = 'ADMIN',
}

export enum RSVPStatus {
  CONFIRMED = 'CONFIRMED',
  WAITLIST = 'WAITLIST',
  CANCELLED = 'CANCELLED',
}

export enum ClassType {
  REGULAR = 'REGULAR',
  SPECIAL = 'SPECIAL',
  BREAK = 'BREAK',
}

export enum InterviewType {
  BEFORE_CLASS = 'BEFORE_CLASS',
  AFTER_CLASS = 'AFTER_CLASS',
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ClassScheduleData {
  id: string;
  title: string;
  description?: string;
  instructor: string;
  instructorId: string;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  currentRSVPs: number;
  type: ClassType;
  location?: string;
  requirements?: string[];
  rsvps?: RSVPData[];
  interview?: InterviewData;
}

export interface RSVPData {
  id: string;
  userId: string;
  classId: string;
  status: RSVPStatus;
  createdAt: string;
  user?: UserData;
}

export interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  profilePhoto?: string;
  createdAt: string;
  updatedAt: string;
  teacher?: TeacherData;
}

export interface TeacherData {
  id: string;
  userId: string;
  bio?: string;
  profilePhoto?: string;
  specialties: string[];
  contactInfo?: string;
  user?: UserData;
}

export interface InterviewData {
  id: string;
  classId: string;
  scheduledTime: string;
  type: InterviewType;
  notes?: string;
  completed: boolean;
}

export interface AuditLogData {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  ipAddress: string;
  userAgent?: string;
  timestamp: string;
  details?: Record<string, any>;
}

export interface WebSocketEvents {
  'rsvp:update': {
    classId: string;
    userId: string;
    status: RSVPStatus;
    currentCount: number;
  };
  'class:update': {
    classId: string;
    changes: Partial<ClassScheduleData>;
  };
  'announcement': {
    title: string;
    message: string;
    targetRoles?: UserRole[];
    urgent?: boolean;
  };
  'user:status': {
    userId: string;
    online: boolean;
  };
}

export interface EmailNotification {
  to: string;
  subject: string;
  template: string;
  data: Record<string, any>;
  priority?: 'high' | 'normal' | 'low';
}

export interface SystemSettings {
  registrationOpen: boolean;
  maxRSVPsPerUser: number;
  rsvpCancellationHours: number;
  emailNotifications: boolean;
  maintenanceMode: boolean;
  announcementBanner?: string;
}