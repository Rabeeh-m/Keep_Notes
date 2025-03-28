
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';

function Login() {
  const [formData, setFormData] = useState({ 
    user_email: '', 
    password: '' 
  });
  
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.user_email || !formData.password) {
      return; // Validation is handled by Redux in this pattern
    }

    try {
      const result = await dispatch(loginUser(formData)).unwrap();
      if (result) {
        navigate('/');
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <section className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-black">Login</span>
              </div>

              <div className="mb-6">
                <label className="block mt-1 text-gray-700" htmlFor="user_email">
                  Email
                </label>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-base"
                  value={formData.user_email}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Email address"
                />
                {error?.user_email && (
                  <p className="mt-1 text-sm text-red-600">{error.user_email[0]}</p>
                )}
              </div>

              <div className="mb-6">
                <label className="block mt-1 text-gray-700" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-base"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Password"
                />
                {error?.password && (
                  <p className="mt-1 text-sm text-red-600">{error.password[0]}</p>
                )}
              </div>

              {(error?.error || error?.general) && (
                <p className="mb-4 text-sm text-red-600">{error.error || error.general}</p>
              )}

              <div className="mb-6">
                <button
                  className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 text-base font-medium transition-colors disabled:opacity-50"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </div>

              <p className="mb-5 text-gray-700">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-blue-900 hover:underline font-medium"
                >
                  Register Now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;