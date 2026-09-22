import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Hero from './components/Hero/Hero.jsx';

import Title from './components/Title/Title';
import About from './components/About/project';
import Campus from './components/Campus/Campus';

import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

// Importing pages
import AdminLogin from './page/AdminLogin';
import CollegeDetails from './page/CollegeDetails';
import Login from './page/Login';
import Register from './page/Register';
import Admission from './page/admission';
import StaffLogin from './page/StaffLogin';
import Dashboard from "./page/Dashboard";
import Home from "./page/Home.jsx";

function App() {
  return (
    <Router>
     
      <Routes>
       <Route path="/" element={<Home/>} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/college-details" element={<CollegeDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/staff-login" element={<StaffLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;