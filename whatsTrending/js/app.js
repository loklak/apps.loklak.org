var app = angular.module('Trending', []);
app.controller('getHash', ['$scope', '$http', '$q', '$sce', function($scope, $http, $q, $sce) {
    $scope.queryUrl = "http://loklak.org/api/search.json?callback=JSON_CALLBACK&" +
                      "q=since:2016-06-01&source=cache&count=0&fields=hashtags&limit=10";
    $scope.count = 10;
    $scope.start = "2016-06-01";

    $scope.getTags = function() {
        $("#filter-options").slideToggle("fast");
        $scope.loading = true;
        var since = "since:2016-06-01";
        var until = "&";
        var count = "limit=10";

        if ($scope.startdate !== undefined) {
            since = "since:" + $scope.startdate;
        }

        if ($scope.enddate !== undefined) {
            until = "%20until:" + $scope.enddate + "&";
        }

        if ($scope.count !== undefined) {
            count = "limit=" + $scope.count;
        }

        $scope.queryUrl = "http://loklak.org/api/search.json?callback=JSON_CALLBACK&" +
                          "q=" + since + until + "source=cache&count=0&fields=hashtags&" +
                          count;

        console.log($scope.queryUrl);


        $http.jsonp($scope.queryUrl).then(function(response) {
            var data = response.data.aggregations.hashtags;
            var hashtags = [];
            for (key in data) {
                hashtags.push({"name": key, "count": data[key]});
            }
            $scope.hashtags = hashtags;
            $scope.plotChart(hashtags);
            $scope.loading = false;
        });
    }

    $scope.plotChart = function(hashtags) {
        var plotData = [];

        hashtags.forEach(function(hashtag){
            plotData.push({name: hashtag.name, colorByPoint: true, y: hashtag.count});
        });

        $('.pie-chart').highcharts({
            chart: {
                plotBackgroundColor: '#d7dee5',
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: "Top Hastags"
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format : '',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Top HashTags',
                colorByPoint: true,
                data: plotData
                }]
            });
    }

    $scope.getTags();
}]);
