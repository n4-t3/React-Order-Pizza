import React, { useContext } from 'react'
import { Outlet } from 'react-router'
import Login from './pages/login/login';
import Menu from './pages/menu/menu';
import { AuthContext } from './App';




export const ProtectedLoggedOutRoutes = (props) => {
    const ctx = useContext(AuthContext)
    return (
        !ctx.isAuthenticated ? <Outlet /> : <Menu />
    )
}

export const ProtectedLoggedInRoutes = (props) => {
    const ctx = useContext(AuthContext)
    return (
        ctx.isAuthenticated ? <Outlet /> : <Login />
    )
}
