import "./MainPage.scss"

function MainPage() {
  return (
    <main>
        <h1 className="main__title">Are you a ?</h1>
        <section className="main__button-container">
            <button type="submit" className="main__button main__button--donor"> Donor </button>
            <button type="submit" className="main__button main__button--requestor"> Requestor </button>
        </section>
    </main>
    )
}

export default MainPage;