import "./NotFoundPage.scss";
import {Link} from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="not-found">
      <article className="not-found__container">
        <h1 className="not-found__title">404</h1>
        <h3 className="not-found__sub-title">OH NO!!!! It seems like you are lost??</h3>
        <h3 className="not-found__sub-title">Click on the button below to go back to the home page</h3>
        <Link to="/">
          <button type="button" className="not-found__button">Home</button>
        </Link>
      </article>
    </section>
  )
}
