import signUpCSS from './signup.module.scss'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import axiosInstance from '../../api/axiosInstance'

const SignUp = (props) => {
    const navigate = useNavigate()
    const initialSignUpData = Object.freeze({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    })
    const [signUpForm, setSignUpForm] = useState(initialSignUpData)
    const handleChange = (e) => {
        setSignUpForm((prevSignUpForm) => {
            return {
                ...prevSignUpForm,
                [e.target.name]: e.target.value.trim()
            }
        })
    }
    const handleSignUp = (e) => {
        e.preventDefault()

        axiosInstance
            .post(`api/register/`, {
                first_name: signUpForm.first_name,
                last_name: signUpForm.last_name,
                email: signUpForm.email,
                password: signUpForm.password
            })
            .then(
                (res) =>{
                    navigate('/React-Order-Pizza/login/')
                }
            )
    }

    return (
        <div className="container mt-4">
            <form>
                <div className='display-4 mb-4'>Sign Up</div>
                <div className="w-100 mb-3 d-flex flex-row">
                    <div className="me-4 w-50">
                        <label htmlFor="inputFirstName" className="form-label">First Name</label>
                        <input type="text" name="first_name" onChange={handleChange} className="form-control" id="inputFirstName" />
                    </div>
                    <div className="w-50">
                        <label htmlFor="inputLastName" className="form-label" >Last Name</label>
                        <input type="text" className="form-control" id="inputLastName" name="last_name" onChange={handleChange} />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label" >Email address</label>
                    <input type="email" className="form-control" id="inputEmail" name="email" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label" >Password</label>
                    <input type="password" className="form-control" id="inputPassword" name="password" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSignUp}>Sign Up</button>
            </form>
        </div>
    )
}
export default SignUp