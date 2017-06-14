window.loklakFetcher = (function () {
    var script = null;

    var loklakFetcher = {
        getTweets: function (query, callback) {
            if(typeof options === 'function') { // A callback has been provided as 2nd
                                            // argument (no options)
                options = {};
            } else if(callback === undefined) { // No callback has been provided, even
                                            // as 2nd argument
                throw new Error('[LOKLAK-FETCHER] No callback provided');
            }

            var settings = [ 'source', 'fields', 'minified' ];
        // Field names for all the possible parameters
            var defaults = [ 'all', '', true ];  // Default values

        // Check if no options have been provided
            if(typeof options === 'undefined') {
                var options = {}; // Create 'options' to avoid ReferenceErrors later
            }

        // Write unset options as their default
            for(index in settings) {
                if(options[settings[index]] === undefined) {
                    options[settings[index]] = defaults[index];
                }
            }

        // Create the URL with all the parameters
            var url = 'http://loklak.org/api/search.json' +
                '?callback=loklakFetcher.handleData' +
                '&q=' + query +
                '&source=' + options.source +
                '&fields=' + options.fields +
                '&minified=' + options.minified;

        // If the script element for JSONP already exists, remove it
            if(script !== null) {
                document.head.removeChild(script);
            }

            this.handleData = function (data) {
                callback(data);
            };

        // Create the script tag for JSONP
            script = document.createElement("script");
            script.src = url;
            document.head.appendChild(script);
        }
    };

    return loklakFetcher;
}());
