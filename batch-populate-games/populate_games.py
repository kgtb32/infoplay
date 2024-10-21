from lxml import etree
import json
import requests

GAME_XML_PATH = "/home/kevin/Téléchargements/atari2600 rom/atari2600/gamelist.xml"
ROM_PATH = "/home/kevin/Téléchargements/atari2600 rom/atari2600/"
IMAGE_PATH = "/home/kevin/Téléchargements/atari2600 rom/Scrap Version/boite 2d/"

counter = 0

tree = etree.parse(GAME_XML_PATH)
for game in tree.xpath("/gameList/game"):
    counter += 1
    final_object = dict()
    final_object["description"] = dict()
    path = None
    image = None
    if(game.find("path") is not None):
        path = game.find("path").text.replace("./","")
    if(game.find("image") is not None):
        image = game.find("image").text.replace("./downloaded_images/", "")
        
    if (game.find("genre") is not None and game.find("genre").text is not None):
        final_object['description']["genres"] = game.find("genre").text.split("/")
        
    final_object["name"] = game.find("name").text
    final_object["platform"] = "atari2600"
    final_object["description"]["rating"] = game.find("rating").text
    final_object["description"]["releaseDate"] = game.find("releasedate").text
    final_object["description"]["developer"] = game.find("developer").text
    final_object["description"]["description"] = game.find("desc").text
    final_object["description"]["publisher"] = game.find("publisher").text
    final_object["description"]["players"] = game.find("players").text
    json_body = json.dumps(final_object, ensure_ascii=False)
    
    try:
        
        multipart_form_data = {
            'game': (path, open(ROM_PATH + path, 'rb')),
            'image': (image, open(IMAGE_PATH + image, 'rb')),
            'request': (None, json_body,"application/json")
        }
        response = requests.post('http://localhost:8080/api/game', files=multipart_form_data)
        print("adding", final_object["name"], counter)
    except Exception:
        print("failed to add", final_object["name"])