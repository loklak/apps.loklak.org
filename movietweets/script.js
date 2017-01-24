function searchTweets() { // Query the loklak.org API
  var film = document.getElementById('film').value;

  var url = 'http://loklak.org/api/search.json?q=' + film + ' film&minified=true&callback=updateResults';

  document.body.removeChild(document.getElementById('loklakAPICall'));  // Delete old script calls

  // Creation of the new script, to support JSONP
  var script = document.createElement('script');
  script.id = 'loklakAPICall';
  script.src = url;
  document.body.appendChild(script);

  document.getElementById('loading').style.display = 'block'; // Make loading box visible
}

function updateResults(input) { // Function called to interpret the results from the API, through JSONP
  var statuses = input.statuses;

  document.getElementById('resultsBox').style.display = 'block';

  var tweetsBox = document.getElementById('tweets');

  while(tweetsBox.childElementCount > 0) { // Empty the tweets box
    tweetsBox.removeChild(tweetsBox.lastChild);
  }

  var media, mBody;

  // Show amount of tweets in the alert
  document.getElementById('tweetCount').innerHTML = "Found " + statuses.length + " tweets";

  for(i in statuses) {
    // Clone the tweet format, from the <template>
    current = document.getElementsByTagName('template')[0].content.children[0].cloneNode(true);

    media = current.getElementsByClassName('media')[0];
    // Set user's picture
    media.getElementsByClassName('media-object')[0].src = statuses[i].user.profile_image_url_https;

    mBody = media.getElementsByClassName('media-body')[0];
    // Set username and tweet's date
    mBody.getElementsByTagName('h4')[0].innerHTML = '<a style="color: black;" href="https://twitter.com' +
      statuses[i].screen_name + '/">@' + statuses[i].screen_name + '</a> <small><a style="color: black;" href="' +
      statuses[i].link + '">' + new Date(statuses[i].created_at).toUTCString() + '</a></small>';
    mBody.getElementsByTagName('span')[0].innerHTML = statuses[i].text; // Set tweet's content

    tweetsBox.appendChild(current); // Add the complete tweet to the list
  }

  document.getElementById('loading').style.display = 'none';  // Hide the loading progress bar
}
