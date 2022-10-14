import cartCSS from './cart.module.scss'
import { ReactComponent as IconMenu } from './icon/trashIcon.svg'
const Cart = (props) => {
    return (
        <div className='container'>
            <div className='display-4 mb-4 mt-4'>Cart</div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Item</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Price</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th className="align-middle" scope="row">Cheese Pizza</th>
                        <td className="align-middle">1</td>
                        <td className="align-middle">10</td>
                        <td className="align-middle"><IconMenu className={cartCSS.red} width="1rem" /></td>
                    </tr>
                    <tr>
                        <th className="align-middle" scope="row">Peperoni Pizza</th>
                        <td className="align-middle">2</td>
                        <td className="align-middle">15</td>
                        <td className="align-middle"><IconMenu className={cartCSS.red} width="1rem" /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Cart