var app = angular.module("newyear", []);
app.controller("TweetsController", ["$scope", "$http", function ($scope, $http) {
    $scope.d = new Date()
    $scope.n = $scope.d.getTimezoneOffset();
    $scope.queryUrl = "http://api.loklak.org/api/search.json?timezoneOffset="+
                      $scope.n+"&callback=JSON_CALLBACK&q=%23";
    $scope.queryTags = ["happynewyear", "newyear", "2017", "hello2017", "happy2017"];
    $scope.tweets = [];
    $scope.loadTweets = function () {
        for (var QIndex in $scope.queryTags){
            var queryTag = $scope.queryTags[QIndex];
            var url = $scope.queryUrl+queryTag+"#"+queryTag;
            console.log(url)
            $http.jsonp(url).success(function (data) {
                console.log("success");
                for (var SIndex in data.statuses){
                    var status = data.statuses[SIndex];
                    if ($scope.tweets.indexOf(status) == -1) {
                        status.text = status.text.replace(/<span class=\"twitter-hashflag-container\">/g, '');
                        $scope.tweets.push(status);
                    }
                }
            }).error(function (data, status, header, config) {
                console.log("request failed");
            });
        }
    }
    $scope.loadTweets();
}])
