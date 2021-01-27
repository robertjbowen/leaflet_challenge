// Create tile layer
var baseMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

// Initialize all of the LayerGroups we'll be using
var layers = {
  earthquakes: new L.LayerGroup(),
  tectonicPlates: new L.LayerGroup()
};

// Creating map object
var myMap = L.map("mapid", {
  center: [40.7, -73.95],
  zoom: 11,
  layers: [
    layers.earthquakes,
    layers.tectonicPlates,
  ]
});

// Add our 'lightmap' tile layer to the map
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
    var magnatude = features[i].properties;
    console.log(magnatude.mag);

    // Create a new marker with the appropriate size, color, and coordinates
    var newMarker = L.marker([geometry.coordinates[1], geometry.coordinates[0]], {
      color: geometry.coordinates[2],
      radius: magnatude.mag
    });
    console.log(newMarker);

    /*  // Add the new marker to the appropriate layer
    newMarker.addTo(layers[stationStatusCode]);

      // Bind a popup to the marker that will  display on click. This will be rendered as HTML
      newMarker.bindPopup(station.name + "<br> Capacity: " + station.capacity + "<br>" + station.num_bikes_available + " Bikes Available");
    */
   /* // Check for location property
    if (location) {

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
        .bindPopup(response[i].descriptor));
    }
*/
  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});