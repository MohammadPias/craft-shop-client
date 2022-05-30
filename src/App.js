import React from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import ProductDetails from './components/Home/ProductDetails/ProductDetails';
import Cart from './components/Cart/Cart';
import { ToastContainer } from 'react-toastify';
import Form from './components/common/Form/Form';
import { useSelector } from 'react-redux';
import RequireAuth from './components/RequireAuth/RequireAuth';

function App() {
  const user = useSelector(state => state.user.result)
  const location = useLocation()
  return (
    <div>
      <ToastContainer />
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='cart' element={<Cart />} />
        <Route path='cart/checkout' element={<RequireAuth><Form /></RequireAuth>} />
        <Route path='productDetails/:productId' element={<ProductDetails />} />

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
