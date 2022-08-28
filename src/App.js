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
import ProductDetails from './components/Home/ProductDetails/ProductDetails';
import Cart from './components/Cart/Cart';
import { ToastContainer } from 'react-toastify';
import Form from './components/common/Form/Form';
import RequireAuth from './components/RequireAuth/RequireAuth';
import MyOrders from './components/Dashboard/MyOrders.js/MyOrders';
import ManageOrders from './components/Dashboard/ManageOrders/ManageOrders';
import AdminRoute from './components/AdminRoute/AdminRoute';
import DashboardHome from './components/Dashboard/DashboardHome/DashboardHome';
import UnAuthorized from './components/UnAutorized/UnAuthorized';
import Pay from './components/Dashboard/Pay/Pay';
import Feedback from './components/FeedBack/Feedback';
import Profile from './components/Dashboard/Profile/Profile';
// import UpdateProducts from './components/Dashboard/ManageProducts/UpdateProducts';
const LazyLoad = React.lazy(() => import('./components/Dashboard/ManageProducts/UpdateProducts'))

function App() {
  return (
    <div>
      <ToastContainer />
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="unauthorized" element={<UnAuthorized />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='cart' element={<Cart />} />
        <Route path='cart/checkout' element={<RequireAuth><Form /></RequireAuth>} />
        <Route path='productDetails/:productId' element={<ProductDetails />} />
        <Route path='shop' element={<Shop />} />
        <Route path='pay/:orderId' element={<Pay />} />
        <Route path='feedback/:orderId' element={<Feedback />} />

        <Route path='dashboard' element={<RequireAuth><Dashboard /></RequireAuth>} >
          <Route index element={<DashboardHome />} />
          <Route path='manageUsers' element={<AdminRoute><ManageUsers /></AdminRoute>} />
          <Route path='myOrders' element={<MyOrders />} />
          <Route path='profile' element={<Profile />} />
          <Route path='manageOrders' element={<AdminRoute><ManageOrders /></AdminRoute>} />
          <Route path='manageProducts' element={<AdminRoute><ManageProducts /></AdminRoute>} >
            <Route path='addProduct' element={<AdminRoute><ProductModal /></AdminRoute>} />
          </Route>
          <Route path='manageProducts/:productId' element={<AdminRoute>
            <React.Suspense fallback='loading...'>
              <LazyLoad />
            </React.Suspense>
          </AdminRoute>} />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;