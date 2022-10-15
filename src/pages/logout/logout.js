import { useEffect, useContext,useLayoutEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAPI from "../../hooks/useAPI/useAPI"
import { AuthContext } from "../../App"

const Logout = (props) => {
    const navigate = useNavigate()
    const ctx = useContext(AuthContext)
    console.log(ctx.isAuthenticated)
    useEffect(() => {
        ctx.setIsAuthenticated(false)
        console.log(ctx.setIsAuthenticated(false))
        if (localStorage.getItem('authTokens')){
            const response = useAPI
            .post(`api/token/blacklist/`, {
                refresh: JSON.parse(localStorage.getItem('authTokens'))["refresh"]
            })
            console.log(JSON.parse(localStorage.getItem('authTokens'))["refresh"])
            localStorage.removeItem('authTokens')
            useAPI.defaults.headers['Authorization'] = null
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