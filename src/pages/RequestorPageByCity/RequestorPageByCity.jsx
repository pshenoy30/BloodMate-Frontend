import SearchBar from "../../components/SearchBar/SearchBar";
import getDonorInfo from "../../utils/getDonorInfo";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./RequestorPageByCity.scss"
import Header from '../../components/Header/Header';
import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];

export default function DonorPageByCity() {

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries
  });

    const [donors, setDonors] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [flip, setFlip] = useState(false)
    const { city } = useParams();

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
                                    <h3 className="requestor__site-card__container--space">{donor.email}</h3> 
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
                                <h3>Available</h3>  
                            </article>
                        </article> 
                    </article>    }
                </div>  
            </section>
          </> 
        )
}
