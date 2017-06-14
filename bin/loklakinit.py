# An utility script for creating an loklak app

import collections
import json
import os
import pprint
import signal

def sigint_handler(signum, frame):
  print "\nloklakinit cancelled"
  exit(0)
 
signal.signal(signal.SIGINT, sigint_handler)

print "This utility will walk you through creating a app.json file.\n\
It only covers the most common items, and tries to guess sensible defaults.\n\
\n\
After collecting all the necessary parameters a sample application directory\n\
structure will be created along with sample files.\n\
\n\
Press ^C at any time to quit.\n"

app_json = collections.OrderedDict()

app_json["@context"] = "http://schema.org"
app_json["@type"] = "SoftwareApplication"
app_json["permissions"] = "/api/search.json"
app_json["name"] = "myloklakapp"
app_json["headline"] = "My first loklak app"
app_json["alternativeHeadline"] = app_json["headline"]
app_json["applicationCategory"] = "Misc"
app_json["applicationSubCategory"] = ""
app_json["operatingSystem"] = "http://loklak.org"
app_json["promoImage"] = "promo.png"
app_json["appImages"] = ""
app_json["oneLineDescription"] = ""
app_json["getStarted"] = "getStarted.md"
app_json["appUse"] = "appUse.md"
app_json["others"] = "others.md"

author = collections.OrderedDict()
author["@type"] = "Person"
author["name"] = ""
author["email"] = ""
author["url"] = ""
author["sameAs"] = "" 

app_json["author"] = author

while True :

  app_name = raw_input("name (" + app_json["name"] + ") : ")
  if app_name :
    app_json["name"] = app_name

  app_context = raw_input("@context (" + app_json["@context"] + ") : ")
  if app_context :
    app_json["@context"] = app_context

  app_type = raw_input("@type (" + app_json["@type"] + ") : ")
  if app_type :
    app_json["@type"] = app_type

  app_permissions = raw_input("permissions (" + app_json["permissions"] + ") : ")
  if app_permissions :
    app_json["permissions"] = app_permissions.split(",")

  app_headline = raw_input("headline (" + app_json["headline"] + ") : ")
  if app_headline :
    app_json["headline"] = app_headline
    app_json["alternativeHeadline"] = app_headline


  app_alternative_headline = raw_input("alternative headline (" + app_json["alternativeHeadline"] + ") : ")
  if app_alternative_headline :
    app_json["alternativeHeadline"] = app_alternative_headline

  app_category = raw_input("application category (" + app_json["applicationCategory"] + ") : ")
  if app_category :
    app_json["applicationCategory"] = app_category

  app_sub_category = raw_input("sub category : ")
  if app_sub_category :
    app_json["applicationSubCategory"] = app_sub_category

  app_os = raw_input("application operating system (" + app_json["operatingSystem"] + ") : ")
  if app_os :
    app_json["operatingSystem"] = app_os

  app_promo_image = raw_input("promo image (" + app_json["promoImage"] + ") : ")
  if app_promo_image :
    app_json["promoImage"] = app_promo_image

  app_images = raw_input("app preview images (values can be separted by comma) : ")
  if app_images :
    app_json["appImages"] = app_images.split(",")

  app_description = raw_input("one line description : ")
  if app_description :
    app_json["oneLineDescription"] = app_description

  author["name"] = raw_input("author name : ")

  author_type = raw_input("author type (" + author["@type"] + ") : ")
  if author_type :
    author["@type"] = author_type

  author["email"] = raw_input("email : ")

  author["url"] = raw_input("url : ")
  author["sameAs"] = author["url"]

  author["sameAs"] = raw_input("same as : ")

  app_json["author"] = author

  print json.dumps(app_json, indent=2)

  confirm = raw_input("confirm (yes) : ")

  if confirm.lower() != "no" :
    break

print "creating app directory structure..."

os.mkdir(app_json["name"])
os.chdir(app_json["name"])
os.mkdir("css")
os.mkdir("js")
index_html = open("index.html", 'w')
index_html.write("<!-- entry point of the app, on launching the appliccation" +
                  "this page will be displayed -->")
index_html.close()

app_json_file = open("app.json", 'w')
app_json_file.write(json.dumps(app_json, indent=2))
app_json_file.close()

get_started_md = open("getStarted.md", 'w')
get_started_md.write("<!-- getting started with the app -->")
get_started_md.close()

app_use_md = open("appUse.md", 'w')
app_use_md.write("<!-- use of this app -->")
app_use_md.close()

others_md = open("others.md", 'w')
others_md.write("<!-- other relevant information about this app -->")
others_md.close()

style_css = open("css/style.css", 'w')
style_css.write("/* css to style the app */")
style_css.close()

script_js = open("js/script.js", 'w')
script_js.write("// javascript logic for the app")
script_js.close()

print "done"
