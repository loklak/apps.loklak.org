var app = angular.module('loklakWordCloud', []);

app.controller("app", function ($scope, $http) {
    $scope.filteredWords = [];
    $scope.wordFreq = {};
    $scope.wordCloudData = [];
    $scope.wordCloud = null;
    $scope.hashtags = true;
    $scope.mentions = true;
    $scope.tweetbody = true;
    $scope.allSelected = true;
    $scope.error = null;
    $scope.isLoading = false;
    $scope.download = false;
    $scope.imageType = "jpeg";
    $scope.imageExt = "jpg";

    $(".date").datepicker();
    $(".date").datepicker( "option", "dateFormat", "yy-mm-dd");

    $scope.showError = function() {
        $(".snackbar").addClass("show");
        setTimeout(function(){ $(".snackbar").removeClass("show") }, 3000);
    }

    $scope.changeType = function(type, ext) {
        $scope.imageType = type;
        $scope.imageExt = ext;
    }

    $scope.search = function () {
        $scope.wordFreq = [];
        $scope.wordCloudData = [];
        $scope.filteredWords = [];
        $scope.wordFreq = {};
        $scope.error = null;

        if ($scope.tweet === "" || $scope.tweet === undefined) {
            $scope.error = "Please enter a valid query word";
            $scope.showError();
            return;
        }
        if ($scope.isLoading === true) {
            $scope.error = "Previous search not completed. Please wait...";
            $scope.showError();
            return;
        }
        if (!navigator.onLine) {
            $scope.error = "You are currently offline. Please check your internet connection!";
            $scope.showError();
            return;
        }
        var query = $scope.tweet.startsWith("#") ? $scope.tweet.substring(1) : $scope.tweet;

        var queryString = "q=" + query;
        var sinceDate = $(".start-date").val();
        var endDate = $(".end-date").val();

        if ((sinceDate !== "" && sinceDate !== undefined) && (endDate !== "" && endDate !== undefined)) {
            var date1 = new Date(sinceDate);
            var date2 = new Date(endDate);
            if (date1 > date2) {
                $scope.error = "To date should be after From date";
                $scope.showError();
                return;
            }
        }

        if (sinceDate !== undefined && sinceDate !== "" ) {
            queryString += "%20since:" + sinceDate;
        }
        if (endDate !== undefined && endDate !== "") {
            queryString += "%20until:" + endDate;
        }

        var url = "http://api.loklak.org/api/search.json?callback=JSON_CALLBACK&count=100&" + queryString;
        $scope.isLoading = true;
        $http.jsonp(url)
            .then(function (response) {
                $scope.createWordCloudData(response.data.statuses);
                $scope.tweet = "";
                $scope.isLoading = false;
                $scope.download = true;
            });
    }
    $scope.createWordCloudData = function(data) {
        for (var i = 0; i < data.length; i++) {
            var tweet = data[i];

            // use multiple delimiters for splitting
            if ($scope.tweetbody) {
                var tweetWords = tweet.text.split(/[\s,;]+/);
                for (var j = 0; j < tweetWords.length; j++) {
                    var word = tweetWords[j];
                    word = word.trim();
                    if (word === null) {
                        continue;
                    }
                    if (word.startsWith("'") || word.startsWith('"') || word.startsWith("(") || word.startsWith("[")) {
                        word = word.substring(1);
                    }
                    if (word.endsWith("'") || word.endsWith('"') || word.endsWith(")") || word.endsWith("]") ||
                        word.endsWith("?") || word.endsWith(".")) {
                        word = word.substring(0, word.length - 1);
                    }
                    if ((word.indexOf("<")) !== -1 || (word.indexOf(">") !== -1)) {
                        continue;
                    }

                    // discard words which contain only digits and nothing else
                    if (/^[0-9]+([.,][0-9]+)?$/.test(word)) {
                        continue;
                    }
                    word = word.trim();
                    if (stopwords.indexOf(word.toLowerCase()) !== -1) {
                        continue;
                    }
                    if (word.startsWith("#") || word.startsWith("@")) {
                        continue;
                    }
                    if (word.startsWith("http")) {
                        continue;
                    }

                    /* following two conditions handles cases where there is no delimiter between
                       a normal word and a hashtag or mention. We choose only the first word since
                       hashtags and mentions are handled separately
                     */
                    if (word.indexOf("#") !== -1) {
                        word = word.split("#")[0];
                    }
                    if (word.indexOf("@") !== -1) {
                        word = word.split("@")[0];
                    }
                    $scope.filteredWords.push(word);
                }
            }

            if ($scope.hashtags) {
                tweet.hashtags.forEach(function (hashtag) {
                    $scope.filteredWords.push("#" + hashtag);
                });
            }

            if ($scope.mentions) {
                tweet.mentions.forEach(function (mention) {
                    $scope.filteredWords.push("@" + mention);
                });
            }
        }

        $scope.filteredWords.forEach(function (data) {
            data = data.toLowerCase();
            if ($scope.wordFreq[data] === undefined) {
                $scope.wordFreq[data] = 1;
            } else {
                $scope.wordFreq[data] += 1;
            }
        });

        for (var word in $scope.wordFreq) {
            $scope.wordCloudData.push({
                text: word,
                weight: $scope.wordFreq[word],
                handlers: {
                    click: function(e) {
                        $scope.tweet = e.target.textContent;
                        $scope.search();
                    }
                }
            });
        }

        $scope.generateWordCloud();
    }

    $scope.generateWordCloud = function() {
        if ($scope.wordCloud === null) {
            $scope.wordCloud = $('.wordcloud').jQCloud($scope.wordCloudData, {
                colors: ["#D50000", "#FF5722", "#FF9800", "#4CAF50", "#8BC34A", "#4DB6AC", "#7986CB", "#5C6BC0", "#64B5F6"],
                fontSize: {
                    from: 0.06,
                    to: 0.01
                },
                autoResize: true
            });
        } else {
            $scope.wordCloud = $(".wordcloud").jQCloud('update', $scope.wordCloudData);
        }
    }

    $scope.selectAll = function() {
        $scope.allSelected = !$scope.allSelected;

        if($scope.allSelected) {
            $scope.hashtags = true;
            $scope.mentions = true;
            $scope.tweetbody = true;
        } else {
            $scope.hashtags = false;
            $scope.mentions = false;
            $scope.tweetbody = false;
        }
    }

    $scope.export = function() {
        html2canvas($(".wordcloud"), {
          onrendered: function(canvas) {
            var imgageData = canvas.toDataURL("image/" + $scope.imageType);
            var regex = /^data:image\/jpeg/;
            if ($scope.imageType === "png") {
                regex = /^data:image\/png/;
            }
            var newData = imgageData.replace(regex, "data:application/octet-stream");
            canvas.style.width = "80%";
            $(".wordcloud-canvas").html(canvas);
            $(".save-btn").attr("download", "Wordcloud." + $scope.imageExt).attr("href", newData);
            $("#preview").modal('show');
          },
          background: "#ffffff"
        });
    }
});
