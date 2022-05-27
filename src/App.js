import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import ManageUsers from './components/Dashboard/ManageUsers/ManageUsers';
import ManageProducts from './components/Dashboard/ManageProducts/ManageProducts';
import ProductModal from './components/common/Modal/ProductModal';
import Shop from './components/Dashboard/Shop/Shop';

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
          <Route path='shop' element={<Shop />} />
          <Route path='manageProducts' element={<ManageProducts />} >
            <Route path='addProduct' element={<ProductModal />} />
          </Route>
        </Route>
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
