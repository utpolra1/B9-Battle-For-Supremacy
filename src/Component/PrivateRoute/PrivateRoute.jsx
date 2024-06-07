import React, { useContext } from 'react';
import { Navigate,useLocation } from 'react-router-dom';
import { authContext } from '../../Firebase/AuthProvider';

const PrivetRoute = ({children}) => {
    const {user, loading}=useContext(authContext);
    const location=useLocation();

    if(user){
        return children;
    }

    return <Navigate to="/login" state={location.pathname}></Navigate>
};

export default PrivetRoute;