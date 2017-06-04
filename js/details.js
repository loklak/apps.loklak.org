var app = angular.module('details', []);

app.controller("detailsApp", function ($scope, $http) {
    $scope.temp = "haha";
    $scope.categories = null;
    $scope.apps = null;
    $scope.appName = null;
    $scope.similarApps = [];
    $scope.selectedApp = null;
    var addr = window.location + "";
    if (addr.indexOf("?") !== -1) {
        $scope.appName = addr.split("?")[1].split("=")[1];
    }

    $http.get('apps.json').success(function (data) {
        $scope.categories = data.categories;
        $scope.apps = data.apps;
        $scope.categories.unshift({"name": "All","image":"all.png","style" :
            {"background-color": "#ED3B3B"}});
        console.log($scope.categories);
        console.log($scope.apps);
        $scope.getSelectedApp();
        $scope.getSimilarApps();
        console.log($scope.similarApps);
    });

    $scope.getSelectedApp = function() {
        for (var i = 0; i < $scope.apps.length; i++) {
            if ($scope.apps[i].name === $scope.appName) {
                $scope.selectedApp = $scope.apps[i];
                break;
            }
        }
    }

    $scope.getSimilarApps = function() {
        $scope.apps.forEach(function (item) {
            if (item.applicationCategory === $scope.selectedApp.applicationCategory
                && item.name !== $scope.selectedApp.name) {
                $scope.similarApps.push(item);
            }
        });
    }
});

app.filter('nospace', function () {
    return function (value) {
        return (!value) ? '' : value.replace(/ /g, '');
    };
});
