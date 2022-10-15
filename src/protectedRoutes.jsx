import React, { useContext } from 'react'
import { Outlet } from 'react-router'
import Login from './pages/login/login';
import { AuthContext } from './App';

export const ProtectedRoutes = (props) => {
    const ctx = useContext(AuthContext)
    return (
        ctx.isAuthenticated ? <Outlet /> : <Login />
    )
}
export default ProtectedRoutes