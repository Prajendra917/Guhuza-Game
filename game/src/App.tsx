import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';
import Play from './components/play';
import Profile from './components/Profile';
import Badges from './components/src_Badges/Badges';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Leaderboard" element={<Leaderboard/>}/>
        <Route path="/Play" element={<Play/>}/>
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/Badges" element={<Badges/>}/>
      </Routes>
    </Router>
  );
};

export default App;