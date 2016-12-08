# loklak
[![Build Status](https://travis-ci.org/loklak/loklak_server.svg?branch=master)](https://travis-ci.org/fossasia/apps.loklak.org)
[![Join the chat at https://gitter.im/loklak/loklak](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/loklak/loklak)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/fossasia/apps.loklak.org.svg)](http://isitmaintained.com/project/fossasia/apps.loklak.org "Percentage of issues still open")
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/fossasia/apps.loklak.org.svg)](http://isitmaintained.com/project/fossasia/apps.loklak.org "Average time to resolve an issue")
[![Twitter](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Wow Check Loklak on @gitHub @lklknt: https://github.com/fossasia/apps.loklak.org &url=%5Bobject%20Object%5D)
[![Twitter Follow](https://img.shields.io/twitter/follow/lklknt.svg?style=social&label=Follow&maxAge=2592000?style=flat-square)](https://twitter.com/lklknt)

loklak is a server application which is able to collect messages from various sources, including twitter. The server contains a search index and a peer-to-peer index sharing interface. All messages are stored in an elasticsearch index. An automatic deployment from the development branch at GitHub is available for tests here https://loklak-server-dev.herokuapp.com

'Lok Lak' is also a very tasty Cambodian stir-fry meat dish (usually beef) with a LOT of fresh black pepper. If you ever have the chance to eat Beef Lok Lak, please try it. I hope not to scare vegetarians with this name, currently I am one as well.

## Communication

Please join our mailing list to discuss questions regarding the project: https://groups.google.com/forum/#!forum/loklak

Our chat channel is on gitter here: https://gitter.im/loklak/loklak

# loklak Applications

loklak_server is the framework for messages, queries, suggestion, geocoding, accounts and more. These services do not have a graphical front-end. The apps page is a showcase for developers to show off their apps.

## How to create a loklak app

1. Create your app
  - make a subdirectory in ```fossasia/apps.loklak.org/[your-app]``` folder
  - add at least three files into this folder, named ```index.html```, ```app.json``` and ```screenshot.png```.
    For an easy quick-start, use and copy the app boilerplate from
    https://github.com/fossasia/apps.loklak.org/tree/master/boilerplate
  - all libraries, css files, javascript and fonts must be either already existent
    in loklak or you must add this to your app path as well. 
  - The screenshot must be cropped into 640 x 640 pixels and in .png format.
  - the file ```index.html``` is the landing page of your app.
    Use ```/js/angular.min.js``` from the loklak root path for your application.
    The app should make use of the json libraries in ```/js```.
    If applicable, make use of the bootstrap style from ```/css```.
  - the file ```app.json``` must be in json-ld format (see http://json-ld.org/)
    and must contain the ```SoftwareApplication``` object from schema.org:
    https://schema.org/SoftwareApplication -- just copy-paste an existing ```app.json``` from another app to start you own file
  - modify the field ```"permissions"``` in ```app.json```: it must contain a comma-separated list of all api paths,
    that the app calls. This is used to apply authorization markers to the app, so it becomes visible if the app
    is actually usable for the user. Examples:
    ```"permissions":"/api/suggest.json"```, or ```"permissions":"/api/settings.json,/api/account.json"```

3. Check quality of your app
  - do a json-ld validation: use https://developers.google.com/structured-data/testing-tool/ to check your ```app.json```
  - call http://api.loklak.org/api/apps.json to see if your ```app.json``` is included in the app list
  - check if all declarations in your ```app.json``` relate to your own app
    (if you copy-pasted another ```app.json```, you may have forgotten to change some fields)
  - check the style and behaviour of your app: don't deliver half-done code.
  - open your ```index.html``` in different browser to check that your code is not browser-specific
  - add a backlink in your app to ```/apps/``` to make it possible that users can browse from your app to all other apps

4. Publish your app
  - send a pull request to https://github.com/fossasia/apps.loklak.org
  - all your files must be contained into one commit

## How users will discover your app
The loklak front-end will compute an aggregation of all those app.json descriptions and provide this in ```/api/apps.json``` as a list of the single app.json files.
A front-end (another app) will provide an overview of the given apps in visual form. This will be linked in the loklak front-end.


## What is the software license?

LGPL 2.1


## Where can I report bugs and make feature requests?

This project is considered a community work. The development crew consist of YOU too. I am very thankful for pull request. So if you discovered that something can be enhanced, please do it yourself and make a pull request. If you find a bug, please try to fix it. If you report a bug to me I will possibly consider it but at the very end of a giant, always growing heap of work. The best chance for you to get things done is to try it yourself. Our [issue tracker is here](https://github.com/loklak/loklak_server/issues).
