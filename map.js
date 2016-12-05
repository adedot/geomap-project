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

var accessToken = "pk.eyJ1IjoiYWRldG9sYSIsImEiOiJjaWZrMnUxam9jeXVocnNtN2d4ZTZuYWY0In0.Zw_sIj0XY7OUMObgjGVfcw";

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
  var radiusInput = Number(document.getElementsByName("RadiusMiles")[0].value);
  var radiusMiles = radiusInput * 1609.34;

  createCircle(latitude, longitude, radiusMiles); 
};
 
 
function createCircleFromAddress(){

  var geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
  var query = document.getElementsByName("address")[0].value;
  var url = geocodeUrl + query+".json?types=country,region,postcode,place&access_token="+accessToken;

  $.get(url, function(data, status){

    var point = data["features"][0].center;
    var longitude = point[0];
    var latitude = point[1];
    var radiusInput = Number(document.getElementsByName("addressRadius")[0].value);
    var radiusMiles = radiusInput * 1609.34;
    createCircle(latitude, longitude, radiusMiles);
  });
  
  
}
 
 
 