import { useAuthStore } from '../store/authStore';

const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
        
        <div className="space-y-4">
          <div>
            <label className="label">First Name</label>
            <div className="mt-1 text-sm text-gray-900">{user?.firstName}</div>
          </div>
          
          <div>
            <label className="label">Last Name</label>
            <div className="mt-1 text-sm text-gray-900">{user?.lastName}</div>
          </div>
          
          <div>
            <label className="label">Email</label>
            <div className="mt-1 text-sm text-gray-900">{user?.email}</div>
          </div>
          
          <div>
            <label className="label">Role</label>
            <div className="mt-1 text-sm text-gray-900 capitalize">{user?.role?.toLowerCase()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;