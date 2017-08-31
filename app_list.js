var app = angular.module('appListApp', ['loklak', 'ngTouch']);

app.controller("app_list", function ($scope, $http) {
    $scope.apps = [];
    $scope.categoryKeys = [];
    var suggestionList = [];
    $scope.category = null;
    $scope.notFound = false;
    var addr = window.location + "";
    if (addr.indexOf("#") !== -1) {
        $scope.category = addr.split('#')[1];
        $('#categoryName')[0].innerHTML = $scope.category.match(/[A-Z][a-z]+/g).join(" ");
        $scope.category = $scope.category.replace(/ /g, '');
        $scope.category = $scope.category === "All" ? null : $scope.category;
    }
    $http.get('apps.json').success(function (data) {
        $scope.categoryKeys = data.categories;
        $scope.apps = data.apps;
        $scope.categoryKeys.unshift({"name": "All","image":"all.png","style" : {"background-color": "#ED3B3B"}});
        for (i = 0; i < $scope.apps.length; i++) {
            suggestionList.push($scope.apps[i].name);
            suggestionList.push($scope.apps[i].headline);
            suggestionList.push($scope.apps[i].author.name);
        }
        var searchEngine = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace,
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: suggestionList
        });

        // Initializing the typeahead

        $('.typeahead').typeahead({
            hint: true,
            highlight: true, /* Enable substring highlighting */
            minLength: 1 /* Specify minimum characters required for showing result */
            },
            {
                name: 'apps',
                source: searchEngine
        });
    });

    $scope.categoryFilter = function (event) {
        $scope.category = null;
        item = event.target.id;
        if (item != 'All') {
            itemName = item.match(/[A-Z][a-z]+/g);
            $('#categoryName')[0].innerHTML = itemName.join(" ");
            $('div.span2').hide();
            qConstruct = 'div.span2#'+item;
            $(qConstruct).show();
            event.stopImmediatePropagation();
        }
        else {
            $('#categoryName')[0].innerHTML = 'All apps';
            $('div.span2').show();
        }
    }

    $scope.checkApp = function() {
        for (var i = 0; i < $scope.apps.length; i++) {
            var app = $scope.apps[i];
            var searchTerm = $scope.searchTerm;
            if (
               ((app.name.toUpperCase().indexOf(searchTerm.toUpperCase())!==-1) ||
               (app.headline.toUpperCase().indexOf(searchTerm.toUpperCase())!==-1) ||
               (app.author.name.toUpperCase().indexOf(searchTerm.toUpperCase())!==-1))) {
                $scope.notFound = false;
                $(".not-found").html("");
                return;
            }
        }
        $scope.notFound = true;
        $(".not-found").html("No matching app found!");
    }
});

app.filter('nospace', function () {
    return function (value) {
        return (!value) ? '' : value.replace(/ /g, '');
    };
});
