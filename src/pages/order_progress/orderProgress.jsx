import orderProgressCSS from './orderProgress.module.scss'
import { useContext } from 'react'
import { AuthContext } from '../../App'
import axiosInstance from '../../api/axiosInstance'

const OrderProgress = (props) => {

    const { APIData, setAPIData } = useContext(AuthContext)
    const menu = APIData["menu"]
    const DELIVERY_CHOICES = ['Preparing', 'In Route', 'Delivered']
    const handleChange = (e, id) => {
        const previousData = APIData.orders.filter(element => element.id === id)[0]
        axiosInstance
            .put(`api/order/${id}/`, {
                ...previousData, delivery_status: [e.target.value]
            })
            .then(
                (res) => {
                    axiosInstance.get('api/order/')
                        .then(resp => {
                            setAPIData((prevAPIData) => ({ ...prevAPIData, orders: resp.data }))
                            return resp
                        })
                }
            )
    }
    return (
        <div className='container'>
            <div className='display-4 mb-4'>Progress</div>
            {APIData["orders"] &&
                APIData["orders"].map((choice) => {
                    const item = menu.filter(item => item.id === choice.item)[0]
                    return (
                        <div key={choice.id} className='container mb-2'>
                            <div className="card  w-100">
                                {APIData.user && APIData.user.staff && <div className="card-body">
                                    <div>
                                        <select className="form-select" aria-label="Default select example" onChange={(e, id) => handleChange(e, choice.id)} defaultValue={choice.delivery_status[0]}>
                                            <option value="1" >Preparing</option>
                                            <option value="2" >In Route</option>
                                            <option value="3" >Delivered</option>
                                        </select>
                                    </div>
                                    <div className='mt-2 ms-2'>
                                        <p className='blockquote'>Email: {choice.user_email}</p>
                                        <p className='blockquote'>Name: {choice.name}</p>
                                        <p className='lead'>location: {choice.general_address} / {choice.specific_address} / {choice.zip_code}</p>
                                    </div>
                                </div>}
                                <div className="card-body">
                                    <div className="mb-2">
                                        {item &&
                                            <p className='blockquote'>Item: {item.name}</p>}
                                        <p className='lead'>location: {choice.general_address} / {choice.specific_address} / {choice.zip_code}</p>
                                    </div>
                                    <div className="mb-2">

                                    </div>
                                    <div className="progress">
                                        <div className={`progress-bar w-${[50, 75, 100][parseInt(choice["delivery_status"] - 1)]}`} role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">{DELIVERY_CHOICES[choice["delivery_status"] - 1]}</div>
                                    </div>
                                </div>
                            </div>
                        </div>)
                })
            }
        </div>

    )
}


export default OrderProgress