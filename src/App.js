import './App.css';
import React, { useEffect, useState } from 'react'
import Menu from './pages/menu/menu';
import Cart from './pages/cart/cart';
import NavBar from "./UI/navbar/navbar";
import Login from "./pages/login/login"
import Logout from './pages/logout/logout';
import SignUp from './pages/signup/signup';
import CheckOut from './pages/checkout/checkout';
import OrderProgress from './pages/order_progress/orderProgress'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProtectedLoggedInRoutes, ProtectedLoggedOutRoutes } from './protectedRoutes';
import axiosInstance from './api/axiosInstance';

export const AuthContext = React.createContext()

function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [menu,setMenu] = useState(null)
  const [user,setUser] = useState(null)
  const [orders,setOrders] = useState(null)

  useEffect(() => {
    localStorage.getItem('authTokens') ? setIsAuthenticated(true) : setIsAuthenticated(false)
  }, [localStorage.getItem('authTokens')])

  let data = {
    isAuthenticated, setIsAuthenticated,menu,user,orders
  }
  
  useEffect(() => {
    axiosInstance.get('')
        .then(resp => {
          setMenu(resp.data)
        })
    if (isAuthenticated) {
      axiosInstance.get('api/user/')
        .then(resp => {
          setUser(resp.data)
        })
      axiosInstance.get('api/order/')
        .then(resp => {
          setOrders(resp.data)
        })
    }
  }, [isAuthenticated])

  return (
    <Router>
      <React.Fragment>
        <AuthContext.Provider value={data}>
          <NavBar></NavBar>
        </AuthContext.Provider>
        <div className="container">
          <AuthContext.Provider value={data}>
            <Routes>
              <Route exact path="/React-Order-Pizza/" element={<Menu />} />
              <Route exact path="/React-Order-Pizza/cart/" element={<Cart />} />
              <Route element={< ProtectedLoggedOutRoutes />}>
                <Route exact path="/React-Order-Pizza/login/" element={<Login />} />
                <Route exact path="/React-Order-Pizza/register/" element={<SignUp />} />
              </Route>
              <Route element={< ProtectedLoggedInRoutes />}>
                <Route exact path="/React-Order-Pizza/logout/" element={<Logout />} />
                <Route exact path="/React-Order-Pizza/checkout/" element={<CheckOut />} />
                <Route exact path="/React-Order-Pizza/progress/" element={<OrderProgress />} />
              </Route>
            </Routes>
          </AuthContext.Provider>
        </div>
      </React.Fragment>
    </Router>
  );
}

export default App;
