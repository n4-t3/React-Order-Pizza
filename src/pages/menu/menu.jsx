import menuCSS from './menu.module.scss'
import Card from '../../components/card/card.component'
import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

const Menu = (props) => {
    const { APIData } = useContext(AuthContext)
    const [is_superuser, setIsSuperuser] = useState(false)
    const navigate = useNavigate()

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

    const handleAddingMenu = () => {
        navigate('addMenu/')
    }
    return (
        <React.Fragment>
            {APIData.isAuthenticated && is_superuser && APIData.user.staff && <div className='d-flex flex-row-reverse'>
                <input type="button" onClick={handleAddingMenu} className='btn btn-primary m-2' value="Add Menu" />
            </div>}
            {APIData["menu"] && <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 750: 2, 1000: 3}}
            ><Masonry>
                    {
                        APIData["menu"].map((data) => <Card key={data.id} data={data} />
                        )
                    }
                </Masonry>
            </ResponsiveMasonry>
            }
        </React.Fragment>
    )
}
export default Menu