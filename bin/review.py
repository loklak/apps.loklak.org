''' An utility script to check if app is ready for
    store listing or not
'''

import json
import os

class colors:
  OKGREEN = '\033[92m'
  WARNING = '\033[93m'
  FAIL = '\033[91m'
  ENDC = '\033[0m'
  BOLD = '\033[1m'

problems_no = 0

def print_problem(error):
  print colors.BOLD + colors.FAIL + error + colors.ENDC

def print_info(info):
  print colors.BOLD + info + colors.ENDC

def print_success(msg):
   print colors.BOLD + colors.OKGREEN + msg + colors.ENDC

if __name__ == "__main__":
  dir_contents = os.listdir("./")
  
  if "app.json" not in dir_contents:
    print_info("Please include a well configured app.json")
    print_problem("review failed")
    exit(0)
  
  if "index.html" not in dir_contents:
    print_problem("index.html is missing")
    print_info("app must contain index.html")
    problems_no += 1
  
  app_json_file = open("app.json")
  app_json_data = app_json_file.read()
  app_json = json.loads(app_json_data)
  app_json_file.close()
  
  if app_json.get("name") == None:
    print_problem("key name missing in app.json")
    print_info("app.json must contain key name with name of the app as value")
    problems_no += 1
  else:
    app_dir_name = os.getcwd().split("/")[-1]
    if app_dir_name != app_json.get("name"):
      print_problem("app directory name and name mentioned in app.json are different")
      print_info("app directory name and name mentioned in app.json must be same")
      problems_no += 1
  
  if app_json.get("applicationCategory") == None:
    print_problem("key applicationCategory missing in app.json")
    print_info("app.json must contain key applicationCategory with category as value")
    problems_no += 1
  else:
    if app_json.get("applicationCategory") == "":
      print_problem("applicationCategory cannot be an empty string")
      problems_no += 1
  
  if app_json.get("oneLineDescription") == None:
    print_problem("key oneLineDescription missing in app.json")
    print_info("app.json must contain key oneLineDescription with a one line description of the app")
    problems_no += 1
  else:
    if app_json.get("oneLineDescription") == "":
      print_problem("oneLineDescription cannot be an empty string")
      problems_no += 1
  
  if app_json.get("author") == None:
    print_problem("author object missing in app.json")
    print_info("app.json must contain author object containing information about author")
    problems_no += 1
  else:
    author = app_json.get("author")
    if author.get("name") == None:
      print_problem("name of author is mssing in author object")
      print_info("name of author must be mentioned in author object")
      problems_no += 1
    else:
      if author.get("name") == "":
        print_problem("author name cannot be an empty string")
        problems_no += 1
  
  if app_json.get("promoImage") == None:
    print_problem("key promoImage missing in app.json")
    print_info("app.json must contain key promoImage with path of promo image as value")
    problems_no += 1
  else:
    if os.path.isfile(app_json.get("promoImage")) == False:
      if app_json.get("promoImage") == "":
        print_problem("promoImage cannot be an empty string")
      else:
        print_problem(app_json.get("promoImage") + " does not exists")
      problems_no += 1
  
  if app_json.get("appImages") == None:
    print_problem("key appImages missing in app.json")
    print_info("app.json must contain key appImages with paths of preview images as value")
    problems_no += 1
  else:
    for image in app_json.get("appImages"):
      if os.path.isfile(image) == False:
        if image == "":
          print_problem("appImages cannot contain empty strings")
        else:
          print_problem(image +" does not exists")
        problems_no += 1
  
  if problems_no > 0:
    print_problem("Number of problems detected : " + str(problems_no))
    print_problem("App cannot be published")
    print_info("Please check https://github.com/fossasia/apps.loklak.org/blob/master/docs/tutorial.md")
  else:
    print_success("App is ready for publishing")
    print_info("Check https://github.com/fossasia/apps.loklak.org/blob/master/docs/tutorial.md to publish your app")
