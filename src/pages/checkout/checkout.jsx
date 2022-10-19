import checkOut from './checkout.module.scss'
import { useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'
import axiosInstance from '../../api/axiosInstance'
const CheckOut = (props) => {
    const { APIData, setAPIData } = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    const initialCheckout = Object.freeze({
        item: location.state.item,
        general_address: '',
        specific_address: '',
        zip_code: ''
    })
    const initialMenu = APIData.menu.filter(item => item.id === location.state.item)[0]
    const [checkoutForm, setCheckoutForm] = useState(initialCheckout)
    const handleChange = (e) => {
        setCheckoutForm((prevCheckoutForm) => {
            return {
                ...prevCheckoutForm,
                [e.target.name]: e.target.value.trim()
            }
        })
    }
    const handleCheckout = (e) => {
        e.preventDefault()
        axiosInstance
            .post(`api/order/`, {
                item: checkoutForm.item,
                general_address: checkoutForm.general_address,
                specific_address: checkoutForm.specific_address,
                zip_code: checkoutForm.zip_code
            })
            .then(
                (res) => {
                    const itemsInStock = parseInt(initialMenu.items_in_stock) - 1
                    delete initialMenu.picture
                    axiosInstance
                        .put(`${location.state.item}/`, {
                            ...initialMenu, items_in_stock: itemsInStock
                        }).then(resp => {
                            axiosInstance
                                .delete(`api/cart/${location.state.id}/`)
                                .then(resp => {
                                    axiosInstance.get('api/order/')
                                        .then(resp => {
                                            setAPIData((prevAPIData) => ({ ...prevAPIData, orders: resp.data }))
                                            axiosInstance.get('')
                                                .then(resp => {
                                                    setAPIData((prevAPIData) => ({ ...prevAPIData, menu: resp.data }))
                                                    axiosInstance.get('api/cart/')
                                                        .then(resp => {
                                                            setAPIData((prevAPIData) => ({ ...prevAPIData, cart: resp.data }))
                                                            return resp
                                                        })
                                                    return resp
                                                })
                                            return resp
                                        })
                                    return resp
                                })
                            navigate("/React-Order-Pizza/progress")
                            return resp
                        })

                }
            )
    }

    return (
        <div className="container mt-4">
            <form>
                <div className='display-4 mb-4'>Checkout</div>
                <div className="mb-3">
                    <label htmlFor="inputAddress" className="form-label">Address</label>
                    <input minLength="6" maxLength="100" type="text" className="form-control" id="inputAddress" onChange={handleChange} name="general_address" />
                    <small id="addressHelp" className="form-text text-muted">City / Sub-city</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputAddress2" className="form-label">Specific Address</label>
                    <input minLength="6" maxLength="100" type="text" className="form-control" id="inputAddress2" onChange={handleChange} name="specific_address" />
                    <small id="addressHelp2" className="form-text text-muted">Area / Building / Building Number</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputZip" className="form-label">Zip</label>
                    <input minLength="2" maxLength="100" type="text" className="form-control" id="inputZip" onChange={handleChange} name="zip_code" />
                </div>
                <hr />
                <div className="mb-3">
                    <label htmlFor="inputCard" className="form-label">Credit card number</label>
                    <input minLength="19" maxLength="19" type="tel" className="form-control" id="inputCard" inputMode="numeric" pattern="[0-9\s]{13,19}" autoComplete="cc-number" placeholder="xxxx xxxx xxxx xxxx" />
                </div>
                <div className="mb-3 d-flex flex-row w-100">
                    <div className="me-4 w-50">
                        <label htmlFor="inputExpiration" className="form-label">Expiration</label>
                        <input minLength="5" maxLength="5" type="password" className="form-control" id="inputExpiration" placeholder="MM/YY" />
                    </div>
                    <div className="w-50">
                        <label htmlFor="inputCVV" className="form-label">CVV</label>
                        <input minLength="3" maxLength="3" type="password" className="form-control" id="inputCVV" placeholder="XXX" />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleCheckout}>Checkout</button>
            </form>
        </div>
    )
}
export default CheckOut