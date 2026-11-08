import { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { BookHeart, Video, Plus, Trash2 } from 'lucide-react';

const ContentManagement = () => {
  const [tab, setTab] = useState('articles');
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '', category: 'General', speaker: '', type: 'Video', url: '' });

  const fetchItems = async () => {
    const res = await api.get(tab === 'articles' ? '/content/articles' : '/content/lectures');
    setItems(res.data.data || []);
  };
  useEffect(() => { fetchItems(); }, [tab]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = tab === 'articles' ? { title: formData.title, content: formData.content, category: formData.category } : { title: formData.title, speaker: formData.speaker, type: formData.type, url: formData.url, category: formData.category };
      await api.post(tab === 'articles' ? '/content/articles' : '/content/lectures', payload);
      toast.success('Added!'); setFormData({ title: '', content: '', category: 'General', speaker: '', type: 'Video', url: '' }); fetchItems();
    } catch (err) { toast.error('Failed'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete?')) return;
    await api.delete(`${tab === 'articles' ? '/content/articles' : '/content/lectures'}/${id}`); toast.success('Deleted'); fetchItems();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><BookHeart size={24} className="text-green-500" /> Content Management</h1>
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button onClick={() => setTab('articles')} className={`px-4 py-2 font-medium ${tab === 'articles' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>Islamic Articles</button>
        <button onClick={() => setTab('lectures')} className={`px-4 py-2 font-medium ${tab === 'lectures' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>Lectures</button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 grid md:grid-cols-2 gap-4">
        <input type="text" placeholder="Title *" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="px-3 py-2 border rounded-md md:col-span-2" />
        {tab === 'articles' ? (
          <textarea placeholder="Content *" required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="px-3 py-2 border rounded-md md:col-span-2" rows="4"></textarea>
        ) : (
          <>
            <input type="text" placeholder="Speaker *" required value={formData.speaker} onChange={e => setFormData({...formData, speaker: e.target.value})} className="px-3 py-2 border rounded-md" />
            <input type="url" placeholder="Video/Audio URL *" required value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} className="px-3 py-2 border rounded-md" />
          </>
        )}
        <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="px-3 py-2 border rounded-md">
          <option value="General">General</option><option value="Masala-Masayel">Masala-Masayel</option><option value="History">History</option>
        </select>
        {tab === 'lectures' && <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="px-3 py-2 border rounded-md"><option value="Video">Video</option><option value="Audio">Audio</option></select>}
        <button type="submit" className="btn-primary md:col-span-2 flex justify-center items-center gap-2"><Plus size={16} /> Add {tab === 'articles' ? 'Article' : 'Lecture'}</button>
      </form>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs"><tr><th className="px-6 py-4">Title</th><th className="px-6 py-4">{tab === 'articles' ? 'Category' : 'Speaker'}</th><th className="px-6 py-4 text-right">Action</th></tr></thead>
          <tbody className="divide-y divide-gray-100">
            {items.map(item => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{item.title}</td>
                <td className="px-6 py-4">{tab === 'articles' ? item.category : item.speaker}</td>
                <td className="px-6 py-4 text-right"><button onClick={() => handleDelete(item._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ContentManagement;