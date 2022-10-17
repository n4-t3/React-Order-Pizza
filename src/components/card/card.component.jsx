import cardCSS from './card.module.scss'
import { baseURL } from '../../api/axiosInstance'
import { Rating } from 'react-simple-star-rating'

const toppingOptions = ['Pepperoni', 'Mushroom', 'Extra cheese', 'Sausage', 'Onion', 'Black olives', , 'Green pepper', 'Fresh garlic', 'Tomato', 'Fresh basil']

const Card = (props) => {

    return (
        <div className={`card m-3 ${cardCSS.card}`} style={{ width: '18rem' }}>
            <img src={`${baseURL.slice(0, -1)}${props.data.picture}`} className="card-img-top" alt="pizza" />
            <div className="card-body">
                <div className="d-flex flex-row justify-content-around">
                    <h5 className="card-title">{props.data.name}</h5>
                    <p className="card-title">${props.data.price}</p>
                </div>
                <p className="card-text">Contains: {toppingOptions[props.data.topping_1-1]}, {toppingOptions[props.data.topping_2-1]}, {toppingOptions[props.data.topping_3-1]}</p>
                <p className="card-text">
                <Rating readonly={true} initialValue={props.data.average_rating}  allowFraction={true} size={25}/>
                </p>
                <a href="#" className="btn btn-primary">Add to cart</a>
                <a href="#" className="btn btn-secondary ms-2">Edit</a>
            </div>
        </div>
    )
}

export default Card