# Chills Dance Camp Schedule System - Architecture Documentation

## Project Overview

The Chills Dance Camp Schedule System is a comprehensive full-stack web application designed to manage dance camp schedules with role-based access for students, teachers, videographers, and administrators. The system features real-time RSVP functionality, professional video production coordination, and comprehensive security measures.

**About Chills Dance Camp**: Located in Los Angeles, Chills Dance Camp is where feminine energy, technique, and community come together — creating a dance experience you'll never forget. The camp offers 12 intensive dance classes with top instructors, empowering lectures and discussions, and creative networking sessions, all in partnership with Vamp Heels.

**Reference Website**: https://www.chillsdance.com/home  
**Current Status**: ✅ MVP Complete - Dark theme UI with coral gradient branding  
**Last Updated**: January 2025

## Current Implementation Status

### ✅ Completed Features
- **Authentication System**: JWT with refresh tokens, bcrypt password hashing
- **Database**: PostgreSQL with Prisma ORM, complete schema with relationships
- **Backend API**: Express.js with comprehensive security middleware
- **Frontend UI**: React with TypeScript, dark theme with coral gradient
- **Schedule Display**: Static schedule data with animations and transitions
- **Role-Based Access**: Student, Teacher, Videographer, Admin roles
- **Security**: Rate limiting, CORS, Helmet.js, input validation
- **Real-time Setup**: WebSocket infrastructure with Socket.io

### 🔄 In Progress
- **Dynamic Schedule**: Currently uses static data, needs API integration
- **RSVP System**: Backend ready, frontend integration needed
- **User Management**: Basic functionality complete, advanced features pending

### 📋 Pending Features
- **Email Notifications**: Integration with email service
- **Calendar Export**: iCal/Google Calendar integration
- **File Uploads**: Profile pictures and media
- **PWA Features**: Service worker and offline capabilities
- **Analytics Dashboard**: Usage metrics and reporting

## Architecture Overview

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│   (React TS)    │◄──►│  (Node/Express) │◄──►│  (PostgreSQL)   │
│                 │    │                 │    │                 │
│ • PWA Features  │    │ • JWT Auth      │    │ • Prisma ORM    │
│ • Tailwind CSS  │    │ • Rate Limiting │    │ • ACID Txns     │
│ • WebSocket     │    │ • Security      │    │ • Indexing      │
│ • State Mgmt    │    │ • Real-time     │    │ • Constraints   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                        │                        │
        │                        │                        │
        ▼                        ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  External APIs  │    │   File Storage  │    │   Monitoring    │
│                 │    │                 │    │                 │
│ • Email Service │    │ • Profile Pics  │    │ • Error Tracking│
│ • Calendar API  │    │ • Class Media   │    │ • Performance   │
│ • SMS Service   │    │ • Exports       │    │ • Uptime        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## System Architecture

### 1. Frontend Architecture (React + TypeScript)

#### Technology Stack
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS v3 with custom coral/pink gradient theme
- **State Management**: Zustand for global state
- **Build Tool**: Vite for fast development
- **PWA**: Service Worker for offline capabilities (pending)
- **Real-time**: WebSocket client for live updates
- **Theme**: Dark theme with coral gradient branding (#ff6b6b → #9a4560)

#### Component Architecture
```
src/
├── components/
│   ├── common/          # Reusable UI components
│   ├── layout/          # Layout components
│   ├── auth/            # Authentication components
│   ├── schedule/        # Schedule-related components
│   ├── rsvp/            # RSVP functionality
│   └── user/            # User profile components
├── pages/               # Route components
├── hooks/               # Custom React hooks
├── store/               # Zustand stores
├── services/            # API services
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
└── assets/              # Static assets
```

#### Key Features
- **Responsive Design**: Mobile-first approach with breakpoints
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Code splitting, lazy loading, memoization
- **Error Handling**: Error boundaries and graceful fallbacks
- **Offline Support**: Service worker caching strategies

### 2. Backend Architecture (Node.js + Express)

#### Technology Stack
- **Runtime**: Node.js 18+
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with refresh tokens
- **Real-time**: Socket.io for WebSocket connections
- **Security**: Comprehensive middleware stack

#### API Architecture
```
src/
├── controllers/         # Route handlers
├── middleware/          # Express middleware
├── models/              # Prisma models
├── routes/              # API route definitions
├── services/            # Business logic
├── utils/               # Utility functions
├── validators/          # Input validation schemas
├── websocket/           # Socket.io handlers
└── types/               # TypeScript definitions
```

#### Security Implementation
- **Authentication**: JWT tokens with 15-minute expiry
- **Authorization**: Role-based access control (RBAC)
- **Rate Limiting**: 100 requests/minute per IP
- **Input Validation**: Joi/Zod schemas for all endpoints
- **Password Security**: Bcrypt with 12 rounds
- **Headers**: Helmet.js for security headers
- **CORS**: Restricted to production domain
- **SQL Injection**: Parameterized queries via Prisma

### 3. Database Architecture (PostgreSQL)

#### Database Schema

```sql
-- Core Tables
Users (id, email, password_hash, role, created_at, updated_at)
Teachers (id, user_id, bio, profile_photo, specialties)
Classes (id, title, description, instructor_id, capacity, date, start_time, end_time)
RSVPs (id, user_id, class_id, status, created_at)
Interviews (id, class_id, scheduled_time, type, notes)

-- System Tables
RefreshTokens (id, user_id, token_hash, expires_at)
AuditLogs (id, user_id, action, resource, timestamp, ip_address)
SystemSettings (key, value, updated_at)
```

#### Key Design Decisions
- **Normalization**: 3NF for data consistency
- **Indexing**: Strategic indexes on foreign keys and query patterns
- **Constraints**: Foreign keys, check constraints, unique constraints
- **Transactions**: ACID compliance for critical operations
- **Scalability**: Prepared for horizontal scaling with read replicas

### 4. Real-time Architecture

#### WebSocket Implementation
- **Connection Management**: User authentication via JWT
- **Room Management**: Users join rooms based on their role
- **Event Types**: RSVP updates, class changes, announcements
- **Fallback**: Server-sent events for limited WebSocket support

#### Event Flow
```
Client Action → API Endpoint → Database Update → WebSocket Broadcast → Client Update
```

## Security Architecture

### Authentication & Authorization

#### JWT Token Strategy
```
Access Token (15 min) + Refresh Token (7 days)
│
├── Automatic refresh on API calls
├── Secure HTTP-only cookies for refresh tokens
├── Token rotation on refresh
└── Revocation on logout/suspicious activity
```

#### Role-Based Access Control
- **Students**: View schedule, manage own RSVPs
- **Teachers**: Manage own classes, view student lists
- **Videographer**: Full schedule access, interview timeline
- **Admin**: Full system access, user management

### Data Protection
- **Encryption at Rest**: Database-level encryption
- **Encryption in Transit**: TLS 1.3 for all communications
- **PII Protection**: Minimal data collection, secure storage
- **Session Management**: 30-minute timeout, secure cookies

## Performance Architecture

### Frontend Optimization
- **Bundle Splitting**: Route-based code splitting
- **Lazy Loading**: Components and images loaded on demand
- **Caching**: Browser caching for static assets
- **Compression**: Gzip/Brotli compression
- **CDN**: Static asset delivery via CDN

### Backend Optimization
- **Database**: Connection pooling, query optimization
- **Caching**: Redis for session data and frequent queries
- **Compression**: Response compression middleware
- **Rate Limiting**: Prevent abuse and ensure fair usage

## Deployment Architecture

### Production Environment
```
Internet → Load Balancer → Web Servers → Database
           │
           ├── SSL Termination
           ├── DDoS Protection
           └── Health Checks
```

### Hosting Strategy
- **Primary**: Railway for full-stack deployment
- **Alternative**: Vercel (frontend) + Render (backend)
- **Database**: Managed PostgreSQL with automated backups
- **CDN**: Cloudflare for static assets and DDoS protection

### CI/CD Pipeline
```
Git Push → GitHub Actions → Tests → Security Scan → Deploy → Monitor
```

## Monitoring & Observability

### Application Monitoring
- **Error Tracking**: Sentry for error collection and alerting
- **Performance**: Web Vitals monitoring for user experience
- **Uptime**: 1-minute interval health checks
- **Analytics**: Privacy-first user behavior tracking

### Infrastructure Monitoring
- **Database**: Query performance, connection pool health
- **API**: Response times, error rates, throughput
- **Security**: Failed login attempts, suspicious activity
- **Resources**: CPU, memory, disk usage

## Data Flow Architecture

### User Registration Flow
```
Frontend Form → Validation → API → Password Hash → Database → Email Verification → Account Activation
```

### RSVP Flow
```
User Action → Real-time Update → Database → WebSocket Broadcast → All Connected Clients
```

### Schedule Management Flow
```
Admin Input → Validation → Database Transaction → Cache Invalidation → Real-time Broadcast
```

## Scalability Considerations

### Horizontal Scaling
- **Stateless Backend**: Session data in Redis for multi-instance deployment
- **Database Read Replicas**: Separate read/write operations
- **Microservices Ready**: Modular architecture for future service separation

### Performance Targets
- **Page Load**: < 3 seconds on 3G
- **API Response**: < 200ms for read operations
- **Real-time Updates**: < 100ms latency
- **Concurrent Users**: 1000+ simultaneous connections

## Technology Decisions & Rationale

### Frontend Choices
- **React**: Mature ecosystem, excellent TypeScript support
- **Tailwind CSS**: Utility-first approach, consistent design system
- **Zustand**: Lightweight state management, TypeScript-first
- **Vite**: Fast development experience, optimized builds

### Backend Choices
- **Node.js**: JavaScript consistency across stack
- **Express**: Minimal, flexible framework
- **Prisma**: Type-safe database access, excellent DX
- **PostgreSQL**: ACID compliance, excellent JSON support

### Security Choices
- **JWT**: Stateless authentication, mobile-friendly
- **Bcrypt**: Industry standard password hashing
- **Helmet.js**: Comprehensive security headers
- **Rate Limiting**: Protection against abuse

## Development Guidelines

### Code Standards
- **TypeScript**: Strict mode enabled, no any types
- **ESLint**: Airbnb configuration with custom rules
- **Prettier**: Consistent code formatting
- **Testing**: Jest for unit tests, Cypress for E2E

### Git Workflow
- **Branching**: GitFlow with feature branches
- **Commits**: Conventional commit messages
- **Reviews**: Required PR reviews for main branch
- **Testing**: Automated tests on all PRs

### Environment Management
- **Development**: Local PostgreSQL, hot reloading
- **Staging**: Production-like environment for testing
- **Production**: Hardened security, monitoring enabled

## Future Enhancements

### Phase 2 Features
- Mobile application (React Native)
- Advanced analytics dashboard
- Integration with payment systems
- Multi-language support
- Video conferencing integration

### Scalability Improvements
- Microservices architecture
- Event-driven architecture
- Advanced caching strategies
- Global CDN deployment

This architecture ensures a robust, secure, and scalable platform that meets all requirements while providing excellent user experience across all roles.