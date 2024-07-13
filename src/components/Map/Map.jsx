import { GoogleMap,useLoadScript,Marker,InfoWindowF } from "@react-google-maps/api";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import MapStyles from "./MapStyles";
import { useCallback, useRef, useState,useEffect } from "react";
import icon from "../../assets/blood-bank.svg";
import getSiteLocations from "../../utils/getsiteLocations";
import Modal from 'react-modal';
import "./Map.scss"
import SearchBar from "../../components/SearchBar/SearchBar";
import {useParams, useNavigate} from "react-router-dom";
import closeImg from "../../assets/close-24px.svg"

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "50vh"
}

const options = {
  styles: MapStyles,
  disableDefaultUI: true,
  zoomControl: true,
}

let setCity = "Toronto"

function Map() {

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries
  });

  const [siteData, setSiteData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [selected, setSelected] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [center, setCenter] = useState({lat: 43.6532,lng: -79.3832})
  const { city } = useParams()
 
  if (city){
    setCity = city
  }

  useEffect(() => {

    async function getSiteData(cityChosen) {
      try {
        console.log(cityChosen);
        const response = await getSiteLocations(cityChosen);
        setSiteData(response);
        setIsLoading(false);
      } catch (error) {
        setIsOpen(true);
        console.log("Error fetching data", error);
      }
    }
  
    getSiteData(setCity);
  }, [setCity]);

  if (isLoading) {
    return <p> Loading inventory data... </p>;
  }
  
  if (isError) {
    return <p> Something went wrong. Please try refreshing the page</p>;
  }


  function openModal(){
    setIsOpen(true)
  }
  function closeModal(){
    setIsOpen(false)
  }

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, [])

  const panTo = useCallback(({lat, lng}) => {
    mapRef.current.panTo({lat, lng});
    mapRef.current.setZoom(10);
  })

  if(loadError) return "Error loading maps";
  if(!isLoaded) return "Loading maps";

  const customIcon = {
    url: icon,
    origin: new window.google.maps.Point(0,0),
    anchor: new window.google.maps.Point(15,15),
    scaledSize: new window.google.maps.Size(30, 30),
  };

  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    'address': setCity
  }, function(results, status) {
    console.log()
    if (status == google.maps.GeocoderStatus.OK) {
      var Lat = results[0].geometry.location.lat();
      var Lng = results[0].geometry.location.lng();
      setCenter({lat: Lat, lng: Lng})
      };
  });

  return (
    <>
    <section>
    <SearchBar panTo={panTo} />
    <article className="map-container">
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
                <InfoWindowF position={{lat: selected.latitude, lng: selected.longitude}} onCloseClick={()=>setSelected(null)}>
                <article>
                  <h3>Canadian Blood Services</h3>
                  <h3>{selected.fullAddress}</h3> 
                  {selected.blood==="no"?null:<><h3>Blood Donation Accepted</h3></>}
                  {selected.plasma==="no"?null:<><h3>Plasma Donation Accepted</h3></>}
                  {selected.platelet==="no"?null:<><h3>Platelet Donation Accepted</h3></>} 
                  <button type="button" onClick={()=>setIsOpen(true)} className="info-window__button">Timings</button>
                </article>
                </InfoWindowF>):null}
        </GoogleMap>
        </article>
        </section>
        {typeof siteData === 'undefined' && <Modal isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="marker info" ariaHideApp={false} className="modal" shouldCloseOnOverlayClick={true}>
        <button className='modal__close' onClick={closeModal}>
              <img className="list__img" src={closeImg} alt="close button" />
        </button>
        <h3 className="modal__title modal__title--center">No nearby donation sites</h3>      
        </Modal>} 
        
        {selected && <Modal isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="marker info" className="modal">
            <button className='modal__close' onClick={() => setIsOpen(false)}>
              <img className="list__img" src={closeImg} alt="close button"></img>
            </button>
          <h3 className="modal__title modal__title--center">Hours</h3>
          <hr />
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
    </>
  )
}

export default Map;
