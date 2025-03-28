
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/authSlice';

function Register() {
  const [formData, setFormData] = useState({
    user_email: '',
    user_name: '',
    password: '',
    password2: ''
  });
  const [localError, setLocalError] = useState(null);
  
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!formData.user_email || !formData.user_name || !formData.password || !formData.password2) {
      setLocalError('All fields are required');
      return;
    }
    if (formData.password !== formData.password2) {
      setLocalError('Passwords do not match');
      return;
    }

    try {
      const result = await dispatch(registerUser({
        user_email: formData.user_email,
        user_name: formData.user_name,
        password: formData.password
      })).unwrap();
      
      if (result) {
        navigate('/login');
      }
    } catch (err) {
      console.error('Registration failed:', err);
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
                <span className="text-2xl font-bold text-black">
                  Sign up
                </span>
              </div>

              <div className="mb-2">
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
                />
                {error?.user_email && <p className="text-sm text-red-600">{error.user_email[0]}</p>}
              </div>

              <div className="mb-2">
                <label className="block mt-1 text-gray-700" htmlFor="user_name">
                  Username
                </label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-base"
                  value={formData.user_name}
                  onChange={handleChange}
                  disabled={loading}
                />
                {error?.user_name && <p className="text-sm text-red-600">{error.user_name[0]}</p>}
              </div>

              <div className="mb-2">
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
                />
                {error?.password && <p className="text-sm text-red-600">{error.password[0]}</p>}
              </div>

              <div className="mb-2">
                <label className="block mt-1 text-gray-700" htmlFor="password2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="password2"
                  name="password2"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-base"
                  value={formData.password2}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              {(localError || error?.general) && (
                <p className="mb-4 text-sm text-red-600">{localError || error.general}</p>
              )}

              <div className="mb-6">
                <button
                  className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 text-base font-medium transition-colors disabled:opacity-50"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </div>

              <p className="mb-5 text-gray-700">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-blue-900 hover:underline font-medium"
                >
                  Login Now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;