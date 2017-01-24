(function () {
    angular.module('myApp')

    .factory('dataService',
    function ($http, $moment) {

        return {
            getTweets: getTweets
        }

        function getTweets(queryType, queryTerm, dateFrom, dateTo, count)
        {

            // user's tweets latest first
            var defaultUri = "http://api.loklak.org/api/search.json?\
                              callback=JSON_CALLBACK&q=loklak";
            var uri = "";
            var qCount = "&count=" + count;
            if(queryType === "search") {
                console.log(queryTerm);
                if(typeof(dateFrom) !== "undefined" || typeof(dateTo) !== "undefined") {
                    var dateFromF = $moment(dateFrom).format('YYYY-MM-DD') || "";
                    var dateToF = $moment(dateTo).format('YYYY-MM-DD') || "";
                    uri = "http://api.loklak.org/api/search.json?\
                           callback=JSON_CALLBACK&q=" + queryTerm +
                           "+since:" + dateFromF + "+until:" + dateToF;
                    console.log(uri);

                } else {
                    uri = "http://api.loklak.org/api/search.json?\
                           callback=JSON_CALLBACK&q=" + queryTerm;
                }
            } else {
                uri = defaultUri;
            }
            uri += qCount;
            console.log(uri);

            var promise = $http.jsonp(String(uri))
            .then(searchCompleted)
            .catch(searchFailed);

            function searchCompleted(response)
            {
                if (typeof response.data === 'object') {
                    console.log(response);
                    // return response.data.queries;
                    return response.data.statuses;
                } else {
                    // invalid response
                    console.log("Failed");
                }
            }

            function searchFailed(error)
            {
                console.log(error);
            }

            return promise;
        }
    })
}());
