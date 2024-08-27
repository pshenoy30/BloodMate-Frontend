import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import Map from "../../components/Map/Map";
import "./DonorPageByCity.scss";
import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];

export default function DonorPageByCity() {

      const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries
      });
    
      if(loadError) return "Error loading maps";
      if(!isLoaded) return "Loading maps";

        return (
            <>
                <Header />
                <SearchBar type="Map" />
                <Map />
            </>
            
        )
}
