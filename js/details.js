var app = angular.module('details', []);

app.controller("detailsApp", function ($scope, $http) {
    $scope.temp = "haha";
    $scope.categories = null;
    $scope.apps = null;
    $scope.appName = null;
    $scope.similarApps = [];
    $scope.selectedApp = null;
    $scope.appData = null;
    $scope.isOthers = false;
    var converter = new showdown.Converter();
    var addr = window.location + "";
    if (addr.indexOf("?") !== -1) {
        $scope.appName = addr.split("?")[1].split("=")[1];
    }

    $http.get('apps.json').success(function (data) {
        $scope.categories = data.categories;
        $scope.apps = data.apps;
        $scope.categories.unshift({"name": "All","image":"all.png","style" :
            {"background-color": "#ED3B3B"}});
        $scope.getSelectedApp();
        $scope.getSimilarApps();
    });

    $http.get($scope.appName + "/app.json").success(function (data) {
        $scope.appData = data;
        $scope.setupCarousel();
        $scope.getStarted();
        $scope.appUse();
        $scope.others();
    });

    $scope.getStarted = function () {
        $http.get($scope.appName + "/" +$scope.appData.getStarted).success(function (data) {
            $(document).ready(function () {
                $(".get-started-md").html(converter.makeHtml(data));
            });
        });
    }

    $scope.appUse = function () {
        $http.get($scope.appName + "/" +$scope.appData.appUse).success(function (data) {
            $(document).ready(function () {
                $(".app-use-md").html(converter.makeHtml(data));
            });
        });
    }

    $scope.others = function () {
        if ($scope.appData.others === "" || $scope.appData.others === undefined) {
            return;
        }
        $scope.isOthers = true;
        $http.get($scope.appName + "/" +$scope.appData.others).success(function (data) {
            $(document).ready(function () {
                $(".others-md").html(converter.makeHtml(data));
            });
        });
    }

    $scope.setupCarousel = function () {
        var items = "";
        var active = "";
        for (var i = 0; i < $scope.appData.appImages.length; i++) {
            var image = $scope.appData.appImages[i];
            active = i == 0 ? " active" : "";
            var item = "";
            item = "<div class='item item-image" + active + "'><img src='../" + $scope.selectedApp.name +
                "/" + image + "'></div>";
            items += item;
        }
        $(document).ready(function () {
            $(".carousel-inner").html(items);
        });
    }

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
