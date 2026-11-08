import { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { Users, CheckCircle, XCircle } from 'lucide-react';

const CommunityManagement = () => {
  const [tab, setTab] = useState('memberships');
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const res = await api.get(tab === 'memberships' ? '/community/membership' : '/community/alumni');
    setItems(res.data.data || []);
  };
  useEffect(() => { fetchItems(); }, [tab]);

  const handleStatusUpdate = async (id, status) => {
    await api.patch(`/community/membership/${id}`, { status });
    toast.success(`Membership ${status}`); fetchItems();
  };
  const handleDelete = async (id) => {
    if (!window.confirm('Delete?')) return;
    await api.delete(`/community/alumni/${id}`); toast.success('Deleted'); fetchItems();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Users size={24} className="text-purple-500" /> Community Management</h1>
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button onClick={() => setTab('memberships')} className={`px-4 py-2 font-medium ${tab === 'memberships' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>Memberships</button>
        <button onClick={() => setTab('alumni')} className={`px-4 py-2 font-medium ${tab === 'alumni' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>Alumni</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs"><tr><th className="px-6 py-4">Name</th><th className="px-6 py-4">{tab === 'memberships' ? 'Phone' : 'Batch'}</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Action</th></tr></thead>
          <tbody className="divide-y divide-gray-100">
            {items.map(item => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{item.name}<div className="text-xs text-gray-500">{item.email}</div></td>
                <td className="px-6 py-4">{tab === 'memberships' ? item.phone : item.batch}</td>
                <td className="px-6 py-4">
                  {tab === 'memberships' ? (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'approved' ? 'bg-green-100 text-green-700' : item.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{item.status.toUpperCase()}</span>
                  ) : <span className="text-gray-500">Active</span>}
                </td>
                <td className="px-6 py-4 text-right flex justify-end gap-2">
                  {tab === 'memberships' && item.status === 'pending' && (
                    <>
                      <button onClick={() => handleStatusUpdate(item._id, 'approved')} className="p-2 text-green-600 hover:bg-green-50 rounded-lg"><CheckCircle size={16} /></button>
                      <button onClick={() => handleStatusUpdate(item._id, 'rejected')} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><XCircle size={16} /></button>
                    </>
                  )}
                  {tab === 'alumni' && <button onClick={() => handleDelete(item._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><XCircle size={16} /></button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default CommunityManagement;