//Loading the dropdown
$(function() {
  // Initializes and creates emoji set from sprite sheet
  window.emojiPicker = new EmojiPicker({
    emojiable_selector: '[data-emojiable=true]',
    assetsPath: './lib/img/',
    popupButtonClasses: 'fa fa-smile-o'
  });
  // Finds all elements with `emojiable_selector` and converts them to rich emoji input fields
  // You may want to delay this step if you have dynamically created input fields that appear later in the loading process
  // It can be called as many times as necessary; previously converted input fields will not be converted again
  window.emojiPicker.discover();
});

      // Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-49610253-3', 'auto');
ga('send', 'pageview');

function validateQuery() {
    var query = document.getElementById('searchField').value;
    $.getJSON( "emoji.json", function(tweets) {
        var flag = 0;
        for (var i = 0; i < tweets.data.length; i++) {
            if (tweets.data[i].indexOf(query) !== -1) {
                flag = 1;
                break;
            }
        }
        if (flag == 1) {
             //emoji found plotting map
             updateMap();
         }
         else {
             //emoji not found
             alert("Enter an emoticon/emoji to see results");
         }
    });
}

// Event listeners for updating the map
document.getElementById('searchButton').addEventListener('click', validateQuery);

document.getElementById('searchField').addEventListener('keyup', function(e) {
  if (e.keyCode === 13) {
    validateQuery();
  }
});
