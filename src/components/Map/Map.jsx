import { GoogleMap,useLoadScript,Marker,InfoWindow } from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import MapStyles from "./MapStyles";
import { useCallback, useRef, useState,useEffect } from "react";
import icon from "../../assets/blood-bank.svg";
import getSiteLocations from "../../utils/getsiteLocations";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "50vh"
}

const center = {
  lat: 43.653225,
  lng: -79.383186
}

const options = {
  styles: MapStyles,
  disableDefaultUI: true,
  zoomControl: true
}

function Map() {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries
  });
  const [markers, setMarkers] = useState([]);
  const [siteData, setSiteData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState(null);
  useEffect(() => {

    async function getSiteData(city) {
      try {
        setSiteData(await getSiteLocations(city));
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching data", error)
      }
    }
  
    getSiteData("Toronto");
  },[]);
  
  if (isLoading) {
    return <p> Loading inventory data... </p>;
  }
  
  if (error) {
    return <p> Something went wrong. Please try refreshing the page</p>;
  }

  
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, [])

  if(loadError) return "Error loading maps";
  if(!isLoaded) return "Loading maps";

  const customIcon = {
    url: icon,
    scaledSize: new window.google.maps.Size(32, 32),
  };

  return (
    <section>
        <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        zoom={13} 
        center={center} 
        options={options} 
        onLoad={onMapLoad}>
          {
            //to tell the browser to ignore if it is null and within the milisecond it will receive the data
            siteData?.map((site) => (
                <Marker 
                key={site.id}
                position={{lat: site.latitude, lng: site.longitude}}
                icon = {customIcon}
                />
            ))
          }
        </GoogleMap>
    </section>
  )
}

export default Map;
