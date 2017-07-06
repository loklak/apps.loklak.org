var app = angular.module('multiLinePlotterApp', []);

app.controller("app", function ($scope, $http) {
    $scope.error = null;
    $scope.isError = false;
    $scope.data = [];
    $scope.ykeys = [];
    $scope.labels = [];
    $scope.plot = null;
    $scope.queryRecords = [];
    $scope.statuses = [];
    $scope.graphLoading = false;
    $scope.tweetsLoading = false;
    $scope.currentTweet = null;
    $scope.modalHeading = null;
    $scope.tweetStat = [];
    $scope.selectedTweetStat = {};

    /* Function to check for error in inputs and call loklak api
       with the user provided query
    */
    $scope.search  = function() {
        $scope.isError = false;
        if ($scope.tweet === undefined || $scope.tweet === "") {
            $scope.isError = true;
            $scope.error = "Please enter a valid query"
            return;
        }
        if ($scope.queryRecords.indexOf($scope.tweet) !== -1) {
            $scope.isError = true;
            $scope.error = "Graph has already been plotted for this query"
            return;
        }
        $scope.graphLoading = true;
        $http.jsonp('http://api.loklak.org/api/search.json?callback=JSON_CALLBACK',
            {params: {q: $scope.tweet, source: 'cache', count: '0', fields: 'created_at'}})
                .then(function (response) {
                    $scope.getData(response.data.aggregations.created_at);
                    $scope.plotGraph();
                    $scope.queryRecords.push($scope.tweet);
                    $scope.currentTweet = $scope.tweet;
                    $scope.tweet = "";
                });
    }

    /* Function to create list of data objects to be fed to
       morris.js
    */
    $scope.getData = function(aggregations) {
        var value = $scope.tweet;
        /*for (var date in aggregations) {
            $scope.data.push({day: date, [value]: aggregations[date]});
        }*/
        for (date in aggregations) {
            var present = false;
            for (var i = 0; i < $scope.data.length; i++) {
                var item = $scope.data[i];
                if (item['day'] === date) {
                    item[[value]] = aggregations[date];
                    $scope.data[i] = item
                    present = true;
                    break;
                }
            }
            if (!present) {
                $scope.data.push({day: date, [value]: aggregations[date]});
            }
        }

        $scope.ykeys.push($scope.tweet);
        $scope.labels.push($scope.tweet);

        var maxStat = $scope.getMaxTweetNumAndDate(aggregations);
        var avg = $scope.getAverageTweetNum(aggregations);

        $scope.tweetStat.push({
            tweet: $scope.tweet,
            maxTweetCount: maxStat.count,
            maxTweetOn: maxStat.date,
            averageTweetsPerDay: avg,
            aggregationsLength: Object.keys(aggregations).length
        });

        console.log($scope.tweetStat);

    }

    $scope.getMaxTweetNumAndDate = function(aggregations) {
        var maxTweetDate = null;
        var maxTweetNum = -1;

        for (date in aggregations) {
            if (aggregations[date] > maxTweetNum) {
                maxTweetNum = aggregations[date];
                maxTweetDate = date;
            }
        }

        return {date: maxTweetDate, count: maxTweetNum};
    }

    $scope.getAverageTweetNum = function(aggregations) {
        var avg = 0;
        var sum = 0;

        for (date in aggregations) {
            sum += aggregations[date];
        }

        return parseInt(sum / Object.keys(aggregations).length);
    }

    $scope.plotGraph = function() {
        if ($scope.plot === null) {
            $scope.plot = new Morris.Line({
                element: 'graph',
                data: $scope.data,
                xkey: 'day',
                ykeys: $scope.ykeys,
                labels: $scope.labels
            });
        } else {
            $scope.plot.options.ykeys = $scope.ykeys;
            $scope.plot.options.labels = $scope.labels;
            $scope.plot.setData($scope.data);
        }
        $scope.graphLoading = false;
    }

    // Function to remove a series
    $scope.remove = function(record) {
        $scope.queryRecords = $scope.queryRecords.filter(function(e) {
            return e !== record });

        $scope.data.forEach(function(item) {
            delete item[record];
        });

        $scope.data = $scope.data.filter(function(item) {
            return Object.keys(item).length !== 1;
        });

        $scope.ykeys = $scope.ykeys.filter(function(item) {
            return item !== record;
        });

        $scope.labels = $scope.labels.filter(function(item) {
            return item !== record;
        });

        $scope.tweetStat = $scope.tweetStat.filter(function(item) {
            return item.tweet !== record;
        });

        $scope.plotGraph();
    }

    // Function to show all the tweets containing the given query word
    $scope.showInfo = function(record) {
        $scope.modalHeading = record;
        $scope.tweetsLoading = true;
        $scope.statuses = [];

        var tweetData = $scope.tweetStat.filter(function(item) {
            return item.tweet === record;
        });

        $scope.selectedTweetStat = tweetData[0];
        $('#tweetInfo').modal('show');
        $http.jsonp("http://api.loklak.org/api/search.json?callback=JSON_CALLBACK", {params: {q: record}})
                .then(function(response) {
                    $scope.statuses = response.data.statuses;
                    $scope.tweetsLoading = false;
                });
    }

    // Function to reset the app
    $scope.reset = function() {
        $scope.queryRecords = [];
        $scope.data = [];
        $(".plot-data").html("");
        $scope.plot = null;
        $scope.ykeys = [];
        $scope.labels = [];
        $scope.isError = false;
        $scope.error = null;
        $scope.tweetStat = [];
    }
});
