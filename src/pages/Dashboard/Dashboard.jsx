import "./Dashboard.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import MapIcon from "../../assets/map.svg";
import BloodBagIcon from "../../assets/blood-bag.png";
import LogOutIcon from "../../assets/log-out.png";
import { useLoadScript } from "@react-google-maps/api";
import getNextDonationDate from "../../utils/getNextDonationDate";

const libraries = ["places"];

function Dashboard() {
  const [failedAuth, setFailedAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [nextDonation, setNextDonation] = useState("");
  const navigate = useNavigate();
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries
  });

  const login = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      return setFailedAuth(true);
    }

    // Get the data from the API
    try {
      const response = await axios.get("http://localhost:8080/user/profile", {
        headers: {
          Authorization: "Bearer " + token,
        },
     });
      setNextDonation(getNextDonationDate(response.data.lastDonated.split("T")));
      setUser(response.data);
    } catch (error) {
      console.error(error);
      setFailedAuth(true);
    }

    setIsLoading(false);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    setFailedAuth(true);
  };

  useEffect(() => {
    login();
  }, []);

  if (failedAuth) {
    navigate("/login")
  }

  if (isLoading) {
    return (
      <main className="dashboard">
        <p>Loading...</p>
      </main>
    );
  }

  if(loadError) return "Error loading maps";
  if(!isLoaded) return "Loading maps";

  return (
    <main>
    <Header />
    <section className="dashboard">
      <h1 className="dashboard__title"> Welcome Back, {user.firstName} {user.lastName} </h1>
      <article className="dashboard__subtitles"> 
        <h3 className="dashboard__subtitle"> You have saved 12 lives in the past year</h3>
        <h3 className="dashboard__subtitle"> Thank you for being a regular donor 🫶🏻</h3>
        <h3 className="dashboard__subtitle"> Your next donation date is {nextDonation}</h3>
      </article>
    </section>
    <footer className="dashboard__footer">
    <Link to={`/donor/${user.city}/ç/-79.3831843/Toronto,%20ON,%20Canada/signed`}>
      <div className="dashboard__footer__div">
        <img  className="dashboard__icons" src={MapIcon} alt="Shows the nearest donation sites" />
      </div>
    </Link>
    <Link to={`/requestor/${user.city}/signed`}>
      <div className="dashboard__footer__div">
        <img  className="dashboard__icons" src={BloodBagIcon} alt="Request for Blood" />
      </div>
    </Link>
    <div onClick={logout}>
      <img  className="dashboard__icons" src={LogOutIcon} alt="Log out the user" />
    </div>


    </footer>  
    </main>
  );
}

export default Dashboard;
