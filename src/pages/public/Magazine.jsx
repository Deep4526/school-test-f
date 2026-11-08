import { useState, useEffect } from 'react';
import api from '../../services/api';
import { BookOpen } from 'lucide-react';

const Magazine = () => {
  const [mags, setMags] = useState([]);
  useEffect(() => { api.get('/misc/magazines').then(res => setMags(res.data.data || [])); }, []);

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">Annual Magazine</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {mags.map(m => (
            <div key={m._id} className="bg-white p-6 rounded-xl shadow-sm flex gap-4 items-center">
              {m.coverImageUrl && <img src={m.coverImageUrl} alt={m.title} className="w-24 h-32 object-cover rounded" />}
              <div className="flex-1"><h3 className="font-bold text-lg text-gray-900">{m.title}</h3><p className="text-sm text-gray-500 mb-3">Year: {m.year}</p><a href={m.pdfUrl} target="_blank" rel="noopener noreferrer" className="btn-primary !py-2 !px-4 text-sm flex items-center gap-2 w-fit"><BookOpen size={16} /> Read PDF</a></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Magazine;