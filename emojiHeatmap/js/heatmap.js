var vector = new ol.source.Vector({
  format: new ol.format.KML({
    extractStyles: false
  })
});

var heatMap = new ol.layer.Heatmap({
  source: vector,
  blur: parseInt(15, 10),
  radius: parseInt(5, 10),
  opacity: 0.9,
  gradient: ['#0000ff', '#f00', '#f00', '#ff0', '#f00']
});

var raster = new ol.layer.Tile({
  source: new ol.source.OSM()
});

var map = new ol.Map({
  target: 'map',
  layers: [ raster, heatMap ],
  view: new ol.View({
    center: [0, 0],
    zoom: 2
  })
});

function emptyVector() {
  var features = vector.getFeatures();

  for(var i = 0; i < features.length; i++) {
    vector.removeFeature(features[i]);
  }
}

$(document).ready(function(){
  if(vector.getFeatures().length > 0) { // Empty the vector, if full
    emptyVector();
  }


  $.getJSON("../emojiHeatmapper/emoji.json", function(json) {
    for (var i = 0; i < json.data.length; i++){
      var query = json.data[i][1];
      // Fetch loklak API data, and fill the vector
      loklakFetcher.getTweets(query, function(tweets) {
        for(var i = 0; i < tweets.statuses.length; i++) {
          if(tweets.statuses[i].location_point !== undefined){
          // Creation of the point with the tweet's coordinates
          //  Coords system swap is required: OpenLayers uses by default
          //  EPSG:3857, while loklak's output is EPSG:4326
            var point = new ol.geom.Point(ol.proj.transform(tweets.statuses[i].location_point, 'EPSG:4326', 'EPSG:3857'));
            vector.addFeature(new ol.Feature({  // Add the point to the data vector
              geometry: point,
              weight: 20
            }));
          }
        }
      });
    }
  });
});
