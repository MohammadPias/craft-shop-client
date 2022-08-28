import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import LoaderComponent from '../common/Loader/Loader';

const AdminRoute = ({ children }) => {
    const { result: user, loading, error } = useSelector(state => ({ ...state.user }))
    const location = useLocation();
    console.log(user.isAdmin, loading, error, "lodingCheck")
    if (loading) {
        <LoaderComponent />
    }
    if (!user?.isAdmin && !user?.email) {
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    } else {
        return children;
    }
};

export default AdminRoute;