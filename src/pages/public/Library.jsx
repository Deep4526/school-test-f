import { useState, useEffect } from 'react';
import api from '../../services/api';
import { BookOpen, Search } from 'lucide-react';

const Library = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => { api.get('/content/books').then(res => setBooks(res.data.data || [])); }, []);

  const filteredBooks = books.filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4"><BookOpen size={32} className="text-blue-600" /></div>
          <h1 className="text-4xl font-bold text-primary mb-2">Digital Library</h1>
          <p className="text-gray-600">Explore our collection of Islamic and academic books.</p>
        </div>

        <div className="max-w-xl mx-auto mb-10 relative">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input type="text" placeholder="Search by title or author..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-primary shadow-sm" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBooks.length === 0 ? <p className="col-span-full text-center text-gray-500">No books found.</p> :
          filteredBooks.map(book => (
            <div key={book._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col">
              <div className="w-full h-40 bg-primary-light rounded-lg flex items-center justify-center mb-4"><BookOpen size={40} className="text-primary" /></div>
              <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{book.title}</h3>
              <p className="text-sm text-gray-500 mb-3">by {book.author}</p>
              <div className="mt-auto flex justify-between items-center">
                <span className="text-xs bg-accent-light text-accent-dark px-2 py-1 rounded font-medium">{book.category}</span>
                <span className={`text-xs font-medium ${book.available ? 'text-green-600' : 'text-red-600'}`}>{book.available ? 'Available' : 'Issued'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Library;