import cardCSS from './card.module.scss'

const Card = (props) => {
    return (
        <div className={`card m-3 ${cardCSS.card}`} style={{width: '18rem'}}>
            <img src="https://source.unsplash.com/MQUqbmszGGM" className="card-img-top" alt="pizza" />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Add to cart</a>
                    <a href="#" className="btn btn-secondary ms-2">Edit</a>
                </div>
        </div>
    )
}

export default Card