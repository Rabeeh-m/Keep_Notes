
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/authSlice';
import { getNotes, updateNote, deleteNote } from '../services/api';

const Home = () => {
  const user = useSelector(selectCurrentUser);
  const username = user?.user_name || 'Guest';
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    note_title: '',
    note_content: ''
  });

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await getNotes();
        setNotes(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load notes');
        setLoading(false);
      }
    };

    if (user) {
      fetchNotes();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setEditForm({
      note_title: note.note_title,
      note_content: note.note_content
    });
    setIsEditing(false);
  };

  const handleEdit = async () => {
    try {
      const updatedNote = await updateNote(selectedNote.note_id, editForm);
      setNotes(notes.map(note => 
        note.note_id === selectedNote.note_id ? updatedNote.data : note
      ));
      setSelectedNote(updatedNote.data);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update note');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteNote(selectedNote.note_id);
      setNotes(notes.filter(note => note.note_id !== selectedNote.note_id));
      setSelectedNote(null);
    } catch (err) {
      setError('Failed to delete note');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Good Morning {username}!</h1>

      {loading ? (
        <p className="text-gray-500">Loading notes...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : notes.length === 0 ? (
        <p className="text-gray-500">No notes available. Create one to get started!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {notes.map((note) => (
            <div
              key={note.note_id}
              onClick={() => handleNoteClick(note)}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow flex flex-col h-full cursor-pointer"
            >
              <h2 className="text-lg font-semibold text-gray-800 truncate pb-2 border-b border-gray-200">
                {note.note_title}
              </h2>
              <div className="py-3 border-b border-gray-200 flex-grow min-h-[100px]">
                <p className="text-gray-600 line-clamp-5 h-full">
                  {note.note_content}
                </p>
              </div>
              <p className="mt-2 text-sm text-gray-500 pt-2">
                Last Updated: {new Date(note.last_update).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Note Modal */}
      {selectedNote && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-6">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="note_title"
                    value={editForm.note_title}
                    onChange={handleInputChange}
                    className="w-full text-lg font-semibold p-2 mb-4 border border-gray-300 rounded"
                  />
                  <textarea
                    name="note_content"
                    value={editForm.note_content}
                    onChange={handleInputChange}
                    className="w-full h-64 p-2 border border-gray-300 rounded"
                  />
                </>
              ) : (
                <>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    {selectedNote.note_title}
                  </h2>
                  <div className="h-64 overflow-y-auto">
                    <p className="text-gray-600 whitespace-pre-wrap">
                      {selectedNote.note_content}
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="bg-gray-50 px-6 py-3 flex justify-between border-t border-gray-200">
              <div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
                {isEditing && (
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                )}
              </div>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
            <button
              onClick={() => setSelectedNote(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;