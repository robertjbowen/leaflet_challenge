// Create tile layer
var baseMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

// Initialize the LayerGroups
var layers = {
  earthquakes: new L.LayerGroup(),
  tectonicPlates: new L.LayerGroup()
};

// Create map object to insert at div id 'mapid'
var myMap = L.map("mapid", {
  center: [20,0], //full world map 
  zoom: 3,
  layers: [
    layers.earthquakes,
    layers.tectonicPlates,
  ]
});

// Add the tile layer to the map
baseMap.addTo(myMap);

// Create overlays object to allow user layer control
var overlays = {
  "EarthQuakes": layers.earthquakes,
  "Tectonic Plates": layers.tectonicPlates
};

// Create an overlay controler for the layers, add the overlay controler to the map
L.control.layers(null, overlays).addTo(myMap);

// Create a map legend to display information about the map icons
var mapLegend = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
mapLegend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend"),
  depths = [-10,10,30,50,70,90];
  for (var i = 0; i < depths.length; i++) {
    div.innerHTML += '<i style= "background:' + colorLegend(depths[i] + 1) + '"></i>' + depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
  }
  return div;
};

// Add the legend to the map
mapLegend.addTo(myMap);

function colorLegend (d) {
  return d < 10 ? "lightgreen" :
  d < 30 ? "green" :
  d < 50 ? "steelblue" :
  d < 70 ? "blue" :
  d < 90 ? "orange" :
  "red";
}

// Store API query variables
var baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0";
var method = "/summary";
var parameters = "/all_week.geojson";
//var parameters = "/all_month.geojson";

// Assemble API query URL
var url = baseURL + method + parameters;

// Grab the data with d3
d3.json(url, function(response) {
  var features = response.features
  console.log(features);

  // Loop through data
  for (var i = 0; i < features.length; i++) {  
  //for (var i = 0; i < 25; i++) {  
    // Capture the location coordinates and magnatude information for each event
    var geometry = features[i].geometry;
    console.log(geometry.coordinates);
    var properties = features[i].properties;
    console.log(properties.mag);
    
    var markerColor = colorLegend(geometry.coordinates[2]);
    
    // Create a new marker with the appropriate size, color, and coordinates
    var newMarker = L.circle([geometry.coordinates[1], geometry.coordinates[0]], {
      color: markerColor,
      fillColor: markerColor,
      fillOpacity: 0.5,
      radius: properties.mag * 10000
    });
    console.log(newMarker);

    // Add the new marker to the earthquakes layer
    newMarker.addTo(layers.earthquakes);
    console.log(layers.earthquakes);

    // Bind a popup to the marker that will display on click. 
    newMarker.bindPopup("Earthquake ID: " + features[i].id + "<br> Magnatude: " + properties.mag + "<br> Lat: "+ geometry.coordinates[1] + "<br> Lng: "+ geometry.coordinates[0] + "<br> Depth: "+ geometry.coordinates[2]);
  }  
});