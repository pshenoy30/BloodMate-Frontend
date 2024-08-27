import "./MainPage.scss"
import { Link } from "react-router-dom";
import Header from '../../components/Header/Header';

function MainPage() {
  

  return (
    <>
        <Header />
        <main className="">
            <h1 className="main__title">Do you want to</h1>
            <section>
            <article className="main__button-container">
                <Link to="/donor">
                    <button type="submit" className="main__button main__button--donor"> Donate Blood </button>
                </Link>
                <Link to="/requestor">
                    <button type="submit" className="main__button main__button--requestor"> Request Blood </button>
                </Link>
            </article>
            <article className="main__link-container">
                <p className="main__link">Want to be a donor? <Link to="/signup" className="main__link">
                    Signup
                </Link></p>
                <p className="main__link"> Have an account already? <Link to="/login" className="main__link"> Login </Link> </p>
                
            </article>
            
            </section>
        </main>
    </>
    )
}

export default MainPage;