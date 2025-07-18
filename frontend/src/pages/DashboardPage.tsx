import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useClassStore } from '../store/classStore';
import { Calendar, Users, Clock, CheckCircle } from 'lucide-react';
import { UserRole } from '../types';

const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const { classes, userRSVPs, loadClasses, loadUserRSVPs } = useClassStore();

  useEffect(() => {
    loadClasses();
    if (user?.role === UserRole.STUDENT) {
      loadUserRSVPs();
    }
  }, [loadClasses, loadUserRSVPs, user]);

  const upcomingClasses = classes
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    .slice(0, 3);

  const confirmedRSVPs = userRSVPs.filter(rsvp => rsvp.status === 'CONFIRMED');

  const stats = [
    {
      name: 'Total Classes',
      value: classes.length,
      icon: Calendar,
      color: 'bg-blue-500'
    },
    {
      name: 'My RSVPs',
      value: confirmedRSVPs.length,
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      name: 'Upcoming',
      value: upcomingClasses.length,
      icon: Clock,
      color: 'bg-yellow-500'
    },
    {
      name: 'Teachers',
      value: new Set(classes.map(cls => cls.instructorId)).size,
      icon: Users,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-3xl font-light tracking-wide text-white mb-2">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-gray-400 text-lg">
          Here's what's happening at Chills Dance Camp
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card p-6">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">{stat.name}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Classes */}
      <div className="card">
        <div className="px-6 py-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Upcoming Classes</h2>
        </div>
        <div className="p-6">
          {upcomingClasses.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No upcoming classes scheduled
            </p>
          ) : (
            <div className="space-y-4">
              {upcomingClasses.map((cls) => (
                <div
                  key={cls.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{cls.title}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(cls.startTime).toLocaleDateString()} at{' '}
                      {new Date(cls.startTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {cls.currentRSVPs || 0} / {cls.capacity}
                    </p>
                    <p className="text-xs text-gray-500">registered</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <p className="text-gray-500 text-center py-8">
            No recent activity
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;