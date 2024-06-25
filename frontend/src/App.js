import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Posts from './Posts'

import Signup from './Signup/Signup';
import Login from './Login/Login';
import Main from './Mainscreen/Main';
import Profile from './Mainscreen/Profile';

function App() {
  return (
    <BrowserRouter>  
      <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/main" element={<Main/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/profile" element={<Profile/>} />

      </Routes>
  </BrowserRouter>
);
}

export default App;
