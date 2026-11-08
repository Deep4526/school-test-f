import { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { Award, CreditCard, Bell, Loader2 } from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/portal/student/dashboard').then(res => setData(res.data.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={32} /></div>;
  if (!data) return <div className="text-center py-20 text-gray-500">Profile not linked. Contact admin.</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Welcome, {data.student.name}</h1>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center"><Award size={24} /></div>
          <div><p className="text-sm text-gray-500">Class</p><p className="text-xl font-bold">{data.student.class}-{data.student.section}</p></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 text-green-700 rounded-lg flex items-center justify-center"><CreditCard size={24} /></div>
          <div><p className="text-sm text-gray-500">Roll No</p><p className="text-xl font-bold">{data.student.rollNo}</p></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-lg flex items-center justify-center"><Bell size={24} /></div>
          <div><p className="text-sm text-gray-500">Recent Notices</p><p className="text-xl font-bold">{data.notices.length}</p></div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Results</h2>
        {data.results.length === 0 ? <p className="text-gray-500">No results published yet.</p> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr><th className="px-4 py-3">Exam</th><th className="px-4 py-3">Total Marks</th><th className="px-4 py-3">GPA</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.results.slice(0, 3).map(r => (
                  <tr key={r._id}>
                    <td className="px-4 py-3 font-medium">{r.examination.name}</td>
                    <td className="px-4 py-3">{r.totalMarks}</td>
                    <td className="px-4 py-3"><span className="bg-accent-light text-accent-dark px-2 py-1 rounded text-xs font-bold">{r.gpa}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
export default StudentDashboard;