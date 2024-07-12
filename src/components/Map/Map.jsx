import { GoogleMap,useLoadScript,Marker,InfoWindow } from "@react-google-maps/api";
import MapStyles from "./MapStyles";
import { useCallback, useRef, useState,useEffect } from "react";
import icon from "../../assets/blood-bank.svg";
import getSiteLocations from "../../utils/getsiteLocations";
import Modal from 'react-modal';
import "./Map.scss"
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
  const [modalIsOpen, setIsOpen] = useState(false);
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
                onClick={()=>{
                  console.log(site); 
                  setSelected(site);
                }}/>
            ))}
            {selected ? (
              <InfoWindow position={{lat: selected.latitude, lng: selected.longitude}}>
              <article>
                <h3 className="modal__title modal__title--center">{selected.city}</h3>
                <h3 className="modal__title">{selected.fullAddress}</h3> 
                {selected.blood==="no"?null:<><h3 className="modal__title">Blood</h3></>}
                {selected.plasma==="no"?null:<><h3 className="modal__title">Plasma</h3></>}
                {selected.platelet==="no"?null:<><h3 className="modal__title">Platelet</h3></>} 
                <button type="button" onClick={()=>setIsOpen(true)}>Timings</button>
              </article>
              </InfoWindow>):null}
        </GoogleMap>
        
        {selected && <Modal isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="marker info">
          <h3 className="modal__title modal__title--center">Hours</h3>
          <article className="modal__hours-container">
            <h3 className="modal__title">Mon</h3>
            {selected.monStart==="Closed"?<h3 className="modal__title">{selected.monStart}</h3>:<h3 className="modal__title">{selected.monStart}-{selected.monEnd}</h3>}
          </article>
          <hr />
          <article className="modal__hours-container">
            <h3 className="modal__title">Tue</h3>
            {selected.tueStart==="Closed"?<h3 className="modal__title">{selected.tueStart}</h3>:<h3 className="modal__title">{selected.tueStart}-{selected.tueEnd}</h3>}
          </article>
          <hr />
          <article className="modal__hours-container">
            <h3 className="modal__title">Wed</h3>
            {selected.wedStart==="Closed"?<h3 className="modal__title">{selected.wedStart}</h3>:<h3 className="modal__title">{selected.wedStart}-{selected.wedEnd}</h3>}
          </article>
          <hr />
          <article className="modal__hours-container">
            <h3 className="modal__title">Thu</h3>
            {selected.thurStart==="Closed"?<h3 className="modal__title">{selected.thurStart}</h3>:<h3 className="modal__title">{selected.thurStart}-{selected.thurEnd}</h3>}
          </article>
          <hr />
          <article className="modal__hours-container">
            <h3 className="modal__title">Fri</h3>
            {selected.friStart==="Closed"?<h3 className="modal__title">{selected.friStart}</h3>:<h3 className="modal__title">{selected.friStart}-{selected.friEnd}</h3>}
          </article>
          <hr />
          <article className="modal__hours-container">
            <h3 className="modal__title">Sat</h3>
            {selected.satStart==="Closed"?<h3 className="modal__title">{selected.satStart}</h3>:<h3 className="modal__title">{selected.satStart}-{selected.satEnd}</h3>}
          </article>
          <hr />
          <article className="modal__hours-container">
            <h3 className="modal__title">Sun</h3>
            {selected.sunStart==="Closed"?<h3 className="modal__title">{selected.sunStart}</h3>:<h3 className="modal__title">{selected.sunStart}-{selected.sunEnd}</h3>}
          </article>
          <hr />       
        </Modal>}
    </section>
  )
}

export default Map;
