import React, { useContext } from 'react'
import { Outlet } from 'react-router'
import Login from './pages/login/login';
import Menu from './pages/menu/menu';
import { AuthContext } from './App';




export const ProtectedLoggedOutRoutes = (props) => {
    const { APIData } = useContext(AuthContext)
    return (
        !APIData.isAuthenticated ? <Outlet /> : <Menu />
    )
}

export const ProtectedLoggedInRoutes = (props) => {
    const { APIData } = useContext(AuthContext)
    return (
        APIData.isAuthenticated ? <Outlet /> : <Login />
    )
}

export const ProtectedStaffRoutes = (props) => {
    const { APIData } = useContext(AuthContext)
    return (
        APIData.isAuthenticated && APIData.user && APIData.user.staff ? <Outlet /> : <Menu />
    )
}
