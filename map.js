 // Adding the Layer and the Map
 var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
 });
 var map = L.map('map', {
   center: [38.94, -77.01],
   zoom: 10
  });
  map.addLayer(layer);
 
  var points = L.featureGroup();
  
  function onMapClick(e) {
    var popup = L.popup();

	  var LatLongStr = e.latlng.toString();
	  var LatLongSubStr = LatLongStr.substring(7, 27);
	  var LatLongSubStr2 = LatLongSubStr.replace(")", " ")
	  var LongStr = LatLongStr.substring(17, 26);
    popup
        .setLatLng(e.latlng)
        .setContent("Latitude/Longitude: " + LatLongSubStr2)
        .openOn(map);
    
	
    var point = {
    "type": "Feature",
		"properties": {
			"name": "selected point",		
		},
		"geometry": {
			"type": "Point",
			"coordinates": [e.latlng.lng, e.latlng.lat]
		}
    };

    layer = L.geoJSON().addTo(map);
    layer.addData(point);
	
  }
   
  function findCoordinates(){
     map.on('click', onMapClick) 
  };
  
  function removePoints(){
     map.removeLayer(layer);

    // Recreate the map with original layer
    layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    });

    map.addLayer(layer);

  };
  
  
  function createCircle(latitude, longitude, radius){
    // Create polygon and add it to the map
    var circle = L.circle([latitude, longitude], {
     color: "#1c7119",
     fillColor: "#00b33c",
     fillOpacity: 0.3,
     radius: radius
   }).addTo(map);
 
   // Change the center and the view to be center of circle
    map.setView(new L.LatLng(latitude, longitude), 13);
  };
  
  function createCircleFromCoordinates(){
    // Get the numbers from html inputs
    var longitude = Number(document.getElementsByName("Longitude")[0].value);
    var latitude = Number(document.getElementsByName("Latitude")[0].value);
    var radiusMeters = Number(document.getElementsByName("RadiusMeters")[0].value);
	  var radiusInput = Number(document.getElementsByName("RadiusMiles")[0].value);
    var radiusMiles = radiusInput * 1609.34;

    if (radiusMiles == 0 &&	radiusMeters > 0) {
      createCircle(latitude, longitude, radiusMeters);
    } else if (radiusMeters == 0 && radiusMiles > 0) {
          createCircle(latitude, longitude, radiusMiles);
    } else if (radiusMeters > 0 && radiusMiles > 0) {
      alert("you cannot have a radius value in both Meters and Miles")
    } else {
      alert("add a radius value in either Meters or Miles")
    }
       
  };
 
 
 