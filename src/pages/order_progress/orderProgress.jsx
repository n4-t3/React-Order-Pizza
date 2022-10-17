import orderProgressCSS from './orderProgress.module.scss'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../App'

const OrderProgress = (props) => {

    let ctx = useContext(AuthContext)
    const menu = ctx["menu"]
    const SIDES_CHOICES = ['French Fry', 'Coke', 'Sprite']
    const DELIVERY_CHOICES = ['Preparing', 'In Route', 'Delivered']

    return (
        <div className='container'>
            <div className='display-4 mb-4'>Progress</div>
            {ctx["orders"] &&
                ctx["orders"].map((option) => {
                    return(
                    <div key={option.id} className='container mb-4'>
                        <div className="card  w-100">
                            <div className="card-body">
                                <div className="mb-2">
                            {menu[option["item"]-1]["name"]&&
                            <p>Item: {menu[option["item"]-1]["name"]}</p>}
                                </div>
                                <p>Contains: {option["extras"].map(
                                    extra=>{
                                        return(<small key={extra}>{SIDES_CHOICES[extra-1]}</small>)
                                    }
                                )}</p>
                                <div className="mb-2">

                                </div>
                                <div className="progress">
                                    <div className={`progress-bar w-${[50,75,100][parseInt(option["delivery_status"]-1)]}`} role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">{DELIVERY_CHOICES[option["delivery_status"]-1]}</div>
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