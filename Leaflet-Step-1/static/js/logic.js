// Create tile layer
var baseMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  //tileSize: 512,
  maxZoom: 18,
  //zoomOffset: -1,
  id: "light-v10",
  accessToken: API_KEY
});

// Initialize all of the LayerGroups we'll be using
var layers = {
  earthquakes: new L.LayerGroup(),
  tectonicPlates: new L.LayerGroup()
};
console.log(layers.earthquakes);

// Creating map object
var myMap = L.map("mapid", {
  center: [0,0], //40.7, -73.95],
  zoom: 5,
  layers: [
    layers.earthquakes,
    layers.tectonicPlates,
  ]
});

// Add tile layer to the map
baseMap.addTo(myMap);

// Create an overlays object to add to the layer control
var overlays = {
  "EarthQuakes": layers.earthquakes,
  "Techtonic Plates": layers.tectonicPlates
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(myMap);

// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map
info.addTo(myMap);

// Store API query variables
var baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0";
var method = "/summary";
var parameters = "/all_month.geojson"; // "/all_week.geojson";

// Assemble API query URL
var url = baseURL + method + parameters;

// Grab the data with d3
d3.json(url, function(response) {
  var features = response.features
  console.log(features);
  console.log(features.length);

  // Create a new marker cluster group
  // var markers = L.markerClusterGroup();

  // Loop through data
  for (var i = 0; i < 5; i++) {  //features.length

    // Capture the location coordinates and magnatude information for each event
    var geometry = features[i].geometry;
    console.log(geometry.coordinates);
    var properties = features[i].properties;
    console.log(properties.mag);

    // Create a new marker with the appropriate size, color, and coordinates
    var newMarker = L.marker([geometry.coordinates[1], geometry.coordinates[0]], {
      color: geometry.coordinates[2],
      radius: properties.mag
    });
    console.log(newMarker);

    // Add the new marker to the appropriate layer
    newMarker.addTo(layers.earthquakes);
    console.log(layers.earthquakes);

    // Bind a popup to the marker that will  display on click. This will be rendered as HTML
    newMarker.bindPopup("Earthquake ID: " + geometry.id + "<br> Magnatude: " + properties.mag + "<br> Lat: "+ geometry.coordinates[1] + "<br> Lng: "+ geometry.coordinates[0]);
    
   /* // Check for location property
    if (location) {

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
        .bindPopup(response[i].descriptor));
    }
*/
  }

  // Add our marker cluster layer to the map
  //myMap.addLayer(markers);

});