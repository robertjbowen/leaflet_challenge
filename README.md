# leaflet_challenge


## Link: https://robertjbowen.github.io/leaflet_challenge/Leaflet-Step-2/

<p>
    <img src="https://github.com/robertjbowen/leaflet_challenge/blob/main/images/Picture12.png"/>
    <br>
    <em>Display Output of Interactive Map with Earthquake Overlay</em>
</p> 

***

The purpose of this challenge is to build an interctive map of USGS Earthquake data showing location, magnatude and depth data. The interactive map allows the user to chose the style of map to be displayed as well as toggling on and off data overlays. The map also allows the user to zoom in and out to view the data more closely and a data card popup is available by clicking on individual earthquake events. The data is set to draw the last 7 days of USGS data but can be expanded to 30 days or more by chnaging the api querly values in the javascript application. All of the code and functionality of Leaflet-Step 1 is included in Leaflet-Step-2 files so the design concept below only shows and explains the Step 2 application.

***

### Documents in this repository are:

1. Leaflet-Step-1 and 2/index.html - This is the html code to generate the interactive dashboard web page.(starter code - provided)


2. Leaflet-Step-1 and 2/static/js directory - Folder containing the javascript project code for automatic table and date search capabilities
	
	* logic.js - javasrcipt file containing functions and event triggers to read data.csv, generate the html code to render and transition the plots 

	* config.js - javasrcipt file containing user key for accessing map tiles from the mapbox.com api


3. Leaflet-Step-1 and 2/static/css directory - folder containing the style.css stlye sheet for styling the appearance of the html output display (starter code - provided)


4. images directory - contains images of the WebPage outputs for display in this ReadMe

***

### Design concept:

The application begins by importing the map tile sets from mapbox.com to be rendered as the base layer, it then initializes the map display window, defines and adds the overlay layers, the overlay controls, and the map legend. finally the app imports the geojson data, extracts and formats the key values, and then generates a set of event markers to display on the icons layer, and a shapefile to display on the tectonic plates layer. The code also uses popups to display event data for individual data points when the user selects them.

***

1. The app makes two calls to mapbox.com to import two seperate map tile sets. There are several map styles available but I chose to include only the light and dark tile sets for this project. Each of the tile sets are assigned to a variable and the variables are grouped under the mapBases variable for later assingment.

<p>
    <img src="https://github.com/robertjbowen/leaflet_challenge/blob/main/images/Picture1.png"/>
    <br>
    <em>logic.js defining the map tile api calls</em>
</p>

2. The app then initializes two layer groups to hold the earthquake and tectonic plate data. These are likewise grouped under a layers variable for later assignment.

<p>
    <img src="https://github.com/robertjbowen/leaflet_challenge/blob/main/images/Picture2.png"/>
    <br>
    <em>logic.js initializing data layers</em>
</p>

3. Next the map object is created and is set to append index.html at location id mapid. The initial map center, zoom level, and active layers are defined.

<p>
    <img src="https://github.com/robertjbowen/leaflet_challenge/blob/main/images/Picture3.png"/>
    <br>
    <em>logic.js initializing map object</em>
</p> 

4. The overlay controller in defined and the maps and layers are assigned to allow the user to select options dynamically. The overlays and the mapBases variables define how the options will apprear in the selector. The overlay selector is assigned to the upper right corner of the display by default. The selectable options appear when the user hovers over the selector icon.

<p>
    <img src="https://github.com/robertjbowen/leaflet_challenge/blob/main/images/Picture4.png"/>
    <br>
    <em>logic.js initializing ovrlays</em>
</p> 

<p>
    <img src="https://github.com/robertjbowen/leaflet_challenge/blob/main/images/Picture5.png"/>
    <br>
    <em>logic.js formatting and adding the overlay controller</em>
</p>  

<p>
    <img src="https://github.com/robertjbowen/leaflet_challenge/blob/main/images/Picture13.png"/> <img src="https://github.com/robertjbowen/leaflet_challenge/blob/main/images/Picture15.png"/>
    <br>
    <em>Display output of overlay controller closed and open</em>
</p> 

5. Next the map legend is defined to be displayed in the bottom right corner. Leaflet has a built in function to render the legend in the display. Depth increments are defined to govern the break points of the color scale. The function colorLegend is used to define the colors to be displayed in the legend and is called again to assign colors of the marker circles to be displayed in the icons layer. Finally the legend is appended to a new div in the html file for display.

<p>
    <img src="https://github.com/robertjbowen/leaflet_challenge/blob/main/images/Picture6.png"/>
    <br>
    <em>logic.js formatting and adding the map legend</em>
</p>  

<p>
    <img src="https://github.com/robertjbowen/leaflet_challenge/blob/main/images/Picture7.png"/>
    <br>
    <em>colorLegend function to define color scale</em>
</p> 

<p>
    <img src="https://github.com/robertjbowen/leaflet_challenge/blob/main/images/Picture14.png"/>
    <br>
    <em>Display Output of the Map Legend</em>
</p> 

6. With the map format initialized, the app now imports the data to be displayed. The app begins by defining the URL and query parameters to import earthquake data from the USGS.gov API. The geoJSON data is imported using D3.json. The app steps through each event in the data and extracts the latitude, longitude, and depth geometry coordiantes as well as the magnatude property value, date, and the event id. A markerColor is determined using the colorLegend function based on the depth value of the event. A new circular marker is created and assigned the lat and long coordinates for its center and its radius is defined by the magnatude value of the event multiplied by 10,000 to make them large enough to see clearly. opacity is set at 50% to allow the map to still be visible through the markers. Each marker is added the earthquakes layergroup for display. Finally, a popup is defined for each marker to show key data about the event when the user clicks on the icon.

<p>
    <img src="https://github.com/robertjbowen/leaflet_challenge/blob/main/images/Picture8.png"/>
    <br>
    <em>logic.js importing earthquake data and creating and formatting the event markers</em>
</p>  

<p>
    <img src="https://github.com/robertjbowen/leaflet_challenge/blob/main/images/Picture11.png"/>
    <br>
    <em>Display output of initial icons layer</em>
</p> 

<p>
    <img src="https://github.com/robertjbowen/leaflet_challenge/blob/main/images/Picture16.png"/>
    <br>
    <em>Display output showing popup data card for a selected event</em>
</p> 

7. The final step in the app is to import and display tectonic plate data. The source material supplied a link to a gitHub repository holding the geoJSON file to be imported. The app again uses D3.json to import the data but his time assigns the shapefile directly to a builtin function that renders the shapefile. I set the color to purple so that it would stand out and the file is then added to the tectonicPlates layer for display.

<p>
    <img src="https://github.com/robertjbowen/leaflet_challenge/blob/main/images/Picture9.png"/>
    <br>
    <em>logic.js importing techtonic plate data and creating and formatting the overlay</em>
</p> 

<p>
    <img src="https://github.com/robertjbowen/leaflet_challenge/blob/main/images/Picture10.png"/>
    <br>
    <em>Final Display Output Interactive Map with Earthquake and Tectonic Plate Overlays</em>
</p>

***
