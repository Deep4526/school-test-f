import { useState, useEffect } from 'react';
import api from '../../services/api';
import { FileText, Image as ImageIcon, Link as LinkIcon, Download, BookOpen } from 'lucide-react';

const Academics = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Routine', 'Syllabus', 'Exam Schedule', 'Other'];

  useEffect(() => {
    api.get('/academics').then(res => setItems(res.data.data || [])).catch(console.error);
  }, []);

  const filteredItems = filter === 'All' ? items : items.filter(i => i.category === filter);

  const getFileIcon = (type) => {
    if (type === 'pdf') return <FileText size={24} className="text-red-500" />;
    if (type === 'image') return <ImageIcon size={24} className="text-blue-500" />;
    return <LinkIcon size={24} className="text-green-500" />;
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-light rounded-full mb-4">
            <BookOpen size={32} className="text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-4">Academics (একাডেমিক তথ্য)</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Access class routines, syllabus, and exam schedules easily. Click "View / Download" to open the document.</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === cat ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Resources Grid (Public View Only) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-100">
              No resources found in this category.
            </div>
          ) : (
            filteredItems.map(item => (
              <div key={item._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                    {getFileIcon(item.fileType)}
                  </div>
                  <span className="bg-primary-light text-primary text-xs px-2 py-1 rounded font-medium">{item.category}</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                {item.description && <p className="text-sm text-gray-600 mb-4 flex-1">{item.description}</p>}
                
                {/* Public Download / View Button */}
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 bg-primary text-white px-4 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors text-sm"
                >
                  {item.fileType === 'link' ? 'Open Google Drive' : 'View / Download'} 
                  <Download size={16} />
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default Academics;