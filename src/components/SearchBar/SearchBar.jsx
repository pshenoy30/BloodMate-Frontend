import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import { useNavigate } from "react-router-dom";
import Compass from "../../assets/compass.svg"
import "./searchBar.scss"

function SearchBar({panTo,type}) {

  sessionStorage.removeItem('upa');
  const navigate = useNavigate();

 const {ready, value, suggestions: {status, data},setValue, clearSuggestions} = usePlacesAutocomplete({
   requestOptions:{
       location: {  lat: () => 43.653225, lng:() => -79.383186},
       radius: 200*1000,
       componentRestrictions: {
         country: "ca",
       }
   }
 })

  return (
    <section className="search__container">
      {type === "Map"?<>
      <Combobox onSelect={ async (address) => {
                setValue(address, false)
                clearSuggestions(); 
                  try{
                    const results = await getGeocode({address});
                    let params = results[0].address_components.find((item) => item.types[0] === 'locality');
                    console.log(results[0]);

                    console.log(params)
                    const param = params.long_name;
                    const { lat, lng } = getLatLng(results[0]);
                    console.log({ lat, lng })
                    navigate(`/donor/${param}/${lat}/${lng}/${results[0].formatted_address}`)
                  } catch (error){
                    console.log("Couldn't fetch the lat and lng", error);
                    navigate(`/locationNotFound`)
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

      </>:<Combobox onSelect={ async (address) => {
                setValue(address, false)
                clearSuggestions(); 
                  try{
                    const results = await getGeocode({address});
                    const params = results[0].address_components.find((item) => item.types[0] === 'locality');
                    console.log(results[0])
                    const param = params.long_name;
                    navigate(`/requestor/${param}`)
                  } catch (error){
                    console.log("Couldn't fetch the lat and lng", error);
                  }
              }}>
                  <ComboboxInput value={value} onChange={(e) => {
                      setValue(e.target.value);
                  }} disabled={!ready}
                  placeholder="Enter the nearest city"
                  className="search__bar search__bar--requestor"
                  />
                  <ComboboxPopover className="search__suggestions">
                     <ComboboxList className="search__list">
                     {status === "OK" &&data.length>0?data?.map(({id,description})=>(
                              <ComboboxOption key={id} value={description} className="search__list__item"/>
                          )):<h3 className="search__list__item">No results found</h3>}

                      </ComboboxList>
                  </ComboboxPopover>
              </Combobox>}
    </section>
  )
}

export default SearchBar