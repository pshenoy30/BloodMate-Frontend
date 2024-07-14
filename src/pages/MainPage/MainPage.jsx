import "./MainPage.scss"
import { Link } from "react-router-dom";
import Header from '../../components/Header/Header';

function MainPage() {
  

  return (
    <>
        <Header />
        <main>
            <h1 className="main__title">Are you a ?</h1>
            <section className="main__button-container">
            <Link to="/donor">
                <button type="submit" className="main__button main__button--donor"> Donor </button>
            </Link>
            <Link to="/requestor">
                <button type="submit" className="main__button main__button--requestor"> Requestor </button>
            </Link>
            </section>
        </main>
    </>
    )
}

export default MainPage;