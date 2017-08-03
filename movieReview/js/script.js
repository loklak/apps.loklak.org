//Script
var app = angular.module('TweetSearch', []);
app.controller('Controller', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
    $scope.Search = function() {
        $scope.spinner=true;
        var QueryCommand = 'http://35.193.155.174/api/search.json?callback=JSON_CALLBACK&q=' + $scope.query + ' movie';
        $http.jsonp(String(QueryCommand)).success(function(response) {
            var data = response;
            var statuses = data.statuses;
            var users = [];
            var emotion = [];
            var text = [];
            var pic;
            var count = [];
            var emotions_array = [];
            for (var i=0; i<statuses.length; i++) {
                if(statuses[i].classifier_emotion){
                    user = statuses[i].screen_name;
                    emotion = statuses[i].classifier_emotion;
                    emotions_array.push(emotion);
                    text = statuses[i].text;
                    pic = statuses[i].user.profile_image_url_https;
                    users.push([user, emotion, text, pic]);
                }
            }
            emotions_array.sort();
            var current = null;
            var em_count = 0;
            var emotions_name = [];
            var key;
            var y;
            for (var i = 0; i <= emotions_array.length; i++) {
                var emotionsObj =  {};
                if (emotions_array[i] != current) {
                    if (em_count > 0) {
                        emotionsObj['name'] = current;
                        emotionsObj['y'] = em_count;
                        emotions_name.push(emotionsObj);
                    }
                    current = emotions_array[i];
                    em_count = 1;
                } else {
                    em_count++;
                }
            }
            $scope.tweetsStatus = users;
            $scope.emotions = emotions_name;
            var chart = null;
            $('.pie-chart').highcharts({
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45
                    }
                },
                title: {
                    text: $scope.query
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        innerSize: 100,
                        depth: 45
                    }
                },
                series: [{
                    name: $scope.query,
                    colorByPoint: true,
                    data: $scope.emotions
                }]
            });
        });
    }
    $scope.spinner = false;
}]);
