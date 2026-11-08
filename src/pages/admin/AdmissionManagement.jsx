import { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { FileText, CheckCircle, XCircle, Loader2 } from 'lucide-react';

const AdmissionManagement = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchAdmissions = async () => {
    try {
      const res = await api.get('/admissions');
      setAdmissions(res.data.data || []);
    } catch (err) { toast.error('Failed to load applications'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAdmissions(); }, []);

  const handleStatusUpdate = async (id, status) => {
    setUpdatingId(id);
    try {
      await api.patch(`/admissions/${id}/status`, { status });
      toast.success(`Application ${status}`);
      fetchAdmissions();
    } catch (err) { toast.error('Update failed'); }
    finally { setUpdatingId(null); }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700',
      approved: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700'
    };
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>{status.toUpperCase()}</span>;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><FileText size={24} className="text-primary" /> Admission Applications</h1>
      
      {loading ? <div className="text-center py-12">Loading...</div> : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Student Name</th>
                  <th className="px-6 py-4">Class</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {admissions.length === 0 ? (
                  <tr><td colSpan="6" className="px-6 py-12 text-center text-gray-500">No applications yet.</td></tr>
                ) : admissions.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{app.studentName}</td>
                    <td className="px-6 py-4">{app.appliedClass}</td>
                    <td className="px-6 py-4">{app.phone}</td>
                    <td className="px-6 py-4">{new Date(app.applicationDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{getStatusBadge(app.status)}</td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                      {app.status === 'pending' && (
                        <>
                          <button onClick={() => handleStatusUpdate(app._id, 'approved')} disabled={updatingId === app._id} className="p-2 text-green-600 hover:bg-green-50 rounded-lg disabled:opacity-50">
                            {updatingId === app._id ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={18} />}
                          </button>
                          <button onClick={() => handleStatusUpdate(app._id, 'rejected')} disabled={updatingId === app._id} className="p-2 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50">
                            <XCircle size={18} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdmissionManagement;