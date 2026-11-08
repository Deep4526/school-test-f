import { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { Image, FileText, Newspaper, Calendar, BookOpen, Users, MessageSquare, Plus, Trash2, CheckCircle } from 'lucide-react';

const tabs = [
  { id: 'galleries', label: 'Gallery', icon: Image, fields: ['title', 'url', 'category'] },
  { id: 'downloads', label: 'Downloads', icon: FileText, fields: ['title', 'fileUrl', 'category'] },
  { id: 'press', label: 'Press Release', icon: Newspaper, fields: ['title', 'content', 'imageUrl'] },
  { id: 'events', label: 'Events', icon: Calendar, fields: ['title', 'description', 'date', 'imageUrl'] },
  { id: 'departments', label: 'Departments', icon: BookOpen, fields: ['name', 'description', 'headName', 'imageUrl'] },
  { id: 'magazines', label: 'Magazine', icon: BookOpen, fields: ['title', 'year', 'pdfUrl', 'coverImageUrl'] },
  { id: 'committees', label: 'Committee', icon: Users, fields: ['name', 'designation', 'imageUrl', 'phone'] },
  { id: 'feedback', label: 'Feedback', icon: MessageSquare, fields: [] },
];

const MiscManagement = () => {
  const [activeTab, setActiveTab] = useState('galleries');
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({});

  const fetchItems = async () => {
    const res = await api.get(`/misc/${activeTab}`);
    setItems(res.data.data || []);
  };
  useEffect(() => { fetchItems(); }, [activeTab]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/misc/${activeTab}`, formData);
      toast.success('Added!'); setFormData({}); fetchItems();
    } catch (err) { toast.error('Failed'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete?')) return;
    await api.delete(`/misc/${activeTab}/${id}`); toast.success('Deleted'); fetchItems();
  };

  const handleFeedbackStatus = async (id, status) => {
    await api.patch(`/misc/feedback/${id}`, { status }); toast.success('Updated'); fetchItems();
  };

  const currentTab = tabs.find(t => t.id === activeTab);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Content & Community Management</h1>
      
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 font-medium flex items-center gap-2 ${activeTab === tab.id ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      {currentTab.fields.length > 0 && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 grid md:grid-cols-2 gap-4">
          {currentTab.fields.map(field => (
            <input key={field} type={field === 'date' ? 'date' : field.includes('Url') || field.includes('file') ? 'url' : 'text'} placeholder={`${field} *`} required value={formData[field] || ''} onChange={e => setFormData({...formData, [field]: e.target.value})} className="px-3 py-2 border rounded-md" />
          ))}
          <button type="submit" className="btn-primary md:col-span-2 flex justify-center items-center gap-2"><Plus size={16} /> Add {currentTab.label.slice(0, -1)}</button>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs"><tr><th className="px-6 py-4">Title/Name</th><th className="px-6 py-4">Details</th>{activeTab === 'feedback' && <th className="px-6 py-4">Status</th>}<th className="px-6 py-4 text-right">Action</th></tr></thead>
          <tbody className="divide-y divide-gray-100">
            {items.map(item => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{item.title || item.name || item.parentName}</td>
                <td className="px-6 py-4 text-xs text-gray-500 truncate max-w-xs">{item.description || item.content || item.message || item.designation}</td>
                {activeTab === 'feedback' && <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs ${item.status === 'reviewed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{item.status}</span></td>}
                <td className="px-6 py-4 text-right flex justify-end gap-2">
                  {activeTab === 'feedback' && item.status === 'pending' && <button onClick={() => handleFeedbackStatus(item._id, 'reviewed')} className="p-2 text-green-600 hover:bg-green-50 rounded-lg"><CheckCircle size={16} /></button>}
                  {activeTab !== 'feedback' && <button onClick={() => handleDelete(item._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default MiscManagement;