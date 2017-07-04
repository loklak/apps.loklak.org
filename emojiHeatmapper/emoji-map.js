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

  for (var i = 0; i < features.length; i++) {
    vectorSource.removeFeature(features[i]);
  }
}

function updateMap() {
  if (vectorSource.getFeatures().length > 0) { // Empty the vector, if full
    emptyVector();
  }

var query = document.getElementById('searchField').value;

// Fetch loklak API data, and fill the vector
loklakFetcher.getTweets(query, function(tweets) {
    var emotion = [];
    var emotions_array = [];

    for (var i = 0; i < tweets.statuses.length; i++) {
        if (tweets.statuses[i].classifier_emotion) {
            emotion = tweets.statuses[i].classifier_emotion;
            emotions_array.push(emotion);
        }
        if (tweets.statuses[i].location_point !== undefined) {
            // Creation of the point with the tweet's coordinates
            //  Coords system swap is required: OpenLayers uses by default
            //  EPSG:3857, while loklak's output is EPSG:4326
            var point = new ol.geom.Point(ol.proj.transform(tweets.statuses[i].location_point, 'EPSG:4326', 'EPSG:3857'));
            vectorSource.addFeature(new ol.Feature({  // Add the point to the data vector
                geometry: point
            }));
        }
        emotions_array.sort();
        emotion_array = jQuery.unique( emotions_array );

        //Loading the sentiment
        $(document).ready(function() {
            var listItems= "";
            if (emotions_array.length == 0) {
                listItems = "No Sentiment data is available for " + query
            }
            if (emotion_array.length == 1) {
                listItems += "<h3> Sentiment of " + query + " is ";
            } else if (emotion_array.length > 1) {
                listItems += "<h3> Sentiments of " + query + " are ";
            }

            var emotion_data = emotion_array.join(", ") + "."
            listItems += emotion_data + "</h3>"

            $("#sentiment").html(listItems);
        });
    }
});
}
