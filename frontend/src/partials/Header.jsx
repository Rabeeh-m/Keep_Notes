
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { createNote } from '../services/api';

function Header() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ note_title: '', note_content: '' });
  const [error, setError] = useState(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const openModal = (e) => {
    e.preventDefault(); // Prevent Link navigation
    if (!user) {
      navigate('/login');
      return;
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ note_title: '', note_content: '' });
    setError(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNote(formData);
      closeModal();
      // Optionally, navigate to dashboard or refresh notes if on dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create note');
    }
  };

  return (
    <>
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
            <button
              onClick={openModal}
              className="hover:text-gray-300 transition-colors"
            >
              Notes
            </button>
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-black">Add New Note</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name="note_title"
                  value={formData.note_title}
                  onChange={handleChange}
                  placeholder="Note Title"
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <textarea
                  name="note_content"
                  value={formData.note_content}
                  onChange={handleChange}
                  placeholder="Note Content"
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  rows="4"
                  required
                />
              </div>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;