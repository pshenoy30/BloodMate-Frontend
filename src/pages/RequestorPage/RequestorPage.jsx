import SearchBar from "../../components/SearchBar/SearchBar";
import Header from '../../components/Header/Header';
import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];

export default function RequestorPage() {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries
      });
    
      if(loadError) return "Error loading maps";
      if(!isLoaded) return "Loading maps";
    
        return (
            <section>
                <Header />
                <SearchBar type="Requestor" />  
            </section>
        )
}
