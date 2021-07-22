import { NavLink } from "react-router-dom"


export const Footer = () => {
    return (
        <footer className="page-footer white lighten-1">
          <div className="p10">
            <div className="row">
              <div className="center text-12">
                    <NavLink className="main-color text-lighten-1 p10" to='/privacy'> Privacy Policy </NavLink>
                    <NavLink className="main-color text-lighten-1 p10" to='/terms'> Terms and Conditions </NavLink>
                    <NavLink className="main-color text-lighten-1 p10" to='/contact'> Contact Us </NavLink>
              </div>
            </div>
            <div className="row center">
                <span className="main-color text-lighten-2 text-10">© 2021 SonicJuice</span>
            </div>
          </div>
        </footer>
    )
}