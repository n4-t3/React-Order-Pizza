import cardCSS from './card.module.scss'
import axiosInstance, { baseURL } from '../../api/axiosInstance'
import { Rating } from 'react-simple-star-rating'
import { AuthContext } from '../../App'
import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const toppingOptions = ['Pepperoni', 'Mushroom', 'Extra cheese', 'Sausage', 'Onion', 'Black olives', 'Green pepper', 'Fresh garlic', 'Tomato', 'Fresh basil']

const Card = (props) => {
    const navigate = useNavigate()
    const [is_superuser, setIsSuperuser] = useState(false)
    const { APIData, setAPIData } = useContext(AuthContext)
    useEffect(() => {
        if (APIData.user && APIData.isAuthenticated) {
            if (APIData.user.staff) {
                setIsSuperuser(true)
            } else {
                setIsSuperuser(false)
            }
        } else {
            setIsSuperuser(false)
        }
    }, [APIData])
    const handleRemove = (e, id) => {
        e.preventDefault()
        axiosInstance.delete(`${id}/`)
            .then(resp => {
                axiosInstance.get(``).then(resp => {
                    setAPIData((prevAPIData) => ({ ...prevAPIData, menu: resp.data }))
                })
                return resp
            })
            .catch(error => error)
    }

    const handleEdit = (e, id) => {
        e.preventDefault()
        navigate('editMenu/', { state: { id: id } })
    }

    const handleAddToCart = (e, id) => {
        if (APIData.isAuthenticated) {
            axiosInstance.post(`api/cart/`, {
                user_id: APIData.user.user_id,
                item: id
            })
                .then(resp => {
                    axiosInstance.get('api/cart/')
                        .then(resp => {
                            setAPIData((prevAPIData) => ({ ...prevAPIData, cart: resp.data }))
                            return resp
                        })
                    return resp
                })
                .catch(error => error)
        } else {
            navigate('login/')
        }

    }
    return (

        <div className={`card m-3 ${cardCSS.card}`}>
            <img src={`${baseURL.slice(0, -1)}${props.data.picture}`} className="card-img-top" alt="pizza" />
            <div className="card-body">
                <div className="d-flex flex-row justify-content-between">
                    <h5 className="card-title">{props.data.name}</h5>
                    <p className="card-title">${props.data.price}</p>
                </div>
                <p className="card-text"><b>Contains:</b> {toppingOptions[props.data.topping_1 - 1]}, {toppingOptions[props.data.topping_2 - 1]}, {toppingOptions[props.data.topping_3 - 1]}</p>
                <p className="card-text">
                    <b>Items in stock:</b> {props.data.items_in_stock}
                </p>
                <p className="card-text">
                    Our rating: <Rating readonly={true} initialValue={props.data.our_rating} allowFraction={true} size={25} />
                </p>
                <div className="d-flex flex-row justify-content-center">
                    <input type="button" value="Add" onClick={(e) => handleAddToCart(e, props.data.id)} className={`btn btn-primary ${props.data.items_in_stock === 0 ? 'disabled' : null}`}/>
                    {is_superuser && <input type="button" value="Edit" onClick={(e) => handleEdit(e, props.data.id)} className="btn btn-secondary ms-2"/>}
                    {is_superuser && <input type="button" value="Remove" onClick={(e) => handleRemove(e, props.data.id)} className="btn btn-danger ms-2"/>}
                </div>
            </div>
        </div>
    )
}

export default Card