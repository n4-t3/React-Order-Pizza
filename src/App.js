import './App.css';
import React from 'react'
import Menu from './pages/menu/menu';
import Cart from './pages/cart/cart';
import NavBar from "./UI/navbar/navbar";
import Login from "./pages/login/login"
import SignUp from './pages/signup/signup';
import CheckOut from './pages/checkout/checkout';
import OrderProgress from './pages/order_progress/orderProgress'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <Router>
      <React.Fragment>
        <NavBar></NavBar>
        <div className="container">
          <Routes>
            <Route exact path="/React-Order-Pizza/" element={<Menu/>} />
            <Route exact path="/React-Order-Pizza/cart/" element={<Cart/>} />
            <Route exact path="/React-Order-Pizza/login/" element={<Login/>} />
            <Route exact path="/React-Order-Pizza/register/" element={<SignUp/>} />
            <Route exact path="/React-Order-Pizza/checkout/" element={<CheckOut/>} />
            <Route exact path="/React-Order-Pizza/progress/" element={<OrderProgress/>} />
          </Routes>
        </div>
      </React.Fragment>
    </Router>
  );
}

export default App;
