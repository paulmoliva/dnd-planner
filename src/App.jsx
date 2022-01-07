import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import React from 'react';

import './App.css';

import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <div className="App">
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;