import { useState, useEffect } from 'react';
import api from '../../services/api';
import { BookHeart } from 'lucide-react';

const IslamicCorner = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => { api.get('/content/articles').then(res => setArticles(res.data.data || [])); }, []);

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4"><BookHeart size={32} className="text-green-600" /></div>
          <h1 className="text-4xl font-bold text-primary mb-2">Islamic Corner</h1>
          <p className="text-gray-600">Articles, Masala-Masayel, and daily practices.</p>
        </div>

        <div className="space-y-6">
          {articles.length === 0 ? <p className="text-center text-gray-500">No articles published yet.</p> :
          articles.map(article => (
            <div key={article._id} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-primary-light text-primary px-3 py-1 rounded-full text-xs font-bold">{article.category}</span>
                <span className="text-xs text-gray-400">{new Date(article.createdAt).toLocaleDateString()}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{article.title}</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{article.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default IslamicCorner;