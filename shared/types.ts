export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  profilePhoto?: string;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
  teacher?: Teacher;
}

export interface Teacher {
  id: string;
  userId: string;
  bio?: string;
  profilePhoto?: string;
  specialties: string[];
  contactInfo?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  user?: User;
}

export interface Class {
  id: string;
  title: string;
  description?: string;
  instructorId: string;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  type: ClassType;
  location?: string;
  requirements: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  instructor?: Teacher;
  rsvps?: RSVP[];
  interviews?: Interview[];
  currentRSVPs?: number;
}

export interface RSVP {
  id: string;
  userId: string;
  classId: string;
  status: RSVPStatus;
  createdAt: string;
  updatedAt: string;
  user?: User;
  class?: Class;
}

export interface Interview {
  id: string;
  classId: string;
  scheduledTime: string;
  type: InterviewType;
  notes?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  class?: Class;
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

export interface AuthResult {
  user: User;
  accessToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
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
    changes: Partial<Class>;
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

export interface SystemSettings {
  registrationOpen: boolean;
  maxRSVPsPerUser: number;
  rsvpCancellationHours: number;
  emailNotifications: boolean;
  maintenanceMode: boolean;
  announcementBanner?: string;
}