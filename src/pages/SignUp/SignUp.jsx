import "./SignUp.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header/Header"
function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [values, setValues] = useState({firstName:  "", 
                                        lastName: "", 
                                        email: "",
                                        password: "",
                                        userName: "", 
                                        gender: "", 
                                        lastDonated: "", 
                                        bloodType: "",
                                        availability: "",
                                        formSigned: "",
                                        city: "",
                                        birthDate: ""})
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        await axios.post("http://localhost:8080/user/register", {
        ...values,
      },{
        withCredentials:true
      });
      setSuccess(true);
      setError(null);
      navigate("/login");
    } catch (error) {
      setSuccess(false);
      setError(error.response.data);
    }
  };

  return (
    <main className="signup-page">
    <Header />
      <form className="signup" onSubmit={handleSubmit}>
        <h1 className="signup__title">Sign up</h1>
        <div className="field">
            <label htmlFor="first_name" className="field__label">First name</label>
            <input type="text" id="first_name" name="firstName" className="field__input" onChange={(event) => {
                setValues({...values, [event.target.name]: event.target.value})
            }} />
        </div>
        <div className="field">
            <label htmlFor="last_name" className="field__label">Last name</label>
            <input type="text" id="last_name" name="lastName" className="field__input" onChange={(event) => {
                 setValues({...values, [event.target.name]: event.target.value})
            }} />
        </div>
        <div className="field">
            <label htmlFor="birth_date" className="field__label">Birth Date</label>
            <input type="date" id="birth_date" name="birthDate" className="field__input" onChange={(event) => {
                 setValues({...values, [event.target.name]: event.target.value})
            }} />
        </div>
        <div className="field">
            <label htmlFor="gender" className="field__label">Gender</label>
            <input type="text" id="gender" name="gender" className="field__input" onChange={(event) => {
                 setValues({...values, [event.target.name]: event.target.value})
            }} />
        </div>
        <div className="field">
            <label htmlFor="blood_type" className="field__label">Blood Type</label>
            <input type="text" id="blood_type" name="bloodType" className="field__input" onChange={(event) => {
                 setValues({...values, [event.target.name]: event.target.value})
            }} />
        </div>
        <div className="field">
            <label htmlFor="city" className="field__label">City</label>
            <input type="text" id="city" name="city" className="field__input" onChange={(event) => {
                 setValues({...values, [event.target.name]: event.target.value})
            }} />
        </div>
        <div className="field">
            <label htmlFor="email" className="field__label">Email</label>
            <input type="email" id="email" name="email" className="field__input" onChange={(event) => {
                 setValues({...values, [event.target.name]: event.target.value})
            }} />
        </div>
        <div className="field">
            <label htmlFor="last_donated" className="field__label">When did you last donate blood</label>
            <input type="date" id="last_donated" name="lastDonated" className="field__input" onChange={(event) => {
                 setValues({...values, [event.target.name]: event.target.value})
            }} />
        </div>
        <div className="field field--flex">
            <label htmlFor="availability" className="field__label">Availability</label>
            <input type="checkbox" id="availability" name="availability" className="field__input" onChange={(event) => {
                 setValues({...values, [event.target.name]: event.target.value==="on"?true:false})
            }} />
        </div>
        <div className="field">
            <label htmlFor="user_name" className="field__label">Username</label>
            <input type="text" id="user_name" name="userName" className="field__input" onChange={(event) => {
                 setValues({...values, [event.target.name]: event.target.value})
            }} />
        </div>
        <div className="field">
            <label htmlFor="password"  className="field__label">Password</label>
            <input type="password" id="password"  name="password"  className="field__input" onChange={(event) => {
                 setValues({...values, [event.target.name]: event.target.value})
            }} />
        </div>
        <div className="field field--flex">
            <label htmlFor="formSigned"  className="field__label">Do you fullfil all the criteria for blood donation</label>
            <input type="checkbox" id="formSigned"  name="formSigned"  className="field__input field__input" onChange={(event) => {
                 setValues({...values, [event.target.name]: new Date().toJSON().slice(0, 10)})
            }} />
        </div>
        <button className="signup__button">Sign up</button>

        {success && <div className="signup__message">Signed up!</div>}
        {error && <div className="signup__message">{error}</div>}
      </form>


      <p className="signup__text">
        Have an account? <Link to="/login" className="signup__text">Log in</Link>
      </p>
    </main>
  );
}

export default Signup;
