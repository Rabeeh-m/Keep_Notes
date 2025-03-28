import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/authSlice';

const Home = () => {
  const user = useSelector(selectCurrentUser);
  const username = user?.user_name || 'Guest';

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Good Morning {username}!</h1>
      <p className="mt-2">Welcome to our Keep Notes.</p>
    </div>
  );
};

export default Home;