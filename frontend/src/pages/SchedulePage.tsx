import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { UserRole } from '../types';
import PublicNavigation from '../components/PublicNavigation';
import GradientText from '../components/GradientText';

const SchedulePage: React.FC = () => {
  const [activeDay, setActiveDay] = useState(0);
  const { user } = useAuthStore();

  // Define the event type
  interface ScheduleEvent {
    time: string;
    title: string;
    instructor?: string;
    type: string;
    note?: string;
    subtitle?: string;
  }

  // Static schedule data based on the HTML design
  const scheduleData = {
    day1: {
      name: 'Friday, July 18',
      registration: '9:00 AM - Registration Opens',
      events: [
        { time: '10:00 AM - 11:30 AM', title: 'Divine Femme', instructor: 'Taisha Monique', type: 'class' },
        { time: '11:30 AM', title: 'Interview: Taisha Monique', note: 'After class', type: 'interview' },
        { time: '11:40 AM', title: 'Interview: Adison Briana', note: 'Before class', type: 'interview' },
        { time: '12:00 PM - 1:30 PM', title: 'Floorplay', instructor: 'Adison Briana', type: 'class' },
        { time: '1:35 PM', title: 'Interview: Venetia Zipporah', note: 'Before class', type: 'interview' },
        { time: '2:00 PM - 3:30 PM', title: 'VibeZ', instructor: 'Venetia Zipporah', type: 'class' },
        { time: '3:30 PM - 4:30 PM', title: 'LUNCH BREAK', type: 'break' },
        { time: '4:30 PM - 6:30 PM', title: 'Lecture: Journey to Your Dance Signature', instructor: 'Marissa Heart, Venetia Zipporah, Taisha Monique', type: 'special' },
        { time: '7:00 PM - 8:30 PM', title: 'Heels Feels', instructor: 'Hector Kramer', type: 'class' },
        { time: '8:30 PM', title: 'Interview: Hector Kramer', note: 'After class', type: 'interview' },
      ] as ScheduleEvent[]
    },
    day2: {
      name: 'Saturday, July 19',
      registration: '9:00 AM - Registration Opens',
      events: [
        { time: '10:00 AM - 11:30 AM', title: 'Heels', instructor: 'Kiira Harper', type: 'class' },
        { time: '11:30 AM', title: 'Interview: Kiira Harper', note: 'After class', type: 'interview' },
        { time: '11:40 AM', title: 'Interview: Brinn Nicole', note: 'Before class', type: 'interview' },
        { time: '12:00 PM - 1:30 PM', title: 'Stage Confidence Heels', instructor: 'Brinn Nicole', type: 'class' },
        { time: '2:00 PM - 3:30 PM', title: 'Twerk', instructor: 'Nika Chill', type: 'class' },
        { time: '3:30 PM - 4:30 PM', title: 'LUNCH BREAK', type: 'break' },
        { time: '3:30 PM', title: 'Interview: Nika Chill', note: 'After class (during lunch)', type: 'interview' },
        { time: '4:30 PM - 6:30 PM', title: 'Lecture: From Passion to Profession', instructor: 'Nicole Kirkland, Nika Chill, Mari G', subtitle: 'Women Who Built Their Legacy', type: 'special' },
        { time: '7:00 PM - 8:30 PM', title: 'Street Heels', instructor: 'Nicole Kirkland + Zonta (Collab Class)', type: 'class' },
      ] as ScheduleEvent[]
    },
    day3: {
      name: 'Sunday, July 20',
      registration: '9:00 AM - Registration Opens',
      events: [
        { time: '9:30 AM', title: 'Interview: Marissa Heart', note: 'Before class', type: 'interview' },
        { time: '10:00 AM - 11:30 AM', title: 'Heartbreak Heels', instructor: 'Marissa Heart', type: 'class' },
        { time: '11:40 AM', title: 'Interview: Deanna Leggett', note: 'Before class', type: 'interview' },
        { time: '12:00 PM - 1:30 PM', title: 'Hip-hop', instructor: 'Deanna Leggett', type: 'class' },
        { time: '2:00 PM - 3:30 PM', title: 'Vogue Femme', instructor: 'Polina Glen', type: 'class' },
        { time: '3:30 PM - 4:30 PM', title: 'LUNCH BREAK', type: 'break' },
        { time: '3:30 PM', title: 'Interview: Polina Glen', note: 'After class (during lunch)', type: 'interview' },
        { time: '4:30 PM - 6:00 PM', title: 'Heels Contemporary', instructor: 'Skyler Hostetler', type: 'class' },
        { time: '6:30 PM - 8:30 PM', title: 'Chills Conversation', type: 'special' },
        { time: '6:30 PM', title: 'Interview: Skyler Hostetler', note: 'After class (overlaps with Chills Conversation)', type: 'interview' },
      ] as ScheduleEvent[]
    }
  };

  const days = [scheduleData.day1, scheduleData.day2, scheduleData.day3];

  const getEventCardClass = (eventType: string) => {
    switch (eventType) {
      case 'break':
        return 'event-card break';
      case 'special':
        return 'event-card special';
      case 'interview':
        return 'interview-card';
      default:
        return 'event-card';
    }
  };

  return (
    <div className="min-h-screen text-white">
      {/* Navigation */}
      <PublicNavigation />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl pt-24">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <GradientText
            colors={["#ff6b6b", "#ee5a6f", "#c44569", "#9a4560", "#ff6b6b"]}
            animationSpeed={3}
            className="text-4xl font-bold tracking-wider mb-2"
          >
            DANCE CAMP SCHEDULE
          </GradientText>
          <p className="text-gray-400 text-lg">
            {user?.role === UserRole.VIDEOGRAPHER ? 'Videographer Timeline' : 'Class Schedule'}
          </p>
        </div>

      {/* Day Tabs */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mb-10 justify-center animate-slide-in px-4">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => setActiveDay(index)}
            className={`px-4 sm:px-8 py-3 rounded-full border transition-all duration-300 font-medium text-sm sm:text-base whitespace-nowrap ${
              activeDay === index
                ? 'bg-gradient-to-r from-primary-500 to-primary-700 border-transparent text-white transform scale-105'
                : 'bg-white bg-opacity-5 border-white border-opacity-10 hover:bg-opacity-10 hover:border-opacity-20 hover:transform hover:-translate-y-1'
            }`}
            style={{
              boxShadow: activeDay === index ? '0 5px 20px rgba(255, 107, 107, 0.3)' : 'none'
            }}
          >
            {day.name}
          </button>
        ))}
      </div>

      {/* Schedule Container */}
      <div className="relative min-h-96">
        {days.map((day, dayIndex) => (
          <div
            key={dayIndex}
            className={`absolute w-full transition-all duration-500 ${
              activeDay === dayIndex 
                ? 'opacity-100 transform translate-x-0 pointer-events-auto' 
                : 'opacity-0 transform translate-x-12 pointer-events-none'
            }`}
          >
            {/* Registration */}
            <div className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-xl p-4 mb-5 text-center text-gray-400">
              {day.registration}
            </div>

            {/* Events */}
            {day.events.map((event, index) => {
              // Only show interviews to teachers and videographers
              if (event.type === 'interview' && (!user || (user.role !== 'TEACHER' && user.role !== 'VIDEOGRAPHER'))) {
                return null;
              }
              
              return (
                <div
                  key={index}
                  className={getEventCardClass(event.type)}
                  style={{
                    animation: `slideIn 0.5s ease-out ${0.1 * index}s both`
                  }}
                >
                  <div className="relative z-10">
                    {event.type === 'interview' && (
                      <span className="inline-block w-2 h-2 bg-secondary-500 rounded-full mr-2"></span>
                    )}
                    <div className={`text-sm font-medium mb-2 ${
                      event.type === 'interview' ? 'text-purple-300' : 'text-primary-400'
                    }`}>
                      {event.time}
                    </div>
                    <div className="text-xl font-light mb-1 text-white">
                      {event.title}
                    </div>
                    {event.instructor && (
                      <div className="text-gray-400">
                        {event.instructor}
                      </div>
                    )}
                    {event.subtitle && (
                      <div className="inline-block px-3 py-1 bg-primary-500 bg-opacity-20 rounded-full text-sm mt-2">
                        {event.subtitle}
                      </div>
                    )}
                    {event.note && (
                      <div className="text-purple-300 text-sm mt-1 italic">
                        {event.note}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default SchedulePage;