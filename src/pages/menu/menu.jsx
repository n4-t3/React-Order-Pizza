import menuCSS from './menu.module.scss'
import Card from '../../components/card/card.component'
import { useContext } from 'react'
import { AuthContext } from '../../App'

const Menu = (props) =>{

    const ctx = useContext(AuthContext)
        return (
            <div>
            {ctx["menu"] &&
            <div className={menuCSS.wrapper}>
                {
                    ctx["menu"].map((data)=> <Card key={data.id} data ={data} />
                    )
                }
            </div>
            }
            </div>
        )
}
export default Menu