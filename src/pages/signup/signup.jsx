import signUpCSS from './signup.module.scss'

const SignUp = (props) => {
    return (
        <div className="container mt-4">
            <form>
                <div className='display-4 mb-4'>Sign Up</div>
                <div className="w-100 mb-3 d-flex flex-row">
                    <div className="me-4 w-50">
                        <label htmlFor="inputFirstName" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="inputFirstName" />
                    </div>
                    <div className="w-50">
                        <label htmlFor="inputLastName" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="inputLastName" />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="inputEmail" />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword" />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )
}
export default SignUp