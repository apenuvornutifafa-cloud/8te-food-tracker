import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Leaf } from 'lucide-react';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const { signup, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await signup(formData.name, formData.email, formData.password, formData.phone);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-8te-yellow to-yellow-500 flex items-center justify-center p-4">
      <div className="bg-8te-dark p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <Leaf className="text-8te-yellow mr-2" size={32} />
          <h1 className="text-4xl font-bold text-8te-yellow">8te</h1>
        </div>
        
        <h2 className="text-2xl font-bold text-8te-yellow text-center mb-2">Join 8te</h2>
        <p className="text-gray-400 text-center mb-6">Reduce food waste, save money & help the planet</p>
        
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-8te-yellow font-semibold mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-primary bg-8te-light"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-8te-yellow font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-primary bg-8te-light"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-8te-yellow font-semibold mb-2">Phone (Optional)</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-primary bg-8te-light"
              placeholder="+1234567890"
            />
          </div>

          <div>
            <label className="block text-8te-yellow font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-primary bg-8te-light"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block text-8te-yellow font-semibold mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input-primary bg-8te-light"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-6"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-8te-yellow font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
