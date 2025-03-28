
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';

function Header() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-black text-white py-4 px-6 border-b border-gray-700">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side: Project Name */}
        <Link to="/" className="text-2xl font-bold hover:text-gray-300 transition-colors">
          Keep Notes
        </Link>

        {/* Right Side: Navigation */}
        <nav className="flex items-center space-x-6">
          <Link
            to="/about"
            className="hover:text-gray-300 transition-colors"
          >
            About
          </Link>
          <Link
            to="/notes"
            className="hover:text-gray-300 transition-colors"
          >
            Notes
          </Link>
          <Link
            to="/account"
            className="hover:text-gray-300 transition-colors"
          >
            Account
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="hover:text-gray-300 transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="hover:text-gray-300 transition-colors"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;