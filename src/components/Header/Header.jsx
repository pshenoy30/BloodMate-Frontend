import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom"
import "./Header.scss"

function Header() {
  return (
    <section>
        <div className="logo">
            <img className="logo__image" src={logo} alt="logo" />
        </div>
    </section>
  )
}

export default Header;