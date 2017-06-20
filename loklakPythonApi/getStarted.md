To use the loklak app, first an object of the loklak type needs to be created. Do the following to install the `pip` module and add it to your `requirements` for the application.

`pip install python-loklak-api`

To use the GUI client for API, install `wxPython` from [here](http://www.wxpython.org/download.php) and then install [Gooey](https://github.com/chriskiehl/Gooey) `pip` module. 

`pip install Gooey`

Then add 
``` 
from gooey import Gooey
@Gooey
```
before `def main():` in `/bin/loklak` 

Loklak once installed, can be used in the application as

`from loklak import Loklak`

To create a loklak object you can assign the `Loklak()` object to a variable.
`variable = Loklak()`

eg. `l = Loklak()`
This creates an objects whose backend loklak server is `http://loklak.org/`

If you want to set this API to use your own server, you can now define it by doing
`l = Loklak('http://192.168.192.5:9000/')` for example or pass a URL to it as
`l = Loklak('http://loklak-super-cluster.mybluemix.net/')

Note the trailing `/` is important and so is `http://`

### API Documentation

##### Status of the Loklak server
Using the object created above, `l.status()` returns a json of the status as follows

```json
{
  "system": {
    "assigned_memory": 2051014656,
    "used_memory": 1374976920,
    "available_memory": 676037736,
    "cores": 8,
    "threads": 97,
    "runtime": 734949,
    "time_to_restart": 85665051,
    "load_system_average": 18.19,
    "load_system_cpu": 0.24344589731081373,
    "load_process_cpu": 0.018707976134026073,
    "server_threads": 68
  },
  "index": {
    "mps": 176,
    "messages": {
      "size": 1195277012,
      "size_local": 1195277012,
      "size_backend": 0,
      "stats": {
        "name": "messages",
        "object_cache": {
          "update": 51188,
          "hit": 1796,
          "miss": 139470,
          "size": 10001,
          "maxsize": 10000
        },
        "exist_cache": {
          "update": 68419,
          "hit": 2450,
          "miss": 137020,
          "size": 68313,
          "maxsize": 3000000
        },
        "index": {
          "exist": 68634,
          "get": 0,
          "write": 51016
        }
      },
      "queue": {
        "size": 100000,
        "maxSize": 100000,
        "clients": 72
      }
    },
    "users": {
      "size": 65915082,
      "size_local": 65915082,
      "size_backend": 0,
      "stats": {
        "name": "users",
        "object_cache": {
          "update": 51827,
          "hit": 3756,
          "miss": 639,
          "size": 10000,
          "maxsize": 10000
        },
        "exist_cache": {
          "update": 56222,
          "hit": 0,
          "miss": 0,
          "size": 15933,
          "maxsize": 3000000
        },
        "index": {
          "exist": 0,
          "get": 639,
          "write": 51016
        }
      }
    },
    "queries": {
      "size": 4251,
      "stats": {
        "name": "queries",
        "object_cache": {
          "update": 452,
          "hit": 132,
          "miss": 3297,
          "size": 160,
          "maxsize": 10000
        },
        "exist_cache": {
          "update": 3703,
          "hit": 162,
          "miss": 2959,
          "size": 3002,
          "maxsize": 3000000
        },
        "index": {
          "exist": 2959,
          "get": 176,
          "write": 292
        }
      }
    },
    "accounts": {"size": 96},
    "user": {"size": 790137},
    "followers": {"size": 146},
    "following": {"size": 135}
  },
  "client_info": {
    "RemoteHost": "103.43.112.99",
    "IsLocalhost": "false",
    "request_header": {
      "Cookie": "__utma=156806566.949140694.1455798901.1455798901.1455798901.1; __utmc=156806566; __utmz=156806566.1455798901.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Upgrade-Insecure-Requests": "1",
      "X-Forwarded-Proto": "http",
      "Connection": "close",
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.103 Safari/537.36",
      "X-Forwarded-For": "103.43.112.99",
      "Host": "loklak.org",
      "Accept-Encoding": "gzip, deflate, sdch",
      "Accept-Language": "en-US,en;q=0.8",
      "X-Real-IP": "103.43.112.99"
    }
  }
}
```

##### Settings of the loklak server (strictly only for localhost clients)

Using the class method `settings()` to returns a json of the settings being used by the loklak server

##### Hello test - Check if the server is responding properly and is online

Using the object created above `l.hello()` returns a json response of the status of the server

When the server is online, the json should read
```json
{'status': 'ok'}
```

##### Peers - API To find out the loklak peers

Finding the list of loklak peers, use the object created above `l.peers()` which returns a json response containing all the peers connected to `loklak.org`

##### Users API

What this can do ?

- Fetch the details of one user
- Fetch the details of the user along with number of their followers and following
- Fetch only the followers / following of a particular user

Query Structure: `l.user(<username>,<followers count>,<following count>)`

`<username>` is a string, eg. `'loklak_app'`
`<followers count>` and `<following count>` is a numeric or a string or `None`

eg. `l.user('loklak_app')`
eg. `l.user('loklak_app',1000)` - 1000 followers of `loklak_app`
eg. `l.user('loklak_app',1000,1000)` - 1000 followers and following of `loklak_app`
eg. `l.user('loklak_app',None,1000)` - 1000 following of `loklak_app`

##### Accounts API
LOCALHOST ONLY, Loklak server running on port `localhost:9000`

To query the user account details of the data within the loklak server, use
`l.account('name')` where `'name'` is the screen_name of the user whose information is required.

To update the user details within the server, package a `json` object with the following parameters and other parameters which needs to be pushed to the server and use the `action=update` where `action` is the 2nd parameter of the `account()` api

`l.account('name','update','{ json object }')`

##### Search API

Public search API for the scraped tweets from Twitter.

Query structure: `search('querycontent','since date','until date', 'from a specific user', '# of tweets')`

eg. l.search('doctor who')

A search result in json looks as follows.
```json
{
  "search_metadata" : {
    "itemsPerPage" : "100",
    "count" : "100",
    "count_twitter_all" : 0,
    "count_twitter_new" : 100,
    "count_backend" : 0,
    "count_cache" : 97969,
    "hits" : 97969,
    "period" : 18422,
    "query" : "doctor who",
    "client" : "103.43.112.99",
    "time" : 4834,
    "servicereduction" : "false",
    "scraperInfo" : "http://kaskelix.de:9000,local"
  },
  "statuses" : [ {
    "created_at" : "2015-03-03T19:30:43.000Z",
    "screen_name" : "exanonym77s",
    "text" : "check #DoctorWho forums #TheDayOfTheDoctor #TheMaster @0rb1t3r http://www.thedoctorwhoforum.com/ https://pic.twitter.com/FvW6J9WMCw",
    "link" : "https://twitter.com/ronakpw/status/572841550834737152",
    "id_str" : "572841550834737152",
    "source_type" : "TWITTER",
    "provider_type" : "SCRAPED",
    "retweet_count" : 0,
    "favourites_count" : 0,
    "hosts" : [ "www.thedoctorwhoforum.com", "pic.twitter.com" ],
    "hosts_count" : 2,
    "links" : [ "http://www.thedoctorwhoforum.com/", "https://pic.twitter.com/FvW6J9WMCw" ],
    "links_count" : 2,
    "mentions" : [ "@0rb1t3r" ],
    "mentions_count" : 1,
    "hashtags" : [ "DoctorWho", "TheDayOfTheDoctor", "TheMaster" ],
    "hashtags_count" : 3,
    "without_l_len" : 62,
    "without_lu_len" : 62,
    "without_luh_len" : 21,
    "user" : {
      "name" : "Example User Anyone",
      "screen_name" : "exanonym77s",
      "profile_image_url_https" : "https://pbs.twimg.com/profile_images/567071565473267713/4hiyjKkF_bigger.jpeg",
      "appearance_first" : "2015-03-03T19:31:30.269Z",
      "appearance_latest" : "2015-03-03T19:31:30.269Z"
    }
  }, ...
  ]
}
```

Mentioning the Since and Until dates

eg. `l.search('sudheesh001', '2015-01-10', '2015-01-21')`

Which results in a json as follows
```json
{
 "search_metadata" : {
    "itemsPerPage" : "100",
    "count" : "100",
    "count_twitter_all" : 0,
    "count_twitter_new" : 100,
    "count_backend" : 0,
    "count_cache" : 97969,
    "hits" : 97969,
    "period" : 18422,
    "query" : "doctor who",
    "client" : "103.43.112.99",
    "time" : 4834,
    "servicereduction" : "false",
    "scraperInfo" : "http://kaskelix.de:9000,local"
  },
  "statuses" : [ {
    "timestamp" : "2016-05-11T16:53:46.615Z",
    "created_at" : "2016-05-11T16:52:59.000Z",
    "screen_name" : "BelleRinger1",
    "text" : "I would love to see http://www.cultbox.co.uk/?p=53662",
    "link" : "https://twitter.com/BelleRinger1/status/730440578031190016",
    "id_str" : "730440578031190016",
    "source_type" : "TWITTER",
    "provider_type" : "SCRAPED",
    "retweet_count" : 0,
    "favourites_count" : 0,
    "images" : [ ],
    "images_count" : 0,
    "audio" : [ ],
    "audio_count" : 0,
    "videos" : [ ],
    "videos_count" : 0,
    "place_name" : "",
    "place_id" : "",
    "place_context" : "ABOUT",
    "hosts" : [ "www.cultbox.co.uk" ],
    "hosts_count" : 1,
    "links" : [ "http://www.cultbox.co.uk/?p=53662" ],
    "links_count" : 1,
    "mentions" : [ ],
    "mentions_count" : 0,
    "hashtags" : [ ],
    "hashtags_count" : 0,
    "classifier_language" : "english",
    "classifier_language_probability" : 6.95489E-8,
    "without_l_len" : 19,
    "without_lu_len" : 19,
    "without_luh_len" : 19,
    "user" : {
      "screen_name" : "BelleRinger1",
      "user_id" : "2497345790",
      "name" : "Belle Gaudreau",
      "profile_image_url_https" : "https://pbs.twimg.com/profile_images/723262970805907456/RbMnyEqs_bigger.jpg",
      "appearance_first" : "2016-05-11T16:53:46.615Z",
      "appearance_latest" : "2016-05-11T16:53:46.615Z"
    }
  }, ...
  ]
}
```

Valid parameters for `since` and `until` can also be `None` or any `YMD` date format. Looking towards the future releases to resolve this to any date format.

The `from a specific user` parameter makes sure that the results obtained for the given query are only from a specific user.

`l.search('doctor who', '2015-01-10', '2015-01-21','0rb1t3r')`

The `# of tweets` parameter is how many tweets will be returned.

`l.search('avengers', None, None, 'Iron_Man', 3)`

##### Aggregations API

##### GeoLocation API

Loklak allows you to fetch required information about a country or city.

eg. `l.geocode(['Barcelona'])`
eg. `l.geocode(['place1','place2'])`