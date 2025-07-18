import { Server as SocketIOServer, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { JWTPayload, UserRole } from '../types';

interface AuthenticatedSocket extends Socket {
  user?: {
    id: string;
    email: string;
    role: UserRole;
  };
}

export const initializeWebSocket = (io: SocketIOServer): void => {
  // Authentication middleware for WebSocket
  io.use((socket: AuthenticatedSocket, next) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error('Authentication token required'));
      }

      if (!process.env.JWT_SECRET) {
        return next(new Error('JWT secret not configured'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
      
      socket.user = {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role,
      };

      next();
    } catch (error) {
      next(new Error('Invalid authentication token'));
    }
  });

  io.on('connection', (socket: AuthenticatedSocket) => {
    console.log(`User ${socket.user?.email} connected via WebSocket`);

    // Join role-based rooms
    if (socket.user) {
      socket.join(socket.user.role.toLowerCase());
      socket.join(`user_${socket.user.id}`);
    }

    // Handle RSVP updates
    socket.on('rsvp:update', (data) => {
      console.log('RSVP update received:', data);
      // Broadcast to all connected clients
      io.emit('rsvp:update', data);
    });

    // Handle class updates
    socket.on('class:update', (data) => {
      console.log('Class update received:', data);
      // Broadcast to all connected clients
      io.emit('class:update', data);
    });

    // Handle announcements
    socket.on('announcement', (data) => {
      console.log('Announcement received:', data);
      
      if (data.targetRoles && data.targetRoles.length > 0) {
        // Send to specific roles
        data.targetRoles.forEach((role: UserRole) => {
          io.to(role.toLowerCase()).emit('announcement', data);
        });
      } else {
        // Send to all connected clients
        io.emit('announcement', data);
      }
    });

    // Handle user status updates
    socket.on('user:status', (data) => {
      socket.broadcast.emit('user:status', {
        userId: socket.user?.id,
        online: true,
        ...data,
      });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`User ${socket.user?.email} disconnected from WebSocket`);
      
      // Broadcast user offline status
      socket.broadcast.emit('user:status', {
        userId: socket.user?.id,
        online: false,
      });
    });

    // Handle errors
    socket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });

  console.log('WebSocket server initialized with authentication');
};