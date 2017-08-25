
import json
from collections import OrderedDict

PATH_TO_ROOT_JSON = '../apps.json'
PATH_TO_APP_JSON = 'app.json'

class colors:
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'

#method to check if app entry is already present in list of apps
def getAppIfPesent(json_list, app_json):
    app_name = app_json['name']

    apps = json_list['apps']
    for app in apps:
        if app['name'] == app_name:
            return app
    return None

def update_list_file(json_list):

    #update json object file with modified json object
    json_list_file = open(PATH_TO_ROOT_JSON, 'w')
    json_list_file.write('{}\n'.format(json.dumps(json_list, indent=2, separators=(',', ': '))))
    json_list_file.close();

def expose_app(json_list, app_json):

    #if app is already present in list then fetch that app
    app = getAppIfPesent(json_list, app_json)

    #if app is not present then add a new entry
    if app == None:
        json_list['apps'].append(app_json)
        update_list_file(json_list)
        print colors.BOLD + colors.OKGREEN + 'App exposed on app wall' + colors.ENDC

    #else update the existing app entry
    else:
        for key in app_json:
            app[key] = app_json[key]
        update_list_file(json_list)
        print colors.BOLD + colors.OKGREEN + 'App updated on app wall' + colors.ENDC

if __name__ == '__main__':

    #open file containg json object
    json_list_file = open(PATH_TO_ROOT_JSON, 'r')

    #load json object
    json_list = json.load(json_list_file,  object_pairs_hook=OrderedDict)
    json_list_file.close()

    app_json_file = open(PATH_TO_APP_JSON, 'r')
    app_json = json.load(app_json_file,  object_pairs_hook=OrderedDict)
    app_json_file.close()

    #method to update Loklak app wall
    expose_app(json_list, app_json)
