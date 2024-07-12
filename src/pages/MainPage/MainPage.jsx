import "./MainPage.scss"
import { Link } from "react-router-dom";

function MainPage() {
  

  return (
    <main>
        <h1 className="main__title">Are you a ?</h1>
        <section className="main__button-container">
        <Link to="/Donor">
            <button type="submit" className="main__button main__button--donor"> Donor </button>
        </Link>
            <button type="submit" className="main__button main__button--requestor"> Requestor </button>
        </section>
    </main>
    )
}

export default MainPage;