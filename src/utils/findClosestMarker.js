function findClosestMarker( currentlat, currentlng, markers ) {    
    var pi = Math.PI;
    var R = 6371; //equatorial radius
    var distances = [];
    var closest = -1;

    for( let i=0;i<markers.length; i++ ) {  
        var lat2 = markers[i].lat;
        var lon2 = markers[i].lng;

        var chLat = lat2-currentlat;
        var chLon = lon2-currentlng;

        var dLat = chLat*(pi/180);
        var dLon = chLon*(pi/180);

        var rLat1 = currentlat*(pi/180);
        var rLat2 = lat2*(pi/180);

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(rLat1) * Math.cos(rLat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c;

        distances[i] = d;
        if ( closest == -1 || d < distances[closest] ) {
            closest = i;
        }
    }

    // (debug) The closest marker is:
    return markers[closest];
}

export default findClosestMarker;