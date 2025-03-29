import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token && config.url !== 'login/' && config.url !== 'register/') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = async (data) => {
  return api.post('register/', data);
};

export const login = async (data) => {
  return api.post('login/', data);
};
export const getNotes = async () => {
  return api.get('notes/');
};

export const createNote = async (data) => {
  return api.post('notes/', data);
};

export const getNote = async (noteId) => {
  return api.get(`notes/${noteId}/`);
};

export const updateNote = async (noteId, data) => {
  return api.put(`notes/${noteId}/`, data);
};

export const deleteNote = async (noteId) => {
  return api.delete(`notes/${noteId}/`);
};