# Chills Dance Camp Schedule System

A comprehensive full-stack web application for managing dance camp schedules with role-based access for students, teachers, videographers, and administrators.

## 🎨 Design & Features

- **Dark Theme**: Sleek black background with coral gradient branding
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Role-Based Access**: Different experiences for Students, Teachers, Videographers, and Admins
- **Real-time Updates**: WebSocket integration for live RSVP updates
- **Professional UI**: Glass morphism effects and smooth animations

## 🏗️ Architecture

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS v3** with custom coral gradient theme
- **Zustand** for state management
- **Vite** for fast development
- **Socket.io** for real-time features

### Backend
- **Node.js** with Express.js
- **PostgreSQL** with Prisma ORM
- **JWT Authentication** with refresh tokens
- **Comprehensive Security** (Rate limiting, CORS, Helmet.js)
- **WebSocket** support with Socket.io

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chills-dance-camp
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Backend: Copy .env.example to .env and configure
   cp backend/.env.example backend/.env
   
   # Frontend: Copy .env.example to .env and configure
   cp frontend/.env.example frontend/.env
   ```

4. **Set up database**
   ```bash
   cd backend
   npx prisma db push
   npx prisma db seed
   ```

5. **Start development servers**
   ```bash
   # Terminal 1: Backend
   cd backend
   npm run dev
   
   # Terminal 2: Frontend
   cd frontend
   npm run dev
   ```

## 🎯 User Roles & Access

### Student
- View full schedule
- RSVP for classes
- Cancel RSVPs (up to 2 hours before)
- View instructor profiles
- Add classes to personal calendar

### Teacher
- View their class schedule
- See real-time RSVP lists
- Download attendance sheets
- Update class descriptions
- Send announcements

### Videographer
- View complete schedule with interview timeline
- See all classes with timing
- Track interview schedules
- Equipment checklist per session
- Real-time location tracking

### Admin
- Full CRUD operations on schedule
- User management
- View analytics and reports
- System configuration
- Emergency broadcast messages

## 🔐 Authentication

- **JWT Tokens**: 15-minute access tokens with 7-day refresh tokens
- **Password Security**: Bcrypt with 12 rounds
- **Rate Limiting**: 100 requests per minute per IP
- **Session Management**: Automatic token refresh

## 📅 Schedule (July 18-20, 2025)

### Friday, July 18
- Divine Femme (Taisha Monique)
- Floorplay (Adison Briana)
- VibeZ (Venetia Zipporah)
- Lecture: Journey to Your Dance Signature
- Heels Feels (Hector Kramer)

### Saturday, July 19
- Heels (Kiira Harper)
- Stage Confidence Heels (Brinn Nicole)
- Twerk (Nika Chill)
- Lecture: From Passion to Profession
- Street Heels (Nicole Kirkland + Zonta)

### Sunday, July 20
- Heartbreak Heels (Marissa Heart)
- Hip-hop (Deanna Leggett)
- Vogue Femme (Polina Glen)
- Heels Contemporary (Skyler Hostetler)
- Chills Conversation

## 🎨 Design System

### Colors
- **Primary Gradient**: `linear-gradient(135deg, #ff6b6b, #ee5a6f, #c44569, #9a4560)`
- **Interview Accent**: `#8a2be2` (Purple for videographer timeline)
- **Success**: `#10b981`
- **Warning**: `#f59e0b`
- **Error**: `#ef4444`

### Typography
- **Body**: Inter font family
- **Display**: Poppins font family
- **Weights**: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

## 🔧 Development

### Backend Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npx prisma studio    # Open Prisma Studio
npx prisma db seed   # Seed database
```

### Frontend Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📊 Database Schema

- **Users**: Authentication and profile information
- **Teachers**: Extended teacher profiles with specialties
- **Classes**: Schedule data with timing and capacity
- **RSVPs**: Student registrations and waitlists
- **Interviews**: Videographer timeline coordination
- **Audit Logs**: Security and activity tracking

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh tokens
- `POST /api/auth/logout` - User logout

### Classes
- `GET /api/classes` - Get all classes
- `GET /api/classes/:id` - Get specific class
- `POST /api/classes` - Create class (Admin only)
- `PUT /api/classes/:id` - Update class (Admin only)

### RSVPs
- `GET /api/rsvps` - Get user's RSVPs
- `POST /api/rsvps` - Create RSVP
- `DELETE /api/rsvps/:id` - Cancel RSVP

## 🔒 Security Features

- **HTTPS Enforcement**: SSL/TLS certificates required
- **Input Validation**: Comprehensive validation on all endpoints
- **SQL Injection Prevention**: Parameterized queries via Prisma
- **XSS Protection**: Content Security Policy headers
- **CSRF Protection**: Tokens for state-changing operations
- **Rate Limiting**: IP-based request limiting
- **Audit Logging**: All authentication attempts logged

## 🚀 Deployment

### Environment Variables
```
DATABASE_URL=postgresql://...
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret
REDIS_URL=redis://localhost:6379
EMAIL_API_KEY=your-email-key
```

### Deployment Options
- **Railway**: Recommended for full-stack deployment
- **Vercel**: Frontend + Serverless functions
- **Render**: Full-stack with PostgreSQL
- **Heroku**: Traditional deployment option

## 📄 Documentation

- [Architecture Documentation](./docs/architecture.md)
- [API Documentation](./docs/api.md)
- [Deployment Guide](./docs/deployment.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Chills Dance** for the inspiration and design direction
- **Dance Camp Community** for feature requirements and feedback
- **Open Source Libraries** that made this project possible

---

**Built with ❤️ for the dance community**