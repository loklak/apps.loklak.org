var app = angular.module('appListApp', ['loklak', 'ngTouch']);

app.controller("app_list", function ($scope, $http) {
    $scope.apps = [];
    $scope.categoryKeys = [];
    var suggestionList = [];
    $scope.category = null;
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
});

app.filter('nospace', function () {
    return function (value) {
        return (!value) ? '' : value.replace(/ /g, '');
    };
});
