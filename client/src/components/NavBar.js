import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

import '../styles/navbar.css'

export const NavBar = () => {

    const auth = useContext(AuthContext)

    return (
        <div className="navbar p10">
            <a href="/" className="centered-box">
                <img height='40' src={`${process.env.PUBLIC_URL}/images/sjlogo.png`} alt="no" />
            </a>
            <ul>
                <li>
                    <NavLink to={auth.isAuthenticated ? '/account' : '/auth'}>
                        <i className="material-icons white-text"> person </i>
                    </NavLink>
                </li>                
            </ul>
        </div>   
    )
}