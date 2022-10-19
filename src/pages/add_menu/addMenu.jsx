import addMenuCSS from './addMenu.module.scss'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axiosInstance'
import { AuthContext } from '../../App'

const AddMenu = (props) => {
    const { APIData, setAPIData } = useContext(AuthContext)
    const navigate = useNavigate()
    const initialMenuForm = Object.freeze({
        name: '',
        price: '',
        topping_1: '',
        topping_2: '',
        topping_3: '',
        size: '',
        items_in_stock: '',
        our_rating: '',
    })
    const [menuForm, setMenuForm] = useState(initialMenuForm)
    const [postImage, setPostImage] = useState(null)
    const handleChange = (e) => {
        if (e.target.name === 'picture') {
            setPostImage({
                image: e.target.files[0]
            })
        }else{
            setMenuForm((prevMenuForm) => {
                return {
                    ...prevMenuForm,
                    [e.target.name]: e.target.value.trim()
                }
            })
        }
    }
    const handleMenuAdding = (e) => {
        e.preventDefault()
        const postData = new FormData()

        if (postImage) {
            postData.append('picture', postImage.image, postImage.image.name)
        } if (menuForm.topping_1) {
            postData.append('topping_1', menuForm.topping_1)
        } if (menuForm.topping_2) {
            postData.append('topping_2', menuForm.topping_2)
        } if (menuForm.topping_3) {
            postData.append('topping_3', menuForm.topping_3)
        } if (menuForm.size) {
            postData.append('size', menuForm.size)
        } if (menuForm.items_in_stock) {
            postData.append('items_in_stock', menuForm.items_in_stock)
        } if (menuForm.our_rating) {
            postData.append('our_rating', menuForm.our_rating)
        }
        postData.append('name', menuForm.name)
        postData.append('price', menuForm.price)

        axiosInstance
            .post('', postData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(
                (res) => {
                    axiosInstance.get('')
                        .then(resp => {
                            setAPIData((prevAPIData) => ({ ...prevAPIData, menu: resp.data }))
                            navigate('/React-Order-Pizza/')
                        }
                        )
                }
            )
    }

    return (
        <div className="container mt-4">
            <form>
                <div className='display-4 mb-4'>Add Menu Item</div>
                <div className="w-100 mb-3 d-flex flex-column">
                    <div className='mb-2'>
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" name="name" onChange={handleChange} className="form-control" id="name" />
                        <label htmlFor="price" className="form-label" >Price</label>
                        <input type="text" className="form-control" id="price" name="price" onChange={handleChange} />
                        <label htmlFor="our_rating" className="form-label" >Our Rating</label>
                        <input type="text" className="form-control" id="our_rating" name="our_rating" onChange={handleChange} />
                        <small id="our_rating" className="form-text text-muted">Rating of the Pizza 0~5, decimals are allowed.</small>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="topping_1" className="form-label" >First Topping</label>
                        <input type="number" className="form-control" id="topping_1" name="topping_1" onChange={handleChange} />
                        <small id="topping_1" className="form-text text-muted">(1,'Pepperoni'),(2,'Mushroom'),(3,'Extra cheese'),(4,'Sausage'),(5,'Onion'),(6,'Black olives'),(7,'Green pepper'),(8,'Fresh garlic'),(9,'Tomato'),(10,'Fresh basil')</small>
                    </div>
                    <div>
                        <label htmlFor="topping_2" className="form-label" >Second Topping</label>
                        <input type="number" className="form-control" id="topping_2" name="topping_2" onChange={handleChange} />
                        <small id="topping_2" className="form-text text-muted">(1,'Pepperoni'),(2,'Mushroom'),(3,'Extra cheese'),(4,'Sausage'),(5,'Onion'),(6,'Black olives'),(7,'Green pepper'),(8,'Fresh garlic'),(9,'Tomato'),(10,'Fresh basil')</small>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="topping_3" className="form-label" >Third Topping</label>
                        <input type="number" className="form-control" id="topping_3" name="topping_3" onChange={handleChange} />
                        <small id="topping_3" className="form-text text-muted">(1,'Pepperoni'),(2,'Mushroom'),(3,'Extra cheese'),(4,'Sausage'),(5,'Onion'),(6,'Black olives'),(7,'Green pepper'),(8,'Fresh garlic'),(9,'Tomato'),(10,'Fresh basil')</small>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="size" className="form-label" >Size</label>
                        <input type="number" className="form-control" id="size" name="size" onChange={handleChange} />
                        <small id="size" className="form-text text-muted">(1,'Small'),(2,'Medium'),(3,'Large')</small>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="items_in_stock" className="form-label" >Number of Items in Stock</label>
                        <input type="items_in_stock" className="form-control" id="items_in_stock" name="items_in_stock" onChange={handleChange} />
                        <label htmlFor="picture" className="form-label" >Picture</label>
                        <input type="file" accept="image/jpeg,image/png,image/gif" className="form-control" id="picture" name="picture" onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleMenuAdding}>Add Item</button>
                </div>
            </form>
        </div>
    )
}

export default AddMenu