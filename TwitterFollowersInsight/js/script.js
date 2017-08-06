var app = angular.module('TweetSearch', []);
app.controller('Controller', ['$scope', '$http', '$sce', function($scope, $http, $sce) {

    $scope.error = null;

    $scope.showError = function() {
        $(".snackbar").addClass("show");
        setTimeout(function(){ $(".snackbar").removeClass("show") }, 3000);
    }

    $scope.Search = function(query) {
        $scope.spinner = true;
        $scope.error = null;
        if (query !== undefined)
            $scope.query = query;

        var QueryCommand = 'http://api.loklak.org/api/user.json?callback=JSON_CALLBACK&screen_name=' + $scope.query +
            '&followers=1000&following=1000';

        console.log($scope.query);
        if ($scope.query === '' || $scope.query === undefined) {
            $scope.spinner = false;
            $scope.error = "Please enter a valid Username";
            $scope.showError();
            return;
        }

        $http.jsonp(String(QueryCommand)).success(function(response) {

            var data = response;
            var followers = data.topology.followers;
            var following = data.topology.following;
            var followerslist = [];
            var followinglist = [];
            var followers_loc = [];
            var following_loc = [];

            for (var i = 0; i < followers.length; i++) {
                user = followers[i].screen_name;
                name = followers[i].name;
                followers_count = followers[i].followers_count;
                pic = followers[i].profile_image_url;
                followers_loc.push(followers[i].location_country);
                followerslist.push([user, pic, name, followers_count]);
            }

            for (var i = 0; i < following.length; i++) {
                user = following[i].screen_name;
                name = following[i].name;
                followers_count = following[i].followers_count;
                pic = following[i].profile_image_url;
                following_loc.push(following[i].location_country);
                followinglist.push([user, pic, name, followers_count]);
            }

            $scope.followersStatus = followerslist;
            $scope.followingStatus = followinglist;
            $scope.followersCount = data.user.followers_count;
            $scope.followingCount = data.user.friends_count;

            followers_loc.sort();
            var current = null;
            var loc_count = 0;
            var loc_name = [];
            var key;
            var y;
            for (var i = 0; i <= followers_loc.length; i++) {
                var followersObj =  {};
                if (followers_loc[i] != current) {
                    if (loc_count > 0) {
                        followersObj['name'] = current;
                        followersObj['y'] = loc_count;
                        loc_name.push(followersObj);
                    }
                    current = followers_loc[i];
                    loc_count = 1;
                } else {
                    loc_count++;
                }
            }

            following_loc.sort();
            var loc_names = [];
            var loc_count = 0;

            for (var i = 0; i <= following_loc.length; i++) {
                var followingObj =  {};
                if (following_loc[i] != current) {
                    if (loc_count > 0) {
                        followingObj['name'] = current;
                        followingObj['y'] = loc_count;
                        loc_names.push(followingObj);
                    }
                    current = following_loc[i];
                    loc_count = 1;
                } else {
                    loc_count++;
                }
            }

            $scope.locations = loc_name;
            $scope.locationsFollow = loc_names;

            $('.pie-chart').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: "Followers"
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
                    name: "Followers",
                    colorByPoint: true,
                    data: $scope.locations
                }]
            });

            $('.pie-chart2').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: "Following"
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
                    name: "Following",
                    colorByPoint: true,
                    data: $scope.locationsFollow
                }]
            });
        });
    }

    $scope.limitFollowing = 10;
    $scope.limitFollowers = 10;

    $scope.loadMoreFollowing = function() {
      var incremented = $scope.limitFollowing + 10;
      $scope.limitFollowing = incremented > $scope.followingCount ? $scope.followingCount : incremented;
    };

    $scope.loadMoreFollowers = function() {
      var incremented = $scope.limitFollowers + 10;
      $scope.limitFollowers = incremented > $scope.followersCount ? $scope.followersCount : incremented;
    };

    $scope.spinner = false;
}]);
