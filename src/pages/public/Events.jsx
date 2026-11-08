import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Calendar } from 'lucide-react';

const Events = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => { api.get('/misc/events').then(res => setEvents(res.data.data || [])); }, []);

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">Events & Activities</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {events.map(e => (
            <div key={e._id} className="bg-white rounded-xl overflow-hidden shadow-sm">
              {e.imageUrl && <img src={e.imageUrl} alt={e.title} className="w-full h-48 object-cover" />}
              <div className="p-6"><h3 className="font-bold text-lg text-gray-900 mb-2">{e.title}</h3><p className="text-sm text-gray-600 mb-3">{e.description}</p><p className="text-xs text-primary font-medium flex items-center gap-1"><Calendar size={12} /> {new Date(e.date).toLocaleDateString()}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Events;