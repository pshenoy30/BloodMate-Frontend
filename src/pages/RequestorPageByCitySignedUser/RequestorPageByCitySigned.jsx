import SearchBar from "../../components/SearchBar/SearchBar";
import getDonorInfo from "../../utils/getDonorInfo";
import { useState, useEffect } from "react";
import { useParams, Link,useNavigate } from "react-router-dom";
import "./RequestorPageByCitySigned.scss"
import Header from '../../components/Header/Header';
import { useLoadScript } from "@react-google-maps/api";
import MapIcon from "../../assets/map.svg";
import BloodBagIcon from "../../assets/blood-bag.png";
import LogOutIcon from "../../assets/log-out.png";

const libraries = ["places"];

export default function RequestorPageByCitySigned() {

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries
  });

    const [donors, setDonors] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [flip, setFlip] = useState(false)
    const [failedAuth, setFailedAuth] = useState(false);
    const [user, setUser] = useState(null);
    const { city } = useParams();
    const navigate = useNavigate();

  useEffect(() => {
    async function getDonorData(city) {
      try {
        setDonors(await getDonorInfo(city));
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data", error);
        setError(true);
      }
    }

    getDonorData(city);
  }, [city]);

  const logout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    setFailedAuth(true);
  };
  if (failedAuth) {
    navigate("/login")
  }

  if(loadError) return "Error loading maps";
  if(!isLoaded) return "Loading maps";

  if (isLoading) {
    return <p>Loading donor data...</p>;
  }

  if (error) {
    return <p>Something went wrong. Please try refreshing the page.</p>;
  }
  
        return (
          <>
            <Header />
            <section>
                <SearchBar type="Requestor"/>
                <div className="requestor__cards">
                {donors?donors?.map((donor) => (
                    <article className={`requestor__site-card ${flip? "flip": ""}`}>
                        <article className="requestor__site-card__inner">
                            <article className="requestor__site-card__front" onClick={()=>setFlip(!flip)}>
                                <h3 className="requestor__site-card__front__title">{donor.firstName} {donor.lastName}</h3>
                                {donor.availability?<h3 className="requestor__site-card__front__title">Available</h3>:<h3 className="requestor__site-card__front__title">Not Available</h3>} 
                            </article>
                            <article className="requestor__site-card__back" onClick={()=>setFlip(!flip)}>
                                <article className="requestor__site-card__container">
                                    <a href={`mailto:${donor.email}`} className="requestor__site-card__container--space--link "><h3 className="requestor__site-card__container--space requestor__site-card__container--space--link">{donor.email}</h3></a> 
                                    <hr />
                                    <h3 className="requestor__site-card__container--space">{donor.gender}</h3> 
                                    <hr />
                                    <h3 className="requestor__site-card__container--space">{donor.bloodType}</h3> 

                                </article>
                            </article>    
                        </article> 
                    </article>           
                )):<article className={`requestor__site-card`}>
                        <article className="requestor__site-card__inner">
                            <article className="requestor__site-card__front">
                                <h3 className="requestor__site-card__front__title">No donors available</h3> 
                            </article>
                        </article> 
                    </article>    }
                </div>  
            </section>
            <footer className="dashboard__footer">
                <Link to={`/donor/Toronto/43.653226/-79.3831843/Toronto,%20ON,%20Canada/signed`}>
                  <div className="dashboard__footer__div">
                    <img  className="dashboard__icons" src={MapIcon} alt="Shows the nearest donation sites" />
                  </div>
                </Link>
                <Link to={`/requestor/Toronto/signed`}>
                  <div className="dashboard__footer__div">
                    <img  className="dashboard__icons" src={BloodBagIcon} alt="Request for Blood" />
                  </div>
                </Link>
                <div onClick={logout}>
                  <img  className="dashboard__icons" src={LogOutIcon} alt="Log out the user" />
                </div>
            </footer>  
          </> 
        )
}
