var app = angular.module("newyear", []);
app.controller("TweetsController", ["$scope", "$http", function($scope, $http) {
    $scope.queryUrl = "/api/search.json?q=%23";
    $scope.queryTags = ["happynewyear", "newyear", "2017", "hello2017", "happy2017"];
    $scope.tweets = [];
    $scope.loadTweets = function() {
        for (var QIndex in $scope.queryTags) {
            var queryTag = $scope.queryTags[QIndex];
            $http.get($scope.queryUrl+queryTag+"#"+queryTag).then(function(response) {
                for (var SIndex in response.data.statuses){
                    var status = response.data.statuses[SIndex];
                    if ($scope.tweets.indexOf(status) == -1) {
                        status.text = status.text.replace(/<span class=\"twitter-hashflag-container\">/g, '');
                        $scope.tweets.push(status);
                    }
                }
            });
        }
    }
    $scope.loadTweets();
}])
