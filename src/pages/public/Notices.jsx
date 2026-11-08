import { useState, useEffect, useMemo } from 'react';
import api from '../../services/api';
import { Calendar, FileText, Search, X, Download, Megaphone, AlertCircle, Printer, ChevronRight, Sparkles } from 'lucide-react';

const CATEGORIES = ['All', 'General', 'Admission', 'Exam', 'Holiday', 'Event'];

const getBadgeClass = (category) => {
  switch (category) {
    case 'Admission': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Exam': return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'Holiday': return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'Event': return 'bg-sky-50 text-sky-700 border-sky-200';
    default: return 'bg-blue-50 text-blue-700 border-blue-200';
  }
};

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNotice, setActiveNotice] = useState(null);

  const fetchNotices = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/notices');
      setNotices(res.data.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load notices. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNotices(); }, []);

  const filteredNotices = useMemo(() => {
    return notices.filter((n) => {
      const matchCat = selectedCategory === 'All' || n.category === selectedCategory;
      const matchSearch = !searchQuery.trim() ||
        n.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [notices, selectedCategory, searchQuery]);

  const formatDate = (dateStr) => {
    if (!dateStr) return { day: '--', month: '', full: '' };
    const d = new Date(dateStr);
    return {
      day: d.getDate(),
      month: d.toLocaleString('default', { month: 'short' }),
      full: d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    };
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl p-8 mb-8 shadow-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-accent mb-3">
            <Megaphone size={14} /> Official Announcements
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Notice Board</h1>
          <p className="text-primary-50 text-sm md:text-base">Real-time official notices, routines, and announcements.</p>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-4 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notices by title or keywords..."
                className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <X size={16} />
                </button>
              )}
            </div>
            <div className="text-xs text-gray-500 font-medium">
              Showing <span className="font-bold text-gray-800">{filteredNotices.length}</span> of {notices.length} notices
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat} {cat === 'All' ? `(${notices.length})` : `(${notices.filter(n => n.category === cat).length})`}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="p-12 text-center text-gray-500">Loading notices...</div>
        )}

        {error && (
          <div className="p-8 bg-red-50 text-red-600 rounded-xl text-center">
            {error} <button onClick={fetchNotices} className="underline font-bold ml-2">Retry</button>
          </div>
        )}

        {!loading && !error && filteredNotices.length === 0 && (
          <div className="bg-white rounded-xl border border-dashed border-gray-200 p-12 text-center max-w-md mx-auto my-8">
            <Megaphone className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-gray-800 mb-1">No Notices Found</h3>
            <p className="text-xs text-gray-500 mb-4">
              {searchQuery || selectedCategory !== 'All' ? 'No notices matched your criteria.' : 'No notices have been published yet.'}
            </p>
            {(searchQuery || selectedCategory !== 'All') && (
              <button onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }} className="btn-outline !py-1.5 !px-3 text-xs">
                Clear Filters
              </button>
            )}
          </div>
        )}

        {!loading && !error && filteredNotices.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotices.map((n) => {
              const dt = formatDate(n.date || n.createdAt);
              return (
                <div key={n._id} className="bg-white rounded-xl border border-gray-100 shadow-xs hover:shadow-md transition flex flex-col justify-between overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="bg-primary text-white rounded-lg p-2 text-center min-w-[52px]">
                        <div className="text-lg font-bold leading-none">{dt.day}</div>
                        <div className="text-[10px] uppercase">{dt.month}</div>
                      </div>
                      <div className="flex flex-wrap items-center justify-end gap-1 flex-1">
                        {n.isImportant && (
                          <span className="inline-flex items-center gap-0.5 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            <Sparkles size={10} /> Important
                          </span>
                        )}
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getBadgeClass(n.category)}`}>
                          {n.category || 'General'}
                        </span>
                      </div>
                    </div>
                    <h3 onClick={() => setActiveNotice(n)} className="font-bold text-gray-900 hover:text-primary transition cursor-pointer mb-2 line-clamp-2">
                      {n.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">{n.description}</p>
                  </div>
                  <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs">
                    <button onClick={() => setActiveNotice(n)} className="inline-flex items-center gap-1 font-semibold text-primary hover:text-accent">
                      <FileText size={14} /> Read Details <ChevronRight size={13} />
                    </button>
                    {n.attachment && (
                      <a href={n.attachment} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-gray-500 hover:text-primary">
                        <Download size={13} /> Attachment
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {activeNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs" onClick={() => setActiveNotice(null)}>
          <div className="bg-white rounded-2xl shadow-xl max-w-xl w-full overflow-hidden max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 flex items-start justify-between gap-4 bg-gray-50">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getBadgeClass(activeNotice.category)}`}>
                    {activeNotice.category || 'General'}
                  </span>
                  {activeNotice.isImportant && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Important</span>
                  )}
                </div>
                <h2 className="text-lg font-bold text-gray-900">{activeNotice.title}</h2>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Calendar size={13} />
                  <span>{formatDate(activeNotice.date || activeNotice.createdAt).full}</span>
                </div>
              </div>
              <button onClick={() => setActiveNotice(null)} className="text-gray-400 hover:text-gray-600 p-1">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 text-sm text-gray-700 whitespace-pre-line leading-relaxed">
              {activeNotice.description}
              {activeNotice.attachment && (
                <div className="mt-4 p-3 bg-primary-50 rounded-lg flex items-center justify-between">
                  <span className="text-xs font-medium text-primary">Attached Document</span>
                  <a href={activeNotice.attachment} target="_blank" rel="noopener noreferrer" className="btn-primary !py-1 !px-3 text-xs inline-flex items-center gap-1">
                    <Download size={13} /> Download
                  </a>
                </div>
              )}
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <button onClick={() => window.print()} className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900">
                <Printer size={14} /> Print
              </button>
              <button onClick={() => setActiveNotice(null)} className="btn-outline !py-1.5 !px-4 text-xs">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notices;