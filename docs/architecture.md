# Chills Dance Camp Schedule System - Architecture Documentation

## Project Overview

The Chills Dance Camp Schedule System is a comprehensive full-stack web application designed to manage dance camp schedules with role-based access for students, teachers, videographers, and administrators. The system features real-time RSVP functionality, professional video production coordination, and comprehensive security measures.

**About Chills Dance Camp**: Located in Los Angeles, Chills Dance Camp is where feminine energy, technique, and community come together — creating a dance experience you'll never forget. The camp offers 12 intensive dance classes with top instructors, empowering lectures and discussions, and creative networking sessions, all in partnership with Vamp Heels.

**Reference Website**: https://www.chillsdance.com/home  
**Current Status**: 🔄 MVP In Progress - Core features implemented, API integration needed  
**Last Updated**: July 2025

## Current Implementation Status

### ✅ Completed Features
- **Authentication System**: Complete JWT implementation with refresh tokens, bcrypt password hashing
- **Database Schema**: Comprehensive PostgreSQL with Prisma ORM, full relationships and constraints
- **Frontend UI**: React 19 with TypeScript, professional dark theme with coral gradient branding
- **Landing Page**: Professional design with Vamp Heels partnership integration and high-quality visuals
- **WebGL Background**: Advanced `DarkVeil.tsx` component with configurable visual effects
- **Component Library**: Reusable components including AutoScrollCards, GradientText, HorizontalScroll
- **Navigation System**: Complete public and authenticated navigation with role-based access
- **Security Foundation**: Rate limiting, CORS, Helmet.js, comprehensive auth middleware
- **Real-time Infrastructure**: WebSocket setup with Socket.io client/server communication

### 🔄 In Progress
- **API Integration**: Backend routes exist but need full CRUD implementation
- **RSVP System**: Database schema complete, API endpoints return placeholder data
- **User Management**: Authentication complete, profile management basic
- **Schedule Display**: Using static data, needs dynamic API connection

### 📋 Pending Features
- **Dynamic RSVP Operations**: POST/DELETE endpoints for RSVP management
- **Teacher Dashboard**: Profile management and class oversight
- **Admin Panel**: User management and system configuration
- **File Upload System**: Profile pictures and media handling
- **Email Notifications**: Queue system designed but not implemented
- **Deployment Configuration**: Production environment setup needed

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
- **Framework**: React 19.1.0 with TypeScript (strict mode)
- **Styling**: Tailwind CSS 3.4.17 with custom coral/pink gradient theme
- **State Management**: Zustand 5.0.6 for global state
- **Build Tool**: Vite 7.0.4 for fast development and optimized builds
- **WebGL**: OGL library for advanced visual effects (DarkVeil component)
- **Real-time**: Socket.io 4.8.1 client for live updates
- **Theme**: Dark theme with coral gradient branding (#ff6b6b → #9a4560)
- **Icons**: Lucide React for consistent iconography

#### Component Architecture
```
src/
├── components/          # Current flat structure (14 components)
│   ├── AutoScrollCards.tsx      # Horizontal scrolling carousel
│   ├── ChillsLogo.tsx          # Brand logo component
│   ├── DarkVeil.tsx            # WebGL background effects
│   ├── GradientText.tsx        # Animated gradient text
│   ├── HorizontalScroll.tsx    # Custom scroll component
│   ├── Layout.tsx              # Main layout wrapper
│   ├── LoadingSpinner.tsx      # Loading states
│   ├── LoginModal.tsx          # Authentication modal
│   ├── ProtectedRoute.tsx      # Route protection
│   ├── PublicNavigation.tsx    # Public site navigation
│   ├── RegisterModal.tsx       # User registration modal
│   ├── ScheduleComponent.tsx   # Static schedule display
│   └── layout/
│       ├── Navbar.tsx          # Authenticated navigation
│       └── Sidebar.tsx         # Dashboard sidebar
├── pages/               # 13 route components (mixed implementation)
├── store/               # Zustand stores (authStore, classStore)
├── services/            # API services (api.ts, websocket.ts)
├── utils/               # Utility functions (cn.ts only)
├── types/               # TypeScript type definitions
└── assets/              # Static assets (logos, images)
```

#### Key Features
- **Advanced Visual Effects**: WebGL-powered background with configurable shaders
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Performance Optimized**: Proper memoization and React 19 optimization patterns
- **Modern UI/UX**: Professional design with smooth animations and transitions
- **Type Safety**: Strict TypeScript implementation throughout
- **Component Reusability**: Modular components with consistent prop interfaces

### 2. Backend Architecture (Node.js + Express)

#### Technology Stack
- **Runtime**: Node.js 18+
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with refresh tokens
- **Real-time**: Socket.io for WebSocket connections
- **Security**: Comprehensive middleware stack

#### API Architecture (Current Implementation)
```
src/
├── routes/              # API route definitions (5 files)
│   ├── auth.ts          # Complete authentication endpoints
│   ├── classes.ts       # Basic class queries (needs CRUD)
│   ├── rsvps.ts         # Placeholder endpoints
│   ├── teachers.ts      # Placeholder endpoints
│   └── users.ts         # Basic user endpoints
├── middleware/          # Express middleware (3 files)
│   ├── authMiddleware.ts    # JWT verification
│   ├── errorHandler.ts      # Error handling
│   └── notFoundHandler.ts   # 404 handling
├── services/            # Business logic
│   └── authService.ts       # Authentication logic only
├── websocket/           # Socket.io handlers
│   └── socketHandler.ts     # Basic WebSocket setup
├── types/               # TypeScript definitions
│   └── index.ts             # Shared type definitions
├── app.ts               # Express app configuration
└── server.ts            # Server entry point
```

#### Missing from Current Implementation
- **Controllers**: No separate controller layer (logic in routes)
- **Validators**: No input validation schemas (only basic auth validation)
- **Models**: No separate model layer (direct Prisma usage)
- **Utils**: Limited utility functions

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
- **Current**: No deployment configuration implemented
- **Frontend Target**: Vercel (React/TypeScript optimized)
- **Backend Target**: Railway or Render (Node.js hosting)
- **Database**: PostgreSQL (Supabase or Railway managed)
- **CDN**: Cloudflare for static assets and DDoS protection

#### Deployment Status
- ❌ **No deployment configuration found**
- ❌ **No environment variable templates**
- ❌ **No CI/CD pipeline setup**
- ❌ **No production build optimizations**
- ❌ **No Docker configuration**

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

## Current Gaps & Next Steps

### Critical Implementation Gaps

#### Backend API Completion (High Priority)
```typescript
// Missing RSVP Operations
POST /api/rsvps          # Create RSVP
DELETE /api/rsvps/:id    # Cancel RSVP
PUT /api/rsvps/:id       # Update RSVP status

// Missing Class Management  
POST /api/classes        # Create class (Admin)
PUT /api/classes/:id     # Update class
DELETE /api/classes/:id  # Remove class

// Missing Teacher Operations
PUT /api/teachers/:id    # Update teacher profile
POST /api/teachers       # Teacher registration

// Missing User Management
GET /api/users           # List users (Admin)
PUT /api/users/:id       # Update user
DELETE /api/users/:id    # Deactivate user
```

#### Frontend Integration (Medium Priority)
- Connect ScheduleComponent to dynamic API data
- Implement RSVP button functionality
- Add loading states and error handling
- Complete user profile management
- Build admin dashboard functionality

#### Deployment Setup (High Priority)
- Configure Vercel deployment
- Set up environment variables
- Implement CI/CD pipeline
- Add production optimizations
- Configure database hosting

### Recommended Development Sequence

#### Phase 1: Core Functionality (2-3 weeks)
1. **Complete RSVP System**
   - Implement backend CRUD operations
   - Connect frontend to API
   - Add real-time updates via WebSocket

2. **Dynamic Schedule**
   - Replace static data with API calls
   - Add loading and error states
   - Implement cache management

3. **Deployment Configuration**
   - Set up Vercel deployment
   - Configure environment variables
   - Test production build

#### Phase 2: Enhanced Features (2-4 weeks)
1. **User Management**
   - Complete profile management
   - Implement role-based dashboards
   - Add user administration

2. **Teacher Dashboard**
   - Class management interface
   - Student list views
   - Profile customization

3. **System Administration**
   - Admin panel development
   - System settings management
   - User role management

#### Phase 3: Production Readiness (1-2 weeks)
1. **Testing & Quality Assurance**
   - Comprehensive testing suite
   - Security audit
   - Performance optimization

2. **Monitoring & Analytics**
   - Error tracking setup
   - Performance monitoring
   - Usage analytics

## Future Enhancements

### Phase 4: Advanced Features
- **Email Notification System**: Implement the designed email queue
- **File Upload System**: Profile pictures and class media
- **Mobile PWA**: Add service worker for offline capabilities
- **Calendar Integration**: iCal/Google Calendar export
- **Payment Integration**: For premium features

### Long-term Scalability
- **Microservices Architecture**: Separate auth, scheduling, notifications
- **Advanced Caching**: Redis implementation for performance
- **Global CDN**: Multi-region deployment
- **Mobile Application**: React Native for iOS/Android

## Architecture Strengths

The current implementation demonstrates several architectural strengths:

1. **Solid Foundation**: Excellent database design and authentication system
2. **Modern Stack**: Latest React 19 with TypeScript best practices  
3. **Security First**: Comprehensive security middleware and JWT implementation
4. **Visual Excellence**: Professional UI with advanced WebGL effects
5. **Type Safety**: Strict TypeScript throughout the stack
6. **Scalable Design**: Database schema supports future growth

The architecture is well-positioned for rapid completion and long-term success once the remaining API endpoints are implemented and deployment is configured.