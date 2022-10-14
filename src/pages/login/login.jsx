
const Login = (props) => {
    return (
        <div className="container mt-4">
            <form>
                <div className='display-4 mb-4'>Login</div>
                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="inputEmail" />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login