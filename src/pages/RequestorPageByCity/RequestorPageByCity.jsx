import SearchBar from "../../components/SearchBar/SearchBar";
import getRequestorInfo from "../../utils/getRequestorInfo";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./RequestorPageByCity.scss"
import Header from '../../components/Header/Header';

export default function DonorPageByCity() {
    const [donors, setDonors] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [flip, setFlip] = useState(false)
    const { city } = useParams();

  useEffect(() => {
    async function getDonorData(city) {
      try {
        setDonors(await getRequestorInfo(city));
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data", error);
        setError(true);
      }
    }

    getDonorData(city);
  }, [city]);

  if (isLoading) {
    return <p>Loading site data...</p>;
  }

  if (error) {
    return <p>Something went wrong. Please try refreshing the page.</p>;
  }
  
  if(!isLoading){
    console.log(donors);
        return (
          <>
            <Header />
            <section>
                <SearchBar />
                <div className="requestor__cards">
                {{donors} && donors.map((donor) => (
                    <article className={`requestor__site-card ${flip? "flip": ""}`}>
                        <article className="requestor__site-card__inner">
                            <article className="requestor__site-card__front" onClick={()=>setFlip(!flip)}>
                                <h3 className="requestor__site-card__front__title">{donor.firstName} {donor.firstName}</h3>
                                <h3>Available</h3>  
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
                ))}
                </div>  
            </section>
          </> 
        )
    }
}
