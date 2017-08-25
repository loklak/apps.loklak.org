# Creating loklak applications

This guide will take you through the different ways of creating a loklak application
write from creating the app structure to publishing it on [apps.loklak.org](http://apps.loklak.org)

Presently there are three ways to create a loklak app - using the **Boilerplate**
app, using **loklakinit** to initiate automated app structure and lastly creating an
app manually without using Boilerplate app or loklakinit.

Follow the next steps to learn about each of these methods in details and create awesome applications
using the loklak api.

## Prerequisites

Before getting started with developing loklak apps you must make sure that you have the
below mentioned prerequisites.

You must have **git** installed. If you do not have git installed or you have
not used git before then check it out from [here](https://www.tutorialspoint.com/git/) or any of the several 
online resources on git.

Next, you must have an account on [github](https://github.com). If you do not
already have an account on github then please create one now. Github is an awesome place for
code collaboration.

Lastly, since its all about creating apps using the loklak api, you must go through the loklak
api documentation [here](http://dev.loklak.org/server/)

That being said, if you have already done what is mentioned in the above points, then you are
all set to go. Lets get started.

## Getting the repository

The source code of all the loklak apps and the site is hosted on github. First you need to get
a local copy of apps.loklak.org.

Fork apps.loklak.org repo from [here](https://github.com/fossasia/apps.loklak.org).
This will create a copy of apps.loklak.org repository in your own account.

Next clone the apps.loklak.org repository which was just created in your github account using
the following command.

```git clone https://github.com/your_user_name/apps.loklak.org.git```

After this you will get a local copy of apps.loklak.org on your disk.

## Using Boilerplate

**Boilerplate** app provides you with an easy and quick way to get started with out app
development. It provides you a template to get started with.

Enter into the apps.loklak.org repsitory which you just cloned.<br>
Make a copy of the**Boilerplate** app and rename it to your app's name.

Inside the boilerplate app directory you will find an already made app directory structure
and a sample app.json file which you need to edit according to your needs. Please see
**Configuring app.json** section to know more on this. There is a sample index.html,
styles.css inside css folder, script.js inside js folder and three markdown files which will
hold relevant information about your app.

You just need to edit the files in order to get started with your development work.

## Using loklakinit

**loklakinit** is a command line utility tool which starts an automated process
for creating app.json file and the entire app structure including an index.html, style.css and
a script.js. It also creates three markdown files for your app documentation.

Enter into the cloned apps.loklak.org repo, Open terminal and execute the following command

```bin/loklak.sh```

This will start an automated process, you wll be asked to provide several configuration
parameters like **app name**,  **app headline**, ** app 
category ** and many more. You can either provide these values or simply press enter
to accept th default ones. At any point of time you can quit this process by pressing 
**Ctrl + C** key combination. After loklakinit has got all its required parameters, it will
present you a preview of the app.json it has created.
```
{
  "@context": "http://schema.org",
  "@type": "SoftwareApplication",
  "permissions": "/api/search.json", 
  "name": "myloklakapp",
  "headline": "My first loklak app",
  "alternativeHeadline": "My first loklak app",
  "applicationCategory": "Misc",
  "applicationSubCategory": "",
  "operatingSystem": "http://api.loklak.org",
  "promoImage": "promo.png",
  "appImages": [
    "preview1.png",
    "preview2.png"
  ],
  "oneLineDescription": "my firest test app",
  "getStarted": "getStarted.md",
  "appUse": "appUse.md",
  "others": "others.md",
  "appSource": "",
  "contributors": [
    {
      "url": "djmgit.github.io",
      "name": "deep"
    }
  ], 
  "techStack": [
    "HTML",
    "CSS",
    "JS"
  ],
  "license": {
    "url": "https://www.gnu.org/licenses/old-licenses/lgpl-2.1",
    "name": "LGPL 2.1"
  },
  "version": "1.0",
  "updated": "2017-8-7T12:50",
  "author": {
    "@type": "Person",
    "name": "deep",
    "email": "djmdeveloper060796@gmail.com",
    "url": "djmgit.github.io",
    "sameAs": ""
  }
}
confirm (yes) :
```

If you are satisfied, then you can simply press enter or else you can enter **no**
which will start the process again. You can always edit the app.json after it has been created.
After the process ends the following directory structure will be created.

```
myfirstloklakapp/
├── app.json
├── appUse.md
├── css
│   └── style.css
├── getStarted.md
├── index.html
├── js
│   └── script.js
└── others.md

2 directories, 7 files
```
Now you can edit these files and get started with your loklak app development.

## Creating from scratch

Both Boilerplate app and loklakinit creates an model app directory layout and an app.json
to get you started with your development work. However if you are not satisfied with them
you can always create your app from scratch.

However you need to make sure that certain requirements are satisfied.
Your app must contain an **index.html**. This is the entry point of your
app.

Your app must contain an app.json with all the mandatory information provided in it.
**Configuring app.json** section provides more details on this.

Your app must contain documentation about getting started with your app, the use cases of
your app and other relevant information. The documentation files must be referred in app's
app.json file.

Apart from these make sure that your app contains all the materials mentioned in **Post
app creation** section.

## Preparing your app for store listing

After successfully creating your loklak application you need to document your app so
that it can be properly showcased on apps.loklak.org's storelisting page and others
can know and understand your app before actually using them.

If you have used Boilerplate or loklakinit to create your app, then you will already
have three .md files in your app directory, or else you need to create those yourself.
These are getStarted.md, this should contain all necessary information regarding getting
started with your app, how to use your app, what your app does, what does the various
fields inside your app mean, etc. User should get a complete understanding of your app
from this.

Next there is appUse.md, it should contain the various use cases of your app, how can the
app be useful to any user.

Finally if you have any other relevant information about the app that you want to share
with other users and developers then you can add those to others.md file.

Whatever you mention in these files will be showcased on the store listing page, so please
pay attention to what you are writing.

## Configuring app.json

**app.json** is one of the most important component of your. It holds important
meta data about your app and is also important for presenting your app on the store listing
page of apps.loklak.org.

Given below is a sample app.json

```
{
  "@context":"http://schema.org",
  "@type":"SoftwareApplication",
  "permissions":"/api/search.json",
  "name":"MultiLinePlotter",
  "headline":"App to plot tweet aggregations and statistics",
  "alternativeHeadline":"App to compare tweet aggregations and statistics",
  "applicationCategory":"Visualizer",
  "applicationSubCategory":"About project",
  "operatingSystem":"http://loklak.org",
  "promoImage":"promo.png",
  "appImages":["disp1.png", "disp2.png", "disp3.png"],
  "oneLineDescription":"An applicaton to visually compare tweet statistics",
  "getStarted":"getStarted.md",
  "appUse":"appUse.md",
  "appSource": "https://github.com/fossasia/apps.loklak.org/tree/master/MultiLinePlotter",
  "contributors": [{"name": "djmgit", "url": "http://djmgit.github.io/"}],
  "techStack": ["HTML", "CSS", "AngularJs", "Morris.js", "Bootstrap", "Loklak API"],
  "license": {"name": "LGPL 2.1", "url": "https://www.gnu.org/licenses/old-licenses/lgpl-2.1"},
  "version": "1.0",
  "updated": "June 10,2017",
  "author":{
    "@type":"Person",
    "name":"Deepjyoti Mondal",
    "email":"djmdeveloper060796@gmail.com",
    "url":"https://djmgit.github.io",
    "sameAs":"https://github.com/djmgit"
  }
}
```

Here some of the most important fields which must be set are :-

**name** : It is the name of your application.

**headline** : It acts as a tag line for your app.

**applicationCategory** : The category to which your app belongs.

**promoImage** : Path to your promo image.

**appImages** : List containing path to your preview images separated by comma.

**oneLineDescrption** : As the name suggests, a one line description of your app.

**getStarted** : Path to your getting started documentation file.

**appUse** : Path to your app use file.

**others** : Path to the .md file containg other relevant information. (optional).

**author.name** : Name of the developer.

## Post app creation

Below mentioned is a list of items that your app must contain so that it
can be published on apps.loklak.org.

A screen shot of your application of dimension **640 X 640 pixels**

A promo image for your app of **width 280 pixels**

Minimum three preview images of your app of **width 800 pixels** and height minimum
**360 pixels**. Make sure the images are properly **scaled**

Proper app documentation as mentioned above so that your app can be featured on the store listing page.

**A properly configured app.json in the root directory of your app**

## Making sure your app is ready for getting published

Before publishing your app (as mentioned below) you must make sure your app is ready for being
published. You can either do this by going through the above guidelines and cross checking whether
your app satisfies all the point or not or else you can use review tool to automatically review
your app and get informed about the existing problems in your app.

### Using review script to review your app

In order to automate your app review process, open your app directory in terminal and execute the
following command.

```
../bin/review.sh

```
If your app fails to satisfy any of the points mentioned above, then it will be displayed
on your terminal and you can take neccessary steps to solve it. Do not forget to re-run review
script after making changes to make sure that your app has no more problems.

### Exposing your app on Loklak app wall

When you visit Loklak apps site, you are presented with a number of tiles each displaying name, heading
and author name of individual apps. Now after you create your app, you will also want to list your app
on Loklak app wall. This can be done very easily using updatewall script. Open your app directory in terminal
and execute the following

```
../bin/updatewall.sh

```
This will expose your app on Loklak app wall. If the app is already present on Loklak app wall then
the above script will update Loklak app wall with the new changes you have made to your app.


## Publishing your app

So finally your app is ready to be published and showcased on apps.loklak.org.
This is extremely easy and can be done in a few moments.

Head to [apps.loklak.org issues](https://github.com/apps.loklak.org/issues)
and create a issue mentioning what app you want to create, what are its features, its uses,
etc

Enter apps.loklak.org repo and execute the below commands.

```
git add --all
git commit
```
This stages your newly added app for commit, and tries to commit the changes.
Provide a suitable commit message and do not forget to refer the issue you just created.
Once commit is successful, you are ready to push the changes.

```
git push origin master branch_name
```

Provide your credentials and changes will be pushed into a new branch in your forked repo
at github. Now simply head to your forked apps.loklak.org repository and select the newly
created branch and send a pull request.

Soon your app will be reviewed by your co-developers at FOSSASIA, if required you may be asked to
make changes. If everything is alright your pull request will be merged and your app will be
visible on the app wall of apps.loklak.org.
