import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import ManageUsers from './components/Dashboard/ManageUsers/ManageUsers';

function App() {
  return (
    <div>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />

        <Route path='dashboard' element={<Dashboard />} >
          <Route path='manageUsers' element={<ManageUsers />} />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
