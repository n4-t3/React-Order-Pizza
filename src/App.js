import './App.css';
import React, { useEffect, useState, useContext } from 'react'
import Menu from './pages/menu/menu';
import Cart from './pages/cart/cart';
import NavBar from "./UI/navbar/navbar";
import Login from "./pages/login/login"
import Logout from './pages/logout/logout';
import SignUp from './pages/signup/signup';
import CheckOut from './pages/checkout/checkout';
import OrderProgress from './pages/order_progress/orderProgress'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import useAPI from './hooks/useAPI/useAPI';
import ProtectedRoutes from './protectedRoutes';

export const AuthContext = React.createContext()

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  useEffect(() => {
    try {
      useAPI.get("api/user/")
      .then( data=> {
        try{
          data.data.user_id ? setIsAuthenticated(true) : setIsAuthenticated(false)
        }
        catch{
          setIsAuthenticated(false)
        }
      })
    }catch{
      alert('server Error')
    }
})

  const data = {
    isAuthenticated: isAuthenticated,
    setIsAuthenticated: setIsAuthenticated
  }


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
              {!isAuthenticated && <Route exact path="/React-Order-Pizza/login/" element={<Login />} />}
              {!isAuthenticated && <Route exact path="/React-Order-Pizza/register/" element={<SignUp />} />}
              <Route element={< ProtectedRoutes />}>
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
