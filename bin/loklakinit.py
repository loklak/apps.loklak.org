# An utility script for creating an loklak app

import collections
import datetime
import json
import os
import pprint
import signal

def sigint_handler(signum, frame):
  print "\nloklakinit cancelled"
  exit(0)

if __name__ == "__main__" :
  signal.signal(signal.SIGINT, sigint_handler)

  print "This utility will walk you through creating a app.json file.\n\
  It only covers the most common items, and tries to guess sensible defaults.\n\
  \n\
  After collecting all the necessary parameters a sample application directory\n\
  structure will be created along with sample files.\n\
  \n\
  Press ^C at any time to quit.\n"

  app_json = collections.OrderedDict()

  # Value must be a string
  app_json["@context"] = "http://schema.org"

  # Value must be a string
  app_json["@type"] = "SoftwareApplication"

  # Value must be a string
  app_json["permissions"] = "/api/search.json"

  # Value must be a string
  app_json["name"] = "myloklakapp"

  # Value must be a string
  app_json["headline"] = "My first loklak app"

  # Value must be a string
  app_json["alternativeHeadline"] = app_json["headline"]

  # Value must be a string
  app_json["applicationCategory"] = "Misc"

  # Value must be a string
  app_json["applicationSubCategory"] = ""

  # Value must be a string
  app_json["operatingSystem"] = "http://api.loklak.org"

  # Value must be a string
  app_json["promoImage"] = "promo.png"

  # Value must be a string
  app_json["appImages"] = ""

  # Value must be a string
  app_json["oneLineDescription"] = ""

  # Value must be a string
  app_json["getStarted"] = "getStarted.md"

  # Value must be a string
  app_json["appUse"] = "appUse.md"

  # Value must be a string
  app_json["others"] = "others.md"

  # Value must be a string
  app_json["appSource"] = ""

  ''' Value must be a list containing dictionaries of form -
  {"name": name_of_contributor,
   "url": url_of_contributor
  }
  '''
  app_json["contributors"] = ""

  # Value must be a list containing strings
  app_json["techStack"] = ""

  ''' Value must be a dictionary of form -
  {"name": license_name,
   "url": license_url}
  '''
  app_json["license"] = {"name": "LGPL 2.1", "url": "https://www.gnu.org/licenses/old-licenses/lgpl-2.1"}

  # Value must be a string
  app_json["version"] = "1.0"

  #Value must be string
  app_json["updated"] = ""

  author = collections.OrderedDict()

  # Value must be a string
  author["@type"] = "Person"

  # Value must be a string
  author["name"] = ""

  # Value must be a string
  author["email"] = ""

  # Value must be a string
  author["url"] = ""

  # Value must be a string
  author["sameAs"] = ""

  # Value must be author dictionary
  app_json["author"] = author

  # keep taking inputs from user until he confirms
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

    version = raw_input("version (" + app_json["version"] + ") : ")
    if version :
      app_json["version"] = version

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

    tech_stack = raw_input("technology stack used (items can be separated by comma) : ")
    if tech_stack :
      app_json["techStack"] =  tech_stack.split(",")

    app_source = raw_input("app source : ")
    if app_source :
      app_json["appSource"] = app_source

    license_name = raw_input("liense name (" + app_json["license"]["name"] + ") :")
    if license_name:
      app_json["license"]["name"] = license_name

    license_url = raw_input("license url (" + app_json["license"]["url"] + ") :")
    if license_url:
      app_json["license"]["url"] = license_url

    author["name"] = raw_input("author name : ")

    author_type = raw_input("author type (" + author["@type"] + ") : ")
    if author_type :
      author["@type"] = author_type

    author["email"] = raw_input("email : ")

    author["url"] = raw_input("url : ")
    author["sameAs"] = author["url"]

    author["sameAs"] = raw_input("same as : ")

    app_json["author"] = author

    app_json["contributors"] = [{"name": author["name"], "url": author["url"]}]

    today = datetime.datetime.now().date()
    time = datetime.datetime.now().time()
    today_str = str(today.year) + '-' + str(today.month) + '-' + str(today.day)
    time_str = str(time.hour) + ':' + str(time.minute)
    app_json["updated"] = today_str + 'T' + time_str

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
  app_json_file.write('{}\n'.format(json.dumps(app_json, indent=2, separators=(',', ': '))))
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
