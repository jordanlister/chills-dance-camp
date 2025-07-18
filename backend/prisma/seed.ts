import { PrismaClient, UserRole, ClassType, InterviewType } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123!', 12);
  await prisma.user.upsert({
    where: { email: 'admin@chillsdance.com' },
    update: {},
    create: {
      email: 'admin@chillsdance.com',
      passwordHash: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
    },
  });

  // Create videographer user
  const videographerPassword = await bcrypt.hash('video123!', 12);
  await prisma.user.upsert({
    where: { email: 'videographer@chillsdance.com' },
    update: {},
    create: {
      email: 'videographer@chillsdance.com',
      passwordHash: videographerPassword,
      firstName: 'Video',
      lastName: 'Grapher',
      role: UserRole.VIDEOGRAPHER,
    },
  });

  // Create teacher users and teacher profiles
  const teacherData = [
    {
      email: 'taisha@chillsdance.com',
      firstName: 'Taisha',
      lastName: 'Monique',
      bio: 'Divine Femme specialist with 10+ years of experience in empowering women through dance.',
      specialties: ['Divine Femme', 'Feminine Expression', 'Body Confidence'],
    },
    {
      email: 'adison@chillsdance.com',
      firstName: 'Adison',
      lastName: 'Briana',
      bio: 'Floorplay expert focusing on floor techniques and flexibility.',
      specialties: ['Floorplay', 'Flexibility', 'Floor Techniques'],
    },
    {
      email: 'venetia@chillsdance.com',
      firstName: 'Venetia',
      lastName: 'Zipporah',
      bio: 'VibeZ instructor bringing high energy and creative choreography.',
      specialties: ['VibeZ', 'Creative Choreography', 'High Energy'],
    },
    {
      email: 'hector@chillsdance.com',
      firstName: 'Hector',
      lastName: 'Kramer',
      bio: 'Heels Feels instructor specializing in emotional expression through heels dance.',
      specialties: ['Heels Feels', 'Emotional Expression', 'Performance'],
    },
    {
      email: 'kiira@chillsdance.com',
      firstName: 'Kiira',
      lastName: 'Harper',
      bio: 'Heels dance instructor with focus on technique and style.',
      specialties: ['Heels', 'Technique', 'Style Development'],
    },
    {
      email: 'brinn@chillsdance.com',
      firstName: 'Brinn',
      lastName: 'Nicole',
      bio: 'Stage Confidence Heels instructor helping dancers build performance confidence.',
      specialties: ['Stage Confidence', 'Performance', 'Heels'],
    },
    {
      email: 'nika@chillsdance.com',
      firstName: 'Nika',
      lastName: 'Chill',
      bio: 'Twerk specialist and founder of Chills Dance Camp. Offers 6 weekly twerk classes in LA and leads 3 transformative days of feminine energy, movement, and connection. Classes are for all levels with no prior experience required.',
      specialties: ['Twerk', 'Cultural Dance', 'Authentic Movement', 'Feminine Energy'],
    },
    {
      email: 'nicole@chillsdance.com',
      firstName: 'Nicole',
      lastName: 'Kirkland',
      bio: 'Street Heels instructor combining street dance with heels technique.',
      specialties: ['Street Heels', 'Urban Dance', 'Heels Fusion'],
    },
    {
      email: 'marissa@chillsdance.com',
      firstName: 'Marissa',
      lastName: 'Heart',
      bio: 'One of the industry\'s most sought after Heels choreographers with over 700K followers. Creator of "Heartbreak Heels" brand, empowering individuals through dance at Playground LA. Has worked with Kanye West, Justin Bieber, Lady Gaga, and many more.',
      specialties: ['Heartbreak Heels', 'Emotional Storytelling', 'Heels Choreography', 'Empowerment'],
    },
    {
      email: 'deanna@chillsdance.com',
      firstName: 'Deanna',
      lastName: 'Leggett',
      bio: 'Hip-hop instructor with years of experience in street dance and urban styles.',
      specialties: ['Hip-hop', 'Street Dance', 'Urban Styles'],
    },
    {
      email: 'polina@chillsdance.com',
      firstName: 'Polina',
      lastName: 'Glen',
      bio: 'Vogue Femme instructor bringing ballroom culture and runway techniques.',
      specialties: ['Vogue Femme', 'Ballroom Culture', 'Runway'],
    },
    {
      email: 'skyler@chillsdance.com',
      firstName: 'Skyler',
      lastName: 'Hostetler',
      bio: 'Heels Contemporary instructor blending contemporary dance with heels technique.',
      specialties: ['Heels Contemporary', 'Contemporary Dance', 'Fusion'],
    },
  ];

  const teachers = [];
  for (const teacherInfo of teacherData) {
    const password = await bcrypt.hash('teacher123!', 12);
    const user = await prisma.user.upsert({
      where: { email: teacherInfo.email },
      update: {},
      create: {
        email: teacherInfo.email,
        passwordHash: password,
        firstName: teacherInfo.firstName,
        lastName: teacherInfo.lastName,
        role: UserRole.TEACHER,
      },
    });

    const teacher = await prisma.teacher.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        bio: teacherInfo.bio,
        specialties: teacherInfo.specialties,
        isVerified: true,
      },
    });

    teachers.push({ user, teacher });
  }

  // Create sample student users
  const studentPassword = await bcrypt.hash('student123!', 12);
  const students = [];
  for (let i = 1; i <= 5; i++) {
    const student = await prisma.user.upsert({
      where: { email: `student${i}@example.com` },
      update: {},
      create: {
        email: `student${i}@example.com`,
        passwordHash: studentPassword,
        firstName: `Student`,
        lastName: `${i}`,
        role: UserRole.STUDENT,
      },
    });
    students.push(student);
  }

  // Create schedule data for July 18-20, 2025
  const scheduleData = [
    // July 18, 2025
    {
      title: 'Divine Femme',
      instructorEmail: 'taisha@chillsdance.com',
      date: new Date('2025-07-18'),
      startTime: new Date('2025-07-18T10:00:00'),
      endTime: new Date('2025-07-18T11:30:00'),
      description: 'Embrace your divine feminine energy through empowering movement and expression.',
      capacity: 25,
      interview: {
        scheduledTime: new Date('2025-07-18T11:30:00'),
        type: InterviewType.AFTER_CLASS,
      },
    },
    {
      title: 'Floorplay',
      instructorEmail: 'adison@chillsdance.com',
      date: new Date('2025-07-18'),
      startTime: new Date('2025-07-18T12:00:00'),
      endTime: new Date('2025-07-18T13:30:00'),
      description: 'Master floor techniques and develop your flexibility and flow.',
      capacity: 20,
      interview: {
        scheduledTime: new Date('2025-07-18T11:40:00'),
        type: InterviewType.BEFORE_CLASS,
      },
    },
    {
      title: 'VibeZ',
      instructorEmail: 'venetia@chillsdance.com',
      date: new Date('2025-07-18'),
      startTime: new Date('2025-07-18T14:00:00'),
      endTime: new Date('2025-07-18T15:30:00'),
      description: 'High-energy choreography that captures the essence of good vibes.',
      capacity: 30,
      interview: {
        scheduledTime: new Date('2025-07-18T13:35:00'),
        type: InterviewType.BEFORE_CLASS,
      },
    },
    {
      title: 'LUNCH',
      instructorEmail: 'admin@chillsdance.com',
      date: new Date('2025-07-18'),
      startTime: new Date('2025-07-18T15:30:00'),
      endTime: new Date('2025-07-18T16:30:00'),
      description: 'Lunch break and networking time.',
      capacity: 100,
      type: ClassType.BREAK,
    },
    {
      title: 'Lecture: Journey to Your Dance Signature',
      instructorEmail: 'marissa@chillsdance.com',
      date: new Date('2025-07-18'),
      startTime: new Date('2025-07-18T16:30:00'),
      endTime: new Date('2025-07-18T18:30:00'),
      description: 'Panel discussion with Marissa Heart, Venetia Zipporah, and Taisha Monique about developing your unique dance style.',
      capacity: 50,
      type: ClassType.SPECIAL,
    },
    {
      title: 'Heels Feels',
      instructorEmail: 'hector@chillsdance.com',
      date: new Date('2025-07-18'),
      startTime: new Date('2025-07-18T19:00:00'),
      endTime: new Date('2025-07-18T20:30:00'),
      description: 'Express your emotions through powerful heels choreography.',
      capacity: 25,
      interview: {
        scheduledTime: new Date('2025-07-18T20:30:00'),
        type: InterviewType.AFTER_CLASS,
      },
    },
    // July 19, 2025
    {
      title: 'Heels',
      instructorEmail: 'kiira@chillsdance.com',
      date: new Date('2025-07-19'),
      startTime: new Date('2025-07-19T10:00:00'),
      endTime: new Date('2025-07-19T11:30:00'),
      description: 'Fundamental heels technique and style development.',
      capacity: 25,
      interview: {
        scheduledTime: new Date('2025-07-19T11:30:00'),
        type: InterviewType.AFTER_CLASS,
      },
    },
    {
      title: 'Stage Confidence Heels',
      instructorEmail: 'brinn@chillsdance.com',
      date: new Date('2025-07-19'),
      startTime: new Date('2025-07-19T12:00:00'),
      endTime: new Date('2025-07-19T13:30:00'),
      description: 'Build confidence and stage presence in heels.',
      capacity: 20,
      interview: {
        scheduledTime: new Date('2025-07-19T11:40:00'),
        type: InterviewType.BEFORE_CLASS,
      },
    },
    {
      title: 'Twerk',
      instructorEmail: 'nika@chillsdance.com',
      date: new Date('2025-07-19'),
      startTime: new Date('2025-07-19T14:00:00'),
      endTime: new Date('2025-07-19T15:30:00'),
      description: 'Authentic twerk technique and cultural appreciation.',
      capacity: 30,
      interview: {
        scheduledTime: new Date('2025-07-19T15:30:00'),
        type: InterviewType.AFTER_CLASS,
      },
    },
    // July 20, 2025
    {
      title: 'Heartbreak Heels',
      instructorEmail: 'marissa@chillsdance.com',
      date: new Date('2025-07-20'),
      startTime: new Date('2025-07-20T10:00:00'),
      endTime: new Date('2025-07-20T11:30:00'),
      description: 'Channel emotions into powerful heels choreography.',
      capacity: 25,
      interview: {
        scheduledTime: new Date('2025-07-20T09:30:00'),
        type: InterviewType.BEFORE_CLASS,
      },
    },
    {
      title: 'Hip-hop',
      instructorEmail: 'deanna@chillsdance.com',
      date: new Date('2025-07-20'),
      startTime: new Date('2025-07-20T12:00:00'),
      endTime: new Date('2025-07-20T13:30:00'),
      description: 'Street dance fundamentals and urban styles.',
      capacity: 30,
      interview: {
        scheduledTime: new Date('2025-07-20T11:40:00'),
        type: InterviewType.BEFORE_CLASS,
      },
    },
    {
      title: 'Vogue Femme',
      instructorEmail: 'polina@chillsdance.com',
      date: new Date('2025-07-20'),
      startTime: new Date('2025-07-20T14:00:00'),
      endTime: new Date('2025-07-20T15:30:00'),
      description: 'Ballroom culture and runway techniques.',
      capacity: 25,
      interview: {
        scheduledTime: new Date('2025-07-20T15:30:00'),
        type: InterviewType.AFTER_CLASS,
      },
    },
    {
      title: 'Heels Contemporary',
      instructorEmail: 'skyler@chillsdance.com',
      date: new Date('2025-07-20'),
      startTime: new Date('2025-07-20T16:30:00'),
      endTime: new Date('2025-07-20T18:00:00'),
      description: 'Fusion of contemporary dance and heels technique.',
      capacity: 20,
      interview: {
        scheduledTime: new Date('2025-07-20T18:30:00'),
        type: InterviewType.AFTER_CLASS,
      },
    },
    {
      title: 'Chills Conversation',
      instructorEmail: 'nika@chillsdance.com',
      date: new Date('2025-07-20'),
      startTime: new Date('2025-07-20T18:30:00'),
      endTime: new Date('2025-07-20T20:30:00'),
      description: 'Community conversation and celebration of dance.',
      capacity: 50,
      type: ClassType.SPECIAL,
    },
  ];

  // Create classes and interviews
  for (const classData of scheduleData) {
    const instructor = teachers.find(t => t.user.email === classData.instructorEmail);
    if (!instructor) continue;

    const createdClass = await prisma.class.create({
      data: {
        title: classData.title,
        description: classData.description,
        instructorId: instructor.teacher.id,
        date: classData.date,
        startTime: classData.startTime,
        endTime: classData.endTime,
        capacity: classData.capacity,
        type: classData.type || ClassType.REGULAR,
        location: 'Main Studio',
        requirements: [],
      },
    });

    // Create interview if specified
    if (classData.interview) {
      await prisma.interview.create({
        data: {
          classId: createdClass.id,
          scheduledTime: classData.interview.scheduledTime,
          type: classData.interview.type,
          notes: `Interview for ${classData.title} class`,
        },
      });
    }
  }

  // Create system settings
  await prisma.systemSettings.upsert({
    where: { key: 'registration_open' },
    update: {},
    create: {
      key: 'registration_open',
      value: true,
    },
  });

  await prisma.systemSettings.upsert({
    where: { key: 'max_rsvps_per_user' },
    update: {},
    create: {
      key: 'max_rsvps_per_user',
      value: 10,
    },
  });

  await prisma.systemSettings.upsert({
    where: { key: 'rsvp_cancellation_hours' },
    update: {},
    create: {
      key: 'rsvp_cancellation_hours',
      value: 2,
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log(`👤 Admin: admin@chillsdance.com / admin123!`);
  console.log(`🎥 Videographer: videographer@chillsdance.com / video123!`);
  console.log(`👩‍🏫 Teachers: Use teacher123! for all teacher accounts`);
  console.log(`👩‍🎓 Students: Use student123! for all student accounts`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });