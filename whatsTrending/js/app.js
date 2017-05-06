var app = angular.module('Trending', []);
app.controller('getHash', ['$scope', '$http', '$q', '$sce', function($scope, $http, $q, $sce) {
    $scope.queryUrl = "http://loklak.org/api/search.json?callback=JSON_CALLBACK&" +
                      "q=since:2016-06-01&source=cache&count=0&fields=hashtags&limit=10";
    $scope.count = 10;
    $scope.startdate = "2016-06-01";

    $scope.isValidDate = function(dateString) {
        var regEx = /^\d{4}-\d{2}-\d{2}$/;
        if (dateString.match(regEx) === null) {
            return false;
        }

        dateComp = dateString.split('-');
        var i=0;
        for (i=0; i<dateComp.length; i++) {
            dateComp[i] = parseInt(dateComp[i]);
        }

        if (dateComp.length > 3) {
            return false;
        }

        if (dateComp[1] > 12 || dateComp[1] <= 0) {
            return false;
        }

        if (dateComp[2] > 31 || dateComp[2] <= 0) {
            return false;
        }

        if (((dateComp[1] === 4) || (dateComp[1] === 6) || (dateComp[1] === 9) ||
            (dateComp[1] === 11)) && (dateComp[2] > 30)) {
            return false;
        }

        if (dateComp[1] ===2) {
            if (((dateComp[0] % 4 === 0) && (dateComp[0] % 100 !== 0)) || (dateComp[0] % 400 === 0)) {
                if (dateComp[2] > 29) {
                    return false;
                }
            } else {
                if (dateComp[2] > 28) {
                    return false;
                }
            }
        }

        return true;
    }

    $scope.isNumber = function(numString) {
        var regEx = /^[0-9]+$/;
        return String(numString).match(regEx) != null;
    }

    $scope.displayErrorModal = function(val, type) {
        if (type === 0) {
            if (!$scope.isValidDate(val)) {
                $scope.loading = false;
                $('.modal-body').html('<p> Please enter valid date in YYYY-MM-DD format </p>');
                $('#myModal').modal('show');
                return false;
            }
        } else {
            if (!$scope.isNumber(val)) {
                $scope.loading = false;
                $('.modal-body').html('<p> Please enter a valid number </p>');
                $('#myModal').modal('show');
                return false;
            }
        }
        return true;
    }

    $scope.getTags = function() {
        $("#filter-options").slideToggle("fast");
        $scope.loading = true;
        var since = "since:2016-06-01";
        var until = "&";
        var count = "limit=10";

        if ($scope.startdate !== undefined && $scope.startdate !== "") {
            if (!$scope.displayErrorModal($scope.startdate, 0)) {
                return;
            }
            since = "since:" + $scope.startdate;
        } else {
            $scope.startdate = "2016-06-01";
        }

        if ($scope.enddate !== undefined) {
            if (!$scope.displayErrorModal($scope.enddate, 0)) {
                return;
            }
            until = "%20until:" + $scope.enddate + "&";
        }

        if ($scope.count !== undefined && $scope.count !== "") {
            if (!$scope.displayErrorModal($scope.count, 1)) {
                return;
            }
            count = "limit=" + $scope.count;
        } else {
            $scope.count = 10;
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
