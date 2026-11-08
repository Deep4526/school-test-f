import { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { Users, Award, Bell, Loader2 } from 'lucide-react';

const ParentDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/portal/parent/dashboard').then(res => setData(res.data.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={32} /></div>;
  if (!data) return <div className="text-center py-20 text-gray-500">No children linked to your account. Contact admin.</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Welcome, {data.parent.name}</h1>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-lg flex items-center justify-center"><Users size={24} /></div>
          <div><p className="text-sm text-gray-500">Linked Students</p><p className="text-xl font-bold">{data.students.length}</p></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center"><Bell size={24} /></div>
          <div><p className="text-sm text-gray-500">Recent Notices</p><p className="text-xl font-bold">{data.notices.length}</p></div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">My Children</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {data.students.map(s => (
            <div key={s._id} className="border border-gray-200 rounded-lg p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-light text-primary rounded-full flex items-center justify-center font-bold text-lg">{s.name[0]}</div>
              <div>
                <h3 className="font-bold text-gray-900">{s.name}</h3>
                <p className="text-sm text-gray-500">Class: {s.class}-{s.section} | Roll: {s.rollNo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Award size={20} className="text-accent" /> Recent Academic Performance</h2>
        {data.results.length === 0 ? <p className="text-gray-500">No results published yet.</p> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr><th className="px-4 py-3">Student</th><th className="px-4 py-3">Exam</th><th className="px-4 py-3">Total Marks</th><th className="px-4 py-3">GPA</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.results.slice(0, 5).map(r => (
                  <tr key={r._id}>
                    <td className="px-4 py-3 font-medium">{r.student.name}</td>
                    <td className="px-4 py-3">{r.examination.name}</td>
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
export default ParentDashboard;