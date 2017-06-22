//Loading the dropdown
$(function() {
  // Initializes and creates emoji set from sprite sheet
  window.emojiPicker = new EmojiPicker({
    emojiable_selector: '[data-emojiable=true]',
    assetsPath: './lib/img/',
    popupButtonClasses: 'fa fa-smile-o'
  });
  // Finds all elements with `emojiable_selector` and converts them to rich emoji input fields
  // You may want to delay this step if you have dynamically created input fields that appear later in the loading process
  // It can be called as many times as necessary; previously converted input fields will not be converted again
  window.emojiPicker.discover();
});

      // Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-49610253-3', 'auto');
ga('send', 'pageview');

// Geometries
var point = new ol.geom.Point(
    ol.proj.transform([3,50], 'EPSG:4326', 'EPSG:3857')
    );

// Features
var pointFeature = new ol.Feature(point);

// Source and vector layer
var vectorSource = new ol.source.Vector();

var style = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: [64, 200, 200, 0.5],
        width: 5
    }),
    text: new ol.style.Text({
        font: '30px sans-serif',
        text: document.getElementById('searchField').value !== '' ? document.getElementById('searchField').value : '',
        fill: new ol.style.Fill({
            color: [64, 64, 64, 0.75]
        })
    })
});

var styles = [style];

var vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: function(feature, resolution) {
    style.getText().setText(document.getElementById('searchField').value);
    return styles;
  }
});

// Maps
var map = new ol.Map({
target: 'map',  // The DOM element that will contains the map
renderer: 'canvas', // Force the renderer to be used
layers: [
// Add a new Tile layer getting tiles from OpenStreetMap source
new ol.layer.Tile({
    source: new ol.source.OSM()
}),
vectorLayer
],
// Create a view centered on the specified location and zoom level
view: new ol.View({
    center: ol.proj.transform([2.1833, 41.3833], 'EPSG:4326', 'EPSG:3857'),
    zoom: 2
})
});

function emptyVector() {
  var features = vectorSource.getFeatures();

  for(var i = 0; i < features.length; i++) {
    vectorSource.removeFeature(features[i]);
  }
}

function validateQuery() {
    var query = document.getElementById('searchField').value;
    $.getJSON( "emoji.json", function(tweets) {
        var flag = 0;
        for(var i = 0; i < tweets.data.length; i++) {
            if (tweets.data[i].indexOf(query) !== -1) {
                flag = 1;
                break;
            }
        }
        if (flag == 1) {
             //emoji found plotting map
             updateMap();
         }
         else {
             //emoji not found
             alert("Enter an emoticon/emoji to see results");
         }
    });
}

function updateMap() {
  if(vectorSource.getFeatures().length > 0) { // Empty the vector, if full
    emptyVector();
  }

var query = document.getElementById('searchField').value;

// Fetch loklak API data, and fill the vector
loklakFetcher.getTweets(query, function(tweets) {
    for(var i = 0; i < tweets.statuses.length; i++) {
        if(tweets.statuses[i].location_point !== undefined){
            // Creation of the point with the tweet's coordinates
            //  Coords system swap is required: OpenLayers uses by default
            //  EPSG:3857, while loklak's output is EPSG:4326
            var point = new ol.geom.Point(ol.proj.transform(tweets.statuses[i].location_point, 'EPSG:4326', 'EPSG:3857'));
            vectorSource.addFeature(new ol.Feature({  // Add the point to the data vector
                geometry: point
            }));
        }
    }
});
}

// Event listeners for updating the map
document.getElementById('searchButton').addEventListener('click', validateQuery);

document.getElementById('searchField').addEventListener('keyup', function(e) {
  if(e.keyCode === 13) {
    validateQuery();
  }
});
