import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    const user = useSelector(state => state.user.result)
    const location = useLocation();
    console.log(children)
    if (!user.email) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    } else {
        return children;
    }
};

export default RequireAuth;