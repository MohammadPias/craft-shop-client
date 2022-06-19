import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import LoaderComponent from '../common/Loader/Loader';

const AdminRoute = ({ children }) => {
    const { result, loading } = useSelector(state => ({ ...state.user }))
    const location = useLocation();
    // console.log(result)
    if (loading) {
        <LoaderComponent />
    }
    if (result?.role === 'admin') {
        return children;
    } else {
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
};

export default AdminRoute;