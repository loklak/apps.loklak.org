var app = angular.module('countryTweetApp', []);

app.controller("app", function ($scope, $http) {
    $scope.temp = "haha";
    $scope.tweetFreq = {};
    var mapCenterLat = 0.0;
    var mapCenterLon = 0.0;
    $scope.countryCount = 0;
    $scope.tweetMax = 0;
    $scope.tweetMin = 0;
    $scope.tweetMaxCountries = [];
    $scope.modalList = [];
    $scope.map = null;
    $scope.plot = null;
    $scope.isLoading = false;
    $scope.error = "";
    $(".date").datepicker();
    $(".date").datepicker( "option", "dateFormat", "yy-mm-dd");
    var LeafIcon = L.Icon.extend({
        options: {
            iconSize:     [38, 38],
            iconAnchor:   [22, 94],
            popupAnchor:  [-3, -76]
        }
    });
    var greenIcon = new LeafIcon({iconUrl: 'images/marker-green.ico'}),
        blueIcon = new LeafIcon({iconUrl: 'images/marker-blue.ico'}),
        redIcon = new LeafIcon({iconUrl: 'images/marker-red.png'});

    $scope.showSnackbar = function() {
        $(".snackbar").addClass("show");
        setTimeout(function(){ $(".snackbar").removeClass("show") }, 3000);
    }

    // Function to search query using Loklak API
    $scope.search = function() {
        $scope.error = "";
        if ($scope.tweet === undefined || $scope.tweet === "" || $scope.isLoading === true) {
            if ($scope.tweet === undefined || $scope.tweet === "") {
                $scope.error = "Please enter a valid query word."
            }
            if ($scope.isLoading === true) {
                $scope.error = "Previous search not completed. Please wait...";
            }
            $scope.showSnackbar();
            return;
        }

        var count = $(".count").val();
        if (count.length !== 0) {
            if (/^\d+$/.test(count) === false) {
                $scope.error = "Count should be a valid number.";
                $scope.showSnackbar();
                return;
            }
        }

        var sinceDate = $(".start-date").val();
        var endDate = $(".end-date").val();
        if ((sinceDate !== undefined && endDate !== "") && (endDate !== undefined && endDate !== "")) {
            var date1 = new Date(sinceDate);
            var date2 = new Date(endDate);
            if (date2 < date1) {
                $scope.error = "To date should be after From date";
                $scope.showSnackbar();
                return;
            }
        }

        $scope.isLoading = true;
        var query = "q=" + $scope.tweet;

        if (sinceDate !== undefined && sinceDate !== "" ) {
            query += "%20since:" + sinceDate;
        }
        if (endDate !== undefined && endDate !== "") {
            query += "%20until:" + endDate;
        }

        var url = "http://api.loklak.org/api/search.json?callback=JSON_CALLBACK&" + query;
        var count = $(".count").val();
        if (count !== undefined && count !== "") {
            url  += "&count=" + count;
        }
        $http.jsonp(url)
            .then(function (response) {
                $scope.reset();
                $scope.prepareFreq(response.data.statuses);
                $scope.displayMap();
            });
    }

    // Function to prepare frequency of tweets for individual countries
    $scope.prepareFreq = function(data) {
        data.forEach(function(status) {
            if (status.place_country_code !== undefined) {
                if ($scope.tweetFreq[status.place_country_code] === undefined) {
                    $scope.tweetFreq[status.place_country_code] = [];
                }
                $scope.tweetFreq[status.place_country_code].push(status);
            }
        });
        var sumLat = 0.0;
        var sumLon = 0.0;

        for (var key in $scope.tweetFreq) {
            sumLat += $scope.tweetFreq[key][0].place_country_center[0];
            sumLon += $scope.tweetFreq[key][0].place_country_center[1];
            $scope.modalList.push({
                country_name: $scope.tweetFreq[key][0].place_country,
                country_code: $scope.tweetFreq[key][0].place_country_code,
                count: $scope.tweetFreq[key].length
            });
            $scope.countryCount += 1;
        }
        mapCenterLat = sumLat / $scope.countryCount;
        mapCenterLon = sumLon / $scope.countryCount;
    }

    $scope.setUpInitialMap = function() {
        var background = L.tileLayer(
            'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                minZoom: 1,
                noWrap: true
            });
        $scope.map = L.map('map', {
            center: [0, 0],
            zoom: 2,
            'maxBounds': [
                [-90,-180],
                [90, 180]
            ],
            layers: [background]
        });
    }

    // Utility function to get marker from marker icon
    $scope.getMarker = function(markerIcon, country, key) {
        var marker = markerIcon.bindPopup(
            "<div class='header'>" + country.place_country +
            " (" + country.place_country_code + ")" + "</div><div class='tweet-number'>" +
            "Number of tweets : " + $scope.tweetFreq[key].length + "</div>"
        );

        return marker;
    }

    // Function to setup map and its layers
    $scope.displayMap = function() {
        var tweetCount = [];
        $scope.tweetMaxCountries = [];
        for (var key in $scope.tweetFreq) {
            tweetCount.push($scope.tweetFreq[key].length);
        }
        $scope.tweetMax = Math.max.apply(null, tweetCount);
        $scope.tweetMin = Math.min.apply(null, tweetCount);
        for (var key in $scope.tweetFreq) {
            if ($scope.tweetFreq[key].length === $scope.tweetMax) {
                $scope.tweetMaxCountries.push($scope.tweetFreq[key][0].place_country);
            }
        }
        $scope.tweetMaxCountries = $scope.tweetMaxCountries.join(",");
        var rangeSize = $scope.tweetMax - $scope.tweetMin;
        var rangeMid = ($scope.tweetMax + $scope.tweetMin) / 2;

        var countriesHigh = [];
        var countriesMedium = [];
        var countriesLow = [];
        for (var key in $scope.tweetFreq) {
            var country = $scope.tweetFreq[key][0];
            var size = $scope.tweetFreq[key].length;
            var markerIcon = null;
            var marker = null;
            if (size === $scope.tweetMax) {
                markerIcon = L.marker(country.place_country_center, {icon: redIcon});
                marker = $scope.getMarker(markerIcon, country, key);
                countriesHigh.push(marker);
            } else if (size > rangeMid) {
                markerIcon = L.marker(country.place_country_center, {icon: blueIcon});
                marker = $scope.getMarker(markerIcon, country, key);
                countriesMedium.push(marker)
            } else {
                markerIcon = L.marker(country.place_country_center, {icon: greenIcon});
                marker = $scope.getMarker(markerIcon, country, key);
                countriesLow.push(marker);
            }
        }
        var countryHighGroup = L.layerGroup(countriesHigh);
        var countryMediumGroup = L.layerGroup(countriesMedium);
        var countryLowGroup = L.layerGroup(countriesLow);

        var backgroundLight = L.tileLayer(
            'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                minZoom: 1,
                noWrap: true
            });
        $scope.map = L.map('map', {
            center: [mapCenterLat, mapCenterLon],
            zoom: 2,
            'maxBounds': [
                [-90,-180],
                [90, 180]
            ],
            layers: [backgroundLight, countryHighGroup, countryMediumGroup, countryLowGroup]
        });

        var overlayMaps = {
            "Maximum tweets": countryHighGroup,
            "Medium tweets": countryMediumGroup,
            "Low tweets": countryLowGroup
        };
        var baseMaps = {
            "basemap": backgroundLight
        };
        L.control.layers(baseMaps, overlayMaps).addTo($scope.map);
        $scope.isLoading = false;
    }

    // Utulity function to reset the app
    $scope.reset = function() {
        $scope.tweetFreq = {};
        $scope.countryCount = 0;
        $scope.tweetMax = 0;
        $scope.tweetMin = 0;
        $scope.tweetMaxCountries = [];
        $scope.modalList = [];
        if ($scope.map !== null) {
            $scope.map.off();
            $scope.map.remove();
        }
    }

    // Function to invoke modal
    $scope.showStat = function() {
        $('#statInfo').modal('show');
    }

    $scope.setUpInitialMap();
});

function openNav() {
    $(".sidenav").css("transform", "translateX(0px)");
    $(".open").css("display", "none");
}

function closeNav() {
    $(".sidenav").css("transform", "translateX(-260px)");
    $(".open").css("display", "block");
}
