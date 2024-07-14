async function getRoutes(origin,end) {
    console.log(origin,end);
    const directionsService = new google.maps.DirectionsService();
    const response = await directionsService.route({
        origin: origin,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING  
    })
    setRoutes(response);
    setDistance(response.routes[0].legs[0].distance.text)
    setDuration(response.routes[0].legs[0].duration.text)
}

export default getRoutes;

