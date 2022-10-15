import loginCSS from './login.module.scss'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAPI from '../../hooks/useAPI/useAPI'

const Login = (props) => {
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
        console.log(loginForm)

        useAPI
            .post(`api/token/`, {
                email: loginForm.email,
                password: loginForm.password,
            })
            .then(
                (res) => {
                    console.log(res.data)
                    localStorage.setItem('authTokens',  JSON.stringify(res.data))
                    useAPI.defaults.headers['Authorization'] = `JWT ${res.data.access}`
                    navigate('/React-Order-Pizza/')
                    console.log(res)
                    console.log(res.data)
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