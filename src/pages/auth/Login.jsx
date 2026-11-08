import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      toast.success('Login successful!');
      const role = res.data.role;
      if (role === 'admin' || role === 'super_admin') {
        navigate('/admin');
      } else if (role === 'student') {
        navigate('/student');
      } else if (role === 'parent') {
        navigate('/parent');
      } else {
        navigate('/');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-card">
        <h2 className="text-3xl font-bold text-primary text-center mb-6">Login to Portal</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-primary" />
          </div>
          <button type="submit" className="btn-primary w-full">Sign In</button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <Link to="/register" className="text-primary font-medium hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};
export default Login;