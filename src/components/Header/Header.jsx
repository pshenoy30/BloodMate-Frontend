import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom"
import "./Header.scss"

function Header() {
  return (
    <section>
    <Link to="/">
        <div className="logo">
          <img className="logo__image" src={logo} alt="logo" />
        </div>
    </Link>
    </section>
  )
}

export default Header;