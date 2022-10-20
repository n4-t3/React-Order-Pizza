import './App.css';
import React, { useEffect, useState } from 'react'
import Menu from './pages/menu/menu';
import Cart from './pages/cart/cart';
import NavBar from "./UI/navbar/navbar";
import Login from "./pages/login/login"
import Logout from './pages/logout/logout';
import SignUp from './pages/signup/signup';
import CheckOut from './pages/checkout/checkout';
import AddMenu from './pages/add_menu/addMenu';
import EditMenu from './pages/edit_menu/editMenu';
import OrderProgress from './pages/order_progress/orderProgress'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProtectedStaffRoutes, ProtectedLoggedInRoutes, ProtectedLoggedOutRoutes } from './protectedRoutes';
import axiosInstance from './api/axiosInstance';

export const AuthContext = React.createContext()

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [APIData, setAPIData] = useState({})
  const [serverIsLive, setServerIsLive] = useState(true)

  useEffect(() => {
    localStorage.getItem('authTokens') ? setIsAuthenticated(true) : setIsAuthenticated(false)
  }, [localStorage.getItem('authTokens')])

  useEffect(() => {
    axiosInstance.get('')
      .then(resp => {
        setServerIsLive(true)
        setAPIData((prevAPIData) => ({ ...prevAPIData, menu: resp.data, setIsAuthenticated: setIsAuthenticated, isAuthenticated: isAuthenticated }))
        return resp
      }).catch(resp=>{
        setServerIsLive(false)
        return resp}).then(resp => {
        if (isAuthenticated) {
          axiosInstance.get('api/user/')
            .then(resp => {
              setAPIData((prevAPIData) => ({ ...prevAPIData, user: resp.data }))
              return resp
            }).then(resp => {
              axiosInstance.get('api/order/')
                .then(resp => {
                  setAPIData((prevAPIData) => ({ ...prevAPIData, orders: resp.data }))
                  return resp
                }).then(resp => {
                  axiosInstance.get('api/cart/')
                    .then(resp => {
                      setAPIData((prevAPIData) => ({ ...prevAPIData, cart: resp.data }))
                      return resp
                    })
                })
            })
        }
        return resp
      })
  }, [isAuthenticated])

  return (


    <Router>
      <React.Fragment>
        <AuthContext.Provider value={{ APIData, setAPIData }}>
          <NavBar />
        </AuthContext.Provider>
        {
          !serverIsLive ? <div>
            <div className="d-flex align-items-center justify-content-center vh-100 bg-primary">
              <h1 className="display-2 fw-bold text-white">404</h1>
            </div>
          </div> :
            <div className="container">
              <AuthContext.Provider value={{ APIData, setAPIData }}>
                <Routes>
                  <Route exact path="/React-Order-Pizza/" element={<Menu />} />
                  <Route element={< ProtectedStaffRoutes />}>
                    <Route exact path="/React-Order-Pizza/addMenu/" element={<AddMenu />} />
                    <Route exact path="/React-Order-Pizza/editMenu/" element={<EditMenu />} />
                  </Route>
                  <Route element={< ProtectedLoggedOutRoutes />}>
                    <Route exact path="/React-Order-Pizza/login/" element={<Login />} />
                    <Route exact path="/React-Order-Pizza/register/" element={<SignUp />} />
                  </Route>
                  <Route element={< ProtectedLoggedInRoutes />}>
                    <Route exact path="/React-Order-Pizza/cart/" element={<Cart />} />
                    <Route exact path="/React-Order-Pizza/logout/" element={<Logout />} />
                    <Route exact path="/React-Order-Pizza/checkout/" element={<CheckOut />} />
                    <Route exact path="/React-Order-Pizza/progress/" element={<OrderProgress />} />
                  </Route>
                </Routes>
              </AuthContext.Provider>
            </div>
        }
      </React.Fragment>
    </Router>
  );
}

export default App;
