import { useEffect, useContext,useLayoutEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../App"
import axiosInstance from "../../api/axiosInstance"

const Logout = (props) => {
    const navigate = useNavigate()
    const ctx = useContext(AuthContext)
    useEffect(() => {
        ctx.setIsAuthenticated(false)
        if (localStorage.getItem('authTokens')){
            const response = axiosInstance
            .post(`api/token/blacklist/`, {
                refresh: JSON.parse(localStorage.getItem('authTokens'))["refresh"]
            })
            localStorage.removeItem('authTokens')
            axiosInstance.defaults.headers['Authorization'] = null
            navigate('/React-Order-Pizza/login/')
        } else{
            navigate('/React-Order-Pizza/login/')
        }
    })
    return (
        <div>Logging out</div>
    )
}

export default Logout