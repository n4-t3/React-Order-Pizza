import loginCSS from './login.module.scss'
import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'
import axiosInstance from '../../api/axiosInstance'

const Login = (props) => {
    const { APIData, setAPIData} = useContext(AuthContext)
    const navigate = useNavigate();
    const initialLoginForm = Object.freeze({
        email: "",
        password: ""
    })
    const [loginForm, setLoginForm] = useState(initialLoginForm)
    const handleChange = (e) => {
        setLoginForm((prevLoginForm) => {
            return {
                ...prevLoginForm,
                [e.target.name]: e.target.value.trim()
            }
        })
    }
    const handleLogin = (e) => {
        e.preventDefault()

        axiosInstance
            .post(`api/token/`, {
                email: loginForm.email,
                password: loginForm.password,
            })
            .then(
                (res) => {
                    localStorage.setItem('authTokens',  JSON.stringify(res.data))
                    axiosInstance.defaults.headers['Authorization'] = `JWT ${res.data.access}`
                    APIData.setIsAuthenticated(true)
                    navigate('/React-Order-Pizza/')
                }
            )
    }

    return (
        <div className="container mt-4">
            <form>
                <div className='display-4 mb-4'>Login</div>
                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="inputEmail" name="email" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword" name="password" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleLogin}>Login</button>
            </form>
        </div>
    )
}

export default Login