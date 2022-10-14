import menuCSS from './menu.module.scss'
import Card from '../../components/card/card.component'
const Menu = (props) =>{
    return(
    <div className={menuCSS.wrapper}>
            <Card></Card>
            <Card></Card>
            <Card></Card>
    </div>
    )
}

export default Menu