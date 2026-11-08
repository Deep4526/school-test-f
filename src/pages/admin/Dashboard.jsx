import { Users, FileText, GraduationCap, Megaphone } from 'lucide-react';

const stats = [
  { label: 'Total Students', value: '1,245', icon: Users, color: 'bg-blue-100 text-blue-700' },
  { label: 'Total Teachers', value: '48', icon: GraduationCap, color: 'bg-green-100 text-green-700' },
  { label: 'Pending Admissions', value: '12', icon: FileText, color: 'bg-yellow-100 text-yellow-700' },
  { label: 'Active Notices', value: '8', icon: Megaphone, color: 'bg-purple-100 text-purple-700' },
];

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-sm text-gray-700">New admission application received from <strong>Rahim Uddin</strong></p>
            <span className="ml-auto text-xs text-gray-500">2 mins ago</span>
          </div>
          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <p className="text-sm text-gray-700">Notice "<strong>Eid Holiday</strong>" published by Admin</p>
            <span className="ml-auto text-xs text-gray-500">1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;