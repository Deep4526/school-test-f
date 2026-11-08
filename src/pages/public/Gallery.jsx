import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Image, Video } from 'lucide-react';

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => { api.get('/misc/galleries').then(res => setItems(res.data.data || [])); }, []);

  const filtered = filter === 'all' ? items : items.filter(i => i.type === filter);

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">School Gallery</h1>
        <div className="flex justify-center gap-4 mb-8">
          <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}>All</button>
          <button onClick={() => setFilter('image')} className={`px-4 py-2 rounded-full ${filter === 'image' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}>Photos</button>
          <button onClick={() => setFilter('video')} className={`px-4 py-2 rounded-full ${filter === 'video' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}>Videos</button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map(item => (
            <div key={item._id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition">
              {item.type === 'image' ? <img src={item.url} alt={item.title} className="w-full h-48 object-cover" /> : <div className="w-full h-48 bg-black flex items-center justify-center"><Video size={40} className="text-white" /></div>}
              <div className="p-4"><h3 className="font-bold text-gray-900">{item.title}</h3><p className="text-xs text-gray-500 mt-1">{item.category}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Gallery;