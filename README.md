# apps.loklak.org
[![Build Status](https://travis-ci.org/fossasia/apps.loklak.org.svg?branch=master)](https://travis-ci.org/fossasia/apps.loklak.org)
[![Join the chat at https://gitter.im/loklak/loklak](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/loklak/loklak)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/fossasia/apps.loklak.org.svg)](http://isitmaintained.com/project/fossasia/apps.loklak.org "Percentage of issues still open")
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/fossasia/apps.loklak.org.svg)](http://isitmaintained.com/project/fossasia/apps.loklak.org "Average time to resolve an issue")
[![Twitter](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Wow%20Check%20Loklak%20on%20@gitHub%20@lklknt:%20https://github.com/fossasia/apps.loklak.org%20&url=%5Bobject%20Object%5D)
[![Twitter Follow](https://img.shields.io/twitter/follow/lklknt.svg?style=social&label=Follow&maxAge=2592000?style=flat-square)](https://twitter.com/lklknt)

Loklak is a server application which is able to collect messages from various sources, including Twitter. The server contains a search index and a peer-to-peer index sharing interface. All messages are stored in an elasticsearch index. An automatic deployment from the development branch at GitHub is available for testing here https://loklak-server-dev.herokuapp.com

'Lok Lak' is also a very tasty Cambodian stir-fry meat dish (usually beef) with a LOT of fresh black pepper. If you ever have the chance to eat Beef Lok Lak, please try it. I hope not to scare vegetarians with this name, currently I am one as well.

## Communication

Please join our mailing list to discuss questions regarding the project: https://groups.google.com/forum/#!forum/opntec-dev

Our chat channel is on Gitter here: https://gitter.im/loklak/loklak

# Loklak Applications

Loklak_server is the framework for messages, queries, suggestion, geocoding, accounts and more. These services do not have a graphical front-end, hence this repository houses the apps page, which is a showcase for developers and their applications which use loklak_search.
Some of the applications in the repository include-
- LQL (Loklak Query Language), an advanced search tool for loklak
- NMEA, a software application for tracking GPS NMEA Data using Loklak and OpenStreetMaps
- WebScraper, an application which converts web pages into structured data
- accountpermissions, an accounts operations application using an Accounts API for view permissions
- barchart, a stacked bar chart using loklak_search and D3 stack layout
- boilerplate, a 'hello world' loklak app
- bubblecharts, a bubble chart using D3 pack layout and loklak
- ducphanduy, a loklak tweet search page using AngularJS
- forgotpassword, a accounts operations application for  password recovery system
- fossasia-histogram, a tweet analytics application of loklak tweets histogram about FOSSASIA
- histogram, a message visualiser encompassing a tweet histogram plotter
- keyRegistration, an accounts operations application for registering a public key
- knowTheDiff, a software application comparing search and aggregations
- loginPage, an account operations application to log in to loklak
- oneClickDeploy, an API to increase loklak peers
- queryBrowser, a suggestion search listing all queries made in loklak
- resetpass, an account operations application to reset one's loklak password
- sentimentVisualiser, a tool for visualising the sentiment of a tweet
- signup, an account operations application to sign up to loklak
- social-wall, a loklak API-based twitter social wall
- superwoman7, a vertical tweet search message timeline
- susi, a chat with Susi API
- tweetfeed, a twitter feed using polls with infinite scroll
- tweetsleaderboard, a leaderboard based on the number of tweets using a Users API
- userprofile, a user profile visualisation using loklak
- yasoob, a loklak search page
- yathannsh, a loklak search page
- newyear, a page that displays new year tweets using the loklak api

## How to create a loklak app

1. Create your app
  - Make a subdirectory in ```fossasia/apps.loklak.org/[your-app]``` folder
  - Add at least three files into this folder, named ```index.html```, ```app.json``` and ```screenshot.png```.
    For an easy quick-start, use and copy the app boilerplate from
    https://github.com/fossasia/apps.loklak.org/tree/master/boilerplate
  - All libraries, css files, javascript and fonts must be either already existent
    in loklak or you must add this to your app path as well.
  - The screenshot must be cropped into 640 x 640 pixels and in .png format.
  - The file ```index.html``` is the landing page of your app.
    Use ```/js/angular.min.js``` from the loklak root path for your application.
    The app should make use of the json libraries in ```/js```.
    If applicable, make use of the bootstrap style from ```/css```.
  - The file ```app.json``` must be in json-ld format (see http://json-ld.org/)
    and must contain the ```SoftwareApplication``` object from schema.org:
    https://schema.org/SoftwareApplication -- just copy-paste an existing ```app.json``` from another app to start you own file
  - Modify the field ```"permissions"``` in ```app.json```: it must contain a comma-separated list of all api paths,
    that the app calls. This is used to apply authorization markers to the app, so it becomes visible if the app
    is actually usable for the user. Examples:
    ```"permissions":"/api/suggest.json"```, or ```"permissions":"/api/settings.json,/api/account.json"```

2. Check quality of your app
  - Do a json-ld validation: use https://developers.google.com/structured-data/testing-tool/ to check your ```app.json```
  - Call http://api.loklak.org/api/apps.json to see if your ```app.json``` is included in the app list
  - Check if all declarations in your ```app.json``` relate to your own app
    (if you copy-pasted another ```app.json```, you may have forgotten to change some fields)
  - Under Application Category try and choose one of the following Categories:
  a. Accounts
  b. Game
  c. Visualizer
  d. Scraper
  e. Search
  f. Internet of Things
  - List an appropriate Application Sub Category too
  - Check the style and behaviour of your app: don't deliver half-done code.
  - Open your ```index.html``` in different browser to check that your code is not browser-specific
  - Add a backlink in your app to ```/apps/``` to make it possible that users can browse from your app to all other apps

3. Publish your app
  - Send a pull request to https://github.com/fossasia/apps.loklak.org
  - All your files must be contained into one commit

## How to run Loklak Apps locally

You need to have NodeJS and NPM. To run Loklak Apps locally, follow the next steps

1. Open apps.loklak.org project directory in terminal
2. Run ```npm install```
3. Run ```npm start```
4. This starts the development server at port 8080. Open browser and visit http://127.0.0.1:8080

## How to run tests

Loklak apps site uses jasmine testing framework with protractor for testing.
To run the tests follow the steps mentioned below.

1. Open the project directory in terminal.
2. Run ```npm install``` if you have not already
3. Run ```npm run update-driver```
4. Run Loklak apps using ```npm start```
5. Run ```npm run start-driver```
6. Finally start tests using ```npm test```

## How users will discover your app
The loklak front-end will compute an aggregation of all those app.json descriptions and provide this in ```/api/apps.json``` as a list of the single app.json files.
A front-end (another app) will provide an overview of the given apps in visual form. This will be linked in the loklak front-end.

## Code practices

Please help us follow the best practice to make it easy for the reviewer as well as the contributor. We want to focus on the code quality more than on managing pull request ethics. 

 * Single commit per pull request
 * Reference the issue numbers in the commit message. Follow the pattern ``` Fixes #<issue number> <commit message>```
 * Follow uniform design practices. The design language must be consistent throughout the app.
 * The pull request will not get merged until and unless the commits are squashed. In case there are multiple commits on the PR, the commit author needs to squash them and not the maintainers cherrypicking and merging squashes.
 * If the PR is related to any front end change, please attach relevant screenshots in the pull request description.

## What is the software license?

LGPL 2.1


## Where can I report bugs and make feature requests?

This project is considered a community work. The development crew consist of YOU too. I am very thankful for pull request. So if you discovered that something can be enhanced, please do it yourself and make a pull request. If you find a bug, please try to fix it. If you report a bug to me I will possibly consider it but at the very end of a giant, always growing heap of work. The best chance for you to get things done is to try it yourself. Our [issue tracker is here](https://github.com/loklak/loklak_server/issues).
