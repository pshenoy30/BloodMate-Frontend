import SearchBar from "../../components/SearchBar/SearchBar";
import getSiteLocations from "../../utils/getSiteInfo";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./DonorPageByCity.scss"

export default function DonorPageByCity() {
    const [donationSite, setDonationSite] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [flip, setFlip] = useState(false)
    const { city } = useParams();

  useEffect(() => {
    async function getSiteData(city) {
      try {
        setDonationSite(await getSiteLocations(city));
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data", error);
        setError(true);
      }
    }

    getSiteData(city);
  }, [city]);

  if (isLoading) {
    return <p>Loading site data...</p>;
  }

  if (error) {
    return <p>Something went wrong. Please try refreshing the page.</p>;
  }
  
  if(!isLoading){
    console.log(donationSite)
        return (
            <section>
                <SearchBar />
                <div className="cards">
                {{donationSite} && donationSite.map((site) => (
                    <article className={`site-card ${flip? "flip": ""}`}>
                        <article className="site-card__inner">
                            <article className="site-card__front" onClick={()=>setFlip(!flip)}>
                                <h3 className="site-card__front__title">{site.city}</h3>
                                <h3>{site.fullAddress}</h3>  
                            </article>
                            <article className="site-card__back" onClick={()=>setFlip(!flip)}>
                                <article className="site-card__container">
                                    {site.blood==="no"?null:<><h3>Blood</h3><hr /></>}
                                    {site.plasma==="no"?null:<><h3>Plasma</h3><hr /></>}
                                    {site.platelet==="no"?null:<><h3>Platelet</h3><hr /></>}
                                    <h3>Hours</h3>
                                    <h3>Monday</h3>
                                    {site.monStart==="Closed"?<h3>{site.monStart}</h3>:<h3>{site.monStart}-{site.monEnd}</h3>}
                                    <hr />
                                    <h3>Tuesday</h3>
                                    {site.tueStart==="Closed"?<h3>{site.tueStart}</h3>:<h3>{site.tueStart}-{site.tueEnd}</h3>}
                                    <hr />
                                    <h3>Wednesday</h3>
                                    {site.wedStart==="Closed"?<h3>{site.wedStart}</h3>:<h3>{site.wedStart}-{site.wedEnd}</h3>}
                                    <hr />
                                    <h3>Thursday</h3>
                                    {site.thurStart==="Closed"?<h3>{site.thurStart}</h3>:<h3>{site.thurStart}-{site.thurEnd}</h3>}
                                    <hr />
                                    <h3>Friday</h3>
                                    {site.friStart==="Closed"?<h3>{site.friStart}</h3>:<h3>{site.friStart}-{site.friEnd}</h3>}
                                    <hr />
                                    <h3>Saturday</h3>
                                    {site.satStart==="Closed"?<h3>{site.satStart}</h3>:<h3>{site.satStart}-{site.satEnd}</h3>}
                                    <hr />
                                    <h3>Sunday</h3>
                                    {site.sunStart==="Closed"?<h3>{site.sunStart}</h3>:<h3>{site.sunStart}-{site.sunEnd}</h3>}
                                    <hr />                                   
                                </article>
                            </article>    
                        </article> 
                    </article>           
                ))}
                </div>  
            </section>
        )
    }
}
