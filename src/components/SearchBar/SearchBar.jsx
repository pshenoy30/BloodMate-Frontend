import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import { useNavigate } from "react-router-dom";
import Compass from "../../assets/compass.svg"
import "./searchBar.scss"

function SearchBar({panTo}) {
  sessionStorage.removeItem('upa');
  const navigate = useNavigate();

 const {ready, value, suggestions: {status, data},setValue, clearSuggestions} = usePlacesAutocomplete({
   requestOptions:{
       location: {  lat: () => 43.653225, lng:() => -79.383186},
       radius: 200*1000,
       types: ["locality"],
       componentRestrictions: {
         country: "ca",
       }
   }
 })
  return (
    <section className="search__container">
      <Combobox onSelect={ async (address) => {
                setValue(address, false); 
                  try{
                    const results = await getGeocode({address});
                    const param = results[0].formatted_address.split(",")[0];
                    const { lat, lng } = getLatLng(results[0]);
                    panTo ({ lat, lng });
                    navigate(`/donor/${param}`)
                  } catch (error){
                    console.log("Couldn't fetch the lat and lng", error);
                  }
              }}>
                  <ComboboxInput value={value} onChange={(e) => {
                      setValue(e.target.value);
                  }} disabled={!ready}
                  placeholder="Enter the nearest city"
                  className="search__bar"
                  />
                  <ComboboxPopover className="search__suggestions">
                     <ComboboxList className="search__list">
                     {status === "OK" &&data.length>0?data?.map(({id,description})=>(
                              <ComboboxOption key={id} value={description} className="search__list__item"/>
                          )):<h3 className="search__list__item">No results found</h3>}

                      </ComboboxList>
                  </ComboboxPopover>
              </Combobox>
              <div className="search__locator">
                <img src={Compass} className="search__locator__image" alt="Center based on your current location" onClick={
                  () => {
                    let lat = 0;
                    let lng = 0;
                    navigator.geolocation.getCurrentPosition(async(position)=>{
                      panTo({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                      },()=>null);
                      const latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                      const results =  await getGeocode({'latLng': latlng});
                      const param = results[0].formatted_address.split(",")[0];
                      navigate(`/donor/${param}`)
                    })
                  }
                }  />
              </div>
    </section>
  )
}

export default SearchBar