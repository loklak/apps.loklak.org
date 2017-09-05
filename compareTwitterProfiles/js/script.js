var app = angular.module('TweetSearch', []);
app.controller('Controller', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
    $scope.Search = function () {
        var userQueryCommand = 'http://api.loklak.org/api/user.json?' +
                               'callback=JSON_CALLBACK&screen_name=' +
                                $scope.query;

        var userQueryCommand1 = 'http://api.loklak.org/api/user.json?' +
                                'callback=JSON_CALLBACK&screen_name=' +
                                $scope.query1;

        $http.jsonp(String(userQueryCommand)).success(function (response) {
            $scope.userData = response.user;
        });

        $http.jsonp(String(userQueryCommand1)).success(function (response) {
            $scope.userData1 = response.user;
        });
    }
}]);
