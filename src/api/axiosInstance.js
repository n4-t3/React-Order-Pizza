import axios from "axios";

export const baseURL = "http://127.0.0.1:8000/"

let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null


const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        Authorization: localStorage.getItem('authTokens') ? `JWT ${JSON.parse(localStorage.getItem('authTokens')).access}` : null,
        'Content-Type': 'application/json',
        accept: 'application/json',
    }
})


axiosInstance.interceptors.response.use((response) => {
    return response
},
    async (error) => {
        console.log('requesting refresh')
        const originalRequest = error.config
        if(error.response.status==403){
            console.log('here')
            return Promise.resolve('not loged in')
        }
        if (typeof error === 'undefined') {
            alert('A server/ Network /CORS error had occurred')
            return Promise.reject(error)
        }
        if (error.response.status === 401 && originalRequest.url === baseURL + 'token/refresh/') {
            window.location.href = '/login/'
            return Promise.reject(error)
        }
        if (error.response.data.code === 'token_not_valid' && error.response.status === 401 && error.response.statusText === 'Unauthorized') {
            const refreshToken = localStorage.getItem('authToken').refresh
            if (refreshToken) {
                const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]))
                const now = Math.ceil(Date.now() / 1000)
                console.log(tokenParts.exp)
                if (tokenParts.exp > now) {
                    console.log('git refresh')
                    return axiosInstance
                        .post(`${baseURL}api/token/refresh/`, {
                            refresh: JSON.parse(authTokens).refresh
                        }).then((response) => {
                            localStorage.setItem('authTokens', JSON.stringify(response.data))
                            axiosInstance.defaults.headers['Authorization'] = `JWT ${response.data.access}`
                            originalRequest.defaults.headers['Authorization'] = `JWT ${response.data.access}`
                            return axiosInstance(originalRequest)
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                } else {
                    console.log('refresh token has expired')
                    window.location.href = '/login/'
                }
            } else {
                console.log('refresh token is not available')
                window.location.href = '/login/'
            }
            return Promise.reject(error)
        }
    })

export default axiosInstance