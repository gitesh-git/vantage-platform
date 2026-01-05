import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { MediaProvider } from './contexts/MediaContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <MediaProvider>
        <Router basename="/vantage-platform">
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/profile" element={<Profile />} />
              {/* Protected Routes will go here later */}
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </MediaProvider>
    </AuthProvider>
  );
}

export default App;
