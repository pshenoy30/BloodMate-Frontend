import "./Login.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/Header/Header"

function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [values, setValues] = useState({ 
                                        email: "",
                                        password: "",
                                        })

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        ...values,
      },{
        withCredentials:true
      });
      console.log(response.data.accessToken);
      sessionStorage.setItem("token", response.data.accessToken);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <>
    <Header />
    <main className="login-page">
      <form className="login" onSubmit={handleSubmit}>
        <h1 className="login__title">Log in</h1>
        <div className="field">
            <label htmlFor="email" className="field__label">Email</label>
            <input type="text" id="email" name="email" className="field__input" onChange={(event) => {
                setValues({...values, [event.target.name]: event.target.value})
            }} />
        </div>
        <div className="field">
            <label htmlFor="password" className="field__label">Password</label>
            <input type="password" id="password" name="password" className="field__input" onChange={(event) => {
                setValues({...values, [event.target.name]: event.target.value})
            }} />
        </div>
        <button className="login__button">Log in</button>

        {error && <div className="login__message">{error}</div>}
      </form>

      <p className="link__text">
        Need an account? <Link to="/signup" className="link__text">Sign up</Link>
      </p>
    </main>
    </>
  );
}

export default Login;
