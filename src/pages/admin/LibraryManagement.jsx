import { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { BookOpen, Plus, Trash2, Loader2 } from 'lucide-react';

const LibraryManagement = () => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({ title: '', author: '', category: 'Islamic', available: true });
  const [submitting, setSubmitting] = useState(false);

  const fetchBooks = async () => { const res = await api.get('/content/books'); setBooks(res.data.data || []); };
  useEffect(() => { fetchBooks(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); setSubmitting(true);
    try { await api.post('/content/books', formData); toast.success('Book added!'); setFormData({ title: '', author: '', category: 'Islamic', available: true }); fetchBooks(); }
    catch (err) { toast.error('Failed'); } finally { setSubmitting(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete book?')) return;
    await api.delete(`/content/books/${id}`); toast.success('Deleted'); fetchBooks();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><BookOpen size={24} className="text-blue-500" /> Library Management</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Add New Book</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Title *" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border rounded-md" />
            <input type="text" placeholder="Author *" required value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="w-full px-3 py-2 border rounded-md" />
            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 border rounded-md">
              <option value="Islamic">Islamic</option><option value="Academic">Academic</option><option value="Story">Story</option><option value="Science">Science</option>
            </select>
            <button type="submit" disabled={submitting} className="btn-primary w-full flex justify-center items-center gap-2">
              {submitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Add Book
            </button>
          </form>
        </div>
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs"><tr><th className="px-6 py-4">Title</th><th className="px-6 py-4">Author</th><th className="px-6 py-4">Category</th><th className="px-6 py-4 text-right">Action</th></tr></thead>
            <tbody className="divide-y divide-gray-100">
              {books.map(b => (
                <tr key={b._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{b.title}</td>
                  <td className="px-6 py-4">{b.author}</td>
                  <td className="px-6 py-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">{b.category}</span></td>
                  <td className="px-6 py-4 text-right"><button onClick={() => handleDelete(b._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default LibraryManagement;