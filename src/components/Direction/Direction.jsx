import { useLoadScript,DirectionsRenderer } from "@react-google-maps/api";
import { useEffect,useState } from "react";
const libraries = ["places","routes"];

export default function Direction({mapReference}) {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries
      });

    const [directionService, setDirectionService] = useState();
    const [directionRenderer, setDirectionRenderer] = useState();
    const [routes, setRoutes] = useState([]);
    const [routeIndex, setRouteIndex] = useState(0);
    const selected = routes[routeIndex];
    const leg = selected?.legs[0]

    useEffect(() => {
        setDirectionService(new google.maps.DirectionsService());
        setDirectionRenderer(new google.maps.DirectionsRenderer({mapReference}));
    }, [mapReference]) ;
    
    useEffect(() => {

        async function getRoutes() {
            try{
                const response = await directionService.route({
                    origin:"100 Front St, Toronto, ON",
                    destination:"500 College St, Toronto, ON",
                    travelMode: google.maps.TravelMode.DRIVING,
                    provideRouteAlternatives: true,   
                })
                console.log(response.routes[0])
                directionRenderer.setDirections(response.routes[0]);
                setRoutes(response.routes);
            }catch (err){
                console.log(err);
            }
            
        }

        getRoutes();
    },[directionService,directionRenderer])

    // useEffect(()=>{
    //     directionRenderer.setRouteIndex(routeIndex);
    // },[routeIndex,directionRenderer])

    if(!leg){
        return 
    }
    // console.log(directionRenderer)
    // console.log(routes);
    // console.log(routes[routeIndex]);
    // console.log(selected);

  return (
    <article>
        <h2>{selected.summary}</h2>
        <p>{leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}</p>
        <p>Distance: {leg.distance?.text}</p>
        <p>Duration: {leg.duration?.text}</p>
        <h2>Other Routes</h2>
        <ul>{routes?.map((route,index)=>(
            <li key={route.summary}>
                <button onClick={()=>setRouteIndex(index)}>{route.summary}</button>
            </li>
        ))}</ul>
    </article>
  )
}
