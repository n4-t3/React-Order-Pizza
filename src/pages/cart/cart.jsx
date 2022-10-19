import cartCSS from './cart.module.scss'
import { ReactComponent as TrashIcon } from './icon/trashIcon.svg'
import { ReactComponent as CheckoutIcon } from './icon/checkoutIcon.svg'
import { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../App'
import axiosInstance from '../../api/axiosInstance';
const Cart = (props) => {
    const { APIData, setAPIData } = useContext(AuthContext)
    const navigate = useNavigate();
    const handleCheckout = (e, id, item) => {
        navigate("/React-Order-Pizza/checkout", { state: { id: id, item: item } });
    }
    const handleDelete = (e, id) => {
        e.preventDefault()
        axiosInstance.delete(`api/cart/${id}/`)
            .then(resp => {
                axiosInstance.get('api/cart/')
                    .then(resp => {
                        setAPIData((prevAPIData) => ({ ...prevAPIData, cart: resp.data }))
                        return resp
                    }
                    )
                return resp
            })
            .catch(error => error)
    }

    return (
        <div className='container'>
            <div className='display-4 mb-4 mt-4'>Cart</div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Item</th>
                        <th scope="col">Price</th>
                        <th scope="col">Remove</th>
                        <th scope="col">Checkout</th>
                    </tr>
                </thead>
                <tbody>
                    {APIData.isAuthenticated && APIData.cart && APIData.cart.map(order => {
                        const menu = APIData.menu.filter((item) => item.id === order.item)[0]
                        return (
                            <tr key={order.id}>
                                <th className="align-middle" scope="row">{menu.name}</th>
                                <td className="align-middle">{menu.price}</td>
                                <td className="align-middle" ><TrashIcon onClick={(e) => (handleDelete(e, order.id))} className={cartCSS.red} width="1rem" /></td>
                                <td className="align-middle" ><CheckoutIcon onClick={(e) => (handleCheckout(e, order.id, order.item))}className={cartCSS.blue} width="1rem" /></td>
                            </tr>
                        )

                    })

                    }

                </tbody>
            </table>
        </div>
    )
}

export default Cart