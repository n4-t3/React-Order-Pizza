import orderProgressCSS from './orderProgress.module.scss'

const OrderProgress = (props) => {
    return (
        <div className='container'>
            <div className='display-4 mb-4'>Progress</div>
            <div className="card  w-100">
                <div className="card-body">
                    <div className="mb-2">
                        Cheese Pizza
                    </div>
                    <div className="progress">
                        <div className="progress-bar w-75 " role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">In route</div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default OrderProgress