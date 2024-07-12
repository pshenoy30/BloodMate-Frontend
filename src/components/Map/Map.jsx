import { GoogleMap,useLoadScript,Marker,InfoWindow } from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import MapStyles from "./MapStyles";
import { useCallback, useRef, useState } from "react";
import markerIcon from "../../assets/blood-bank.svg"

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
  const onMapClick = useCallback((event) => {
    setMarkers((current) => [
      ...current, new google.maps.Marker({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        icon:{markerIcon},
        time: new Date()
      }),
    ]);
  }, [])
  
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, [])

  if(loadError) return "Error loading maps";
  if(!isLoaded) return "Loading maps";
    
  return (
    <section>
        <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        zoom={8} 
        center={center} 
        options={options} 
        onClick={onMapClick}
        onLoad={onMapLoad}>
          {
            markers.map((marker) => (
              <Marker 
              key={marker.time.toISOString()}
              position={{lat: marker.lat, lng: marker.lng}}
              icon={marker.icon}
               />
            ))
          }
        </GoogleMap>
    </section>
  )
}

export default Map;
