import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  Users, 
  User, 
  Video, 
  Settings,
  Book
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { UserRole } from '../../types';
import { cn } from '../../utils/cn';

const Sidebar: React.FC = () => {
  const { user } = useAuthStore();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/',
      icon: Home,
      roles: [UserRole.STUDENT, UserRole.TEACHER, UserRole.VIDEOGRAPHER, UserRole.ADMIN]
    },
    {
      name: 'Schedule',
      href: '/schedule',
      icon: Calendar,
      roles: [UserRole.STUDENT, UserRole.TEACHER, UserRole.VIDEOGRAPHER, UserRole.ADMIN]
    },
    {
      name: 'Teachers',
      href: '/teachers',
      icon: Users,
      roles: [UserRole.STUDENT, UserRole.TEACHER, UserRole.VIDEOGRAPHER, UserRole.ADMIN]
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: User,
      roles: [UserRole.STUDENT, UserRole.TEACHER, UserRole.VIDEOGRAPHER, UserRole.ADMIN]
    },
    {
      name: 'Videographer',
      href: '/videographer',
      icon: Video,
      roles: [UserRole.VIDEOGRAPHER, UserRole.ADMIN]
    },
    {
      name: 'Admin',
      href: '/admin',
      icon: Settings,
      roles: [UserRole.ADMIN]
    }
  ];

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(user?.role || UserRole.STUDENT)
  );

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:pt-16">
      <div className="flex min-h-0 flex-1 flex-col bg-black bg-opacity-90 border-r border-gray-800">
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <nav className="mt-5 flex-1 space-y-1 px-2">
            {filteredNavigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-300',
                    isActive
                      ? 'bg-primary-500 bg-opacity-20 text-primary-400 border-r-2 border-primary-500'
                      : 'text-gray-400 hover:bg-white hover:bg-opacity-5 hover:text-white'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={cn(
                        'mr-3 h-5 w-5 flex-shrink-0',
                        isActive ? 'text-primary-400' : 'text-gray-400 group-hover:text-gray-300'
                      )}
                    />
                    {item.name}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="flex flex-shrink-0 border-t border-gray-800 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-chills-gradient flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-400 capitalize">
                {user?.role?.toLowerCase()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;