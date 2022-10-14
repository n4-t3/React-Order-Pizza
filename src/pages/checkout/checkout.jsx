import checkOut from './checkout.module.scss'

const CheckOut = (props) => {
    return (
        <div className="container mt-4">
            <form>
                <div className='display-4 mb-4'>Checkout</div>
                <div className="mb-3">
                    <label for="inputAddress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="inputAddress" />
                    <small id="addressHelp" class="form-text text-muted">City / Sub-city</small>
                </div>
                <div className="mb-3">
                    <label for="inputAddress2" className="form-label">Specific Address</label>
                    <input type="text" className="form-control" id="inputAddress2" />
                    <small id="addressHelp2" class="form-text text-muted">Area / Building / Building Number</small>
                </div>
                <div className="mb-3">
                    <label for="inputZip" className="form-label">Zip</label>
                    <input type="text" className="form-control" id="inputZip" />
                </div>
                <hr />
                <div className="mb-3">
                    <label for="inputCard" className="form-label">Credit card number</label>
                    <input type="tel" className="form-control" id="inputCard" inputmode="numeric" pattern="[0-9\s]{13,19}" autocomplete="cc-number" maxlength="19" placeholder="xxxx xxxx xxxx xxxx" />
                </div>
                <div className="mb-3 d-flex flex-row w-100">
                    <div className="me-4 w-50">
                        <label for="inputExpiration" className="form-label">Expiration</label>
                        <input type="password" className="form-control" id="inputExpiration" placeholder="MM/YY" />
                    </div>
                    <div className="w-50">
                        <label for="inputCVV" className="form-label">CVV</label>
                        <input type="password" className="form-control" id="inputCVV" placeholder="XXX"/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Checkout</button>
            </form>
        </div>
    )
}
export default CheckOut