import pizzaLogo from "./svg/pizza.svg"
import { Link } from 'react-router-dom'
import React, { useContext,useState } from 'react'
import { AuthContext } from "../../App"

const NavBar = (props) => {
    const { APIData } = useContext(AuthContext)

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <p className="navbar-brand ms-4" ><img style={{ height: '25px', marginRight: '5px' }} src={pizzaLogo} /></p>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse me-4" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/React-Order-Pizza/">Home</Link>
                        </li>
                        {APIData.isAuthenticated && <li className="nav-item">
                            <Link className="nav-link" to="/React-Order-Pizza/cart/">Cart</Link>
                        </li>}
                        {!APIData.isAuthenticated && <li className="nav-item">
                            <Link className="nav-link" to="/React-Order-Pizza/login/">Login</Link>
                        </li>}
                        {APIData.isAuthenticated && <li className="nav-item">
                            <Link className="nav-link" to="/React-Order-Pizza/logout/" >Logout</Link>
                        </li>}
                        {!APIData.isAuthenticated && <li className="nav-item">
                            <Link className="nav-link" to="/React-Order-Pizza/register/">Register</Link>
                        </li>}
                        {APIData.isAuthenticated && <li className="nav-item">
                            <Link className="nav-link" to="/React-Order-Pizza/progress/">Progress</Link>
                        </li>}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar