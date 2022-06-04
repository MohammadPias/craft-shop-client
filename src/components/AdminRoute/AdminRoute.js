import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const user = useSelector(state => state.user.result)
    const location = useLocation();
    // console.log(user?.role)
    if (user?.role === 'admin') {
        return children;
    } else {
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
};

export default AdminRoute;