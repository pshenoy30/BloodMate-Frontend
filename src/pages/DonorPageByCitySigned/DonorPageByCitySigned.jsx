import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import Map from "../../components/Map/Map";
import "./DonorPageByCitySigned.scss";
import { useLoadScript } from "@react-google-maps/api";
import MapIcon from "../../assets/map.svg";
import BloodBagIcon from "../../assets/blood-bag.png";
import LogOutIcon from "../../assets/log-out.png";
import { Link, useNavigate} from "react-router-dom";
import { useState } from "react";

const libraries = ["places"];

export default function DonorPageByCitySigned() {
  const [failedAuth, setFailedAuth] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

      const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries
      });
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

        return (
            <>
                <Header />
                <SearchBar type="Map" />
                <Map />
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
