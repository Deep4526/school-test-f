import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Newspaper } from 'lucide-react';

const PressRelease = () => {
  const [press, setPress] = useState([]);
  useEffect(() => { api.get('/misc/press').then(res => setPress(res.data.data || [])); }, []);

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">Press Release</h1>
        <div className="space-y-6">
          {press.map(p => (
            <div key={p._id} className="bg-white p-8 rounded-xl shadow-sm flex gap-6">
              {p.imageUrl && <img src={p.imageUrl} alt={p.title} className="w-32 h-32 object-cover rounded-lg" />}
              <div><h2 className="text-xl font-bold text-gray-900 mb-2">{p.title}</h2><p className="text-xs text-gray-500 mb-3">{new Date(p.date).toLocaleDateString()}</p><p className="text-gray-700">{p.content}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default PressRelease;