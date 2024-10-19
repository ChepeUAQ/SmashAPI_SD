# Welcome to the SmashAPI setup guide.

>[!IMPORTANT]
> This is a **WINDOWS ONLY** build. It has NOT be tested on LINUX nor MAC

## Make sure you have these programs installed:
>[!NOTE]
>Please make sure to correctly follow the installation steps correctly

1) Any of these browsers:
- [Mozilla Firefox](https://www.mozilla.org/firefox/)
- [Google Chrome](https://www.google.com/chrome/)
- [Microsoft Edge](https://www.microsoft.com/edge/)
  
2) [Docker Desktop](https://docs.docker.com/desktop/)
   
3) WSL
   Simply run ``wsl --install`` on your command interpreter


## Clone this repository
Use this command to easily clone the files to your desired directory

``` git clone https://github.com/ChepeUAQ/SmashAPI_SD.git ```

Or simply download the zip file under the green **Code** button

## Create the necessary containers
>[!IMPORTANT]
> Run these commands in the order they are shown here

Open Docker Desktop an your command interpreter then run the following commands:
1) Mongo:  ``docker run --name mongo-smash -p 27017:27017 -v mongo:/data/db -d mongo``
2) Redis: ``docker run -d --name redis -p 6379:6379 redis``

Then in you command interpreter go to the directory of SmashAPI, when you get there you will build the API image and run the container:
1) ``docker build -t smashapi:1 .``
2) ``docker run -d --name smashapi -p 5000:5000 smashapi:1``

## Create the database and collection
Access the mongo container bash:

``docker exec -it mongo-smash mongosh``

Input the following commands:

``
use smashdb
db.createCollection('Top')
``

## The API is ready to be used
You can use it on you browser by typing on your URL search bar:

``localhost:5000/api-docs``

## Insert recommended data (Optional)
Your database collection will be empty at this point, you can insert elements one by one or you can use the following command on your mongo bash
```
db.Top.insertMany([
  { rank: 1, tag: "acola", firstName: "Unknown", nationality: "JPN", mainCharacter: "Steve" },
  { rank: 2, tag: "Miya", firstName: "Unknown", nationality: "JPN", mainCharacter: "Mr. Game and Watch" },
  { rank: 3, tag: "Sonix", firstName: "Carlos", nationality: "DOM", mainCharacter: "Sonic" },
  { rank: 4, tag: "Hurt", firstName: "Unknown", nationality: "JPN", mainCharacter: "Snake" },
  { rank: 5, tag: "Tweek", firstName: "Gavin", nationality: "USA", mainCharacter: "Diddy Kong" },
  { rank: 6, tag: "Shuton", firstName: "Shuto", nationality: "JPN", mainCharacter: "Olimar" },
  { rank: 7, tag: "SHADIC", firstName: "Ethan", nationality: "USA", mainCharacter: "Corrin" },
  { rank: 8, tag: "TamaPDaifuku", firstName: "Unknown", nationality: "JPN", mainCharacter: "Bayonetta" },
  { rank: 9, tag: "Sparg0", firstName: "Edgar", nationality: "MEX", mainCharacter: "Cloud" },
  { rank: 10, tag: "Light", firstName: "Paris", nationality: "USA", mainCharacter: "Fox" },
  { rank: 11, tag: "Raru", firstName: "Unknown", nationality: "JPN", mainCharacter: "Luigi" },
  { rank: 12, tag: "Doramigi", firstName: "Unknown", nationality: "JPN", mainCharacter: "MinMin" },
  { rank: 13, tag: "Yaura", firstName: "Unknown", nationality: "JPN", mainCharacter: "Samus" },
  { rank: 14, tag: "Zomba", firstName: "Salvatore", nationality: "USA", mainCharacter: "ROB" },
  { rank: 15, tag: "Asimo", firstName: "Kazuki", nationality: "JPN", mainCharacter: "Ryu" },
  { rank: 16, tag: "Tea", firstName: "Takuma", nationality: "JPN", mainCharacter: "Pac-Man" },
  { rank: 17, tag: "MuteAce", firstName: "Antony", nationality: "USA", mainCharacter: "Peach" },
  { rank: 18, tag: "Snow", firstName: "Unknown", nationality: "JPN", mainCharacter: "Mario" },
  { rank: 19, tag: "ShinyMark", firstName: "Markus", nationality: "GTM", mainCharacter: "Pikachu" },
  { rank: 20, tag: "zackray", firstName: "Sota", nationality: "JPN", mainCharacter: "Pit" },
  { rank: 21, tag: "Onin", firstName: "Angel", nationality: "USA", mainCharacter: "Steve" },
  { rank: 22, tag: "Glutonny", firstName: "William", nationality: "FRA", mainCharacter: "Wario" },
  { rank: 23, tag: "Gackt", firstName: "Gakuto", nationality: "JPN", mainCharacter: "Ness" },
  { rank: 24, tag: "Maister", firstName: "Enrique", nationality: "MEX", mainCharacter: "Mr. Game and Watch" },
  { rank: 25, tag: "MkLeo", firstName: "Leonardo", nationality: "MEX", mainCharacter: "Joker" },
  { rank: 26, tag: "Yoshidora", firstName: "Unknown", nationality: "JPN", mainCharacter: "Yoshi" },
  { rank: 27, tag: "Toriguri", firstName: "Unknown", nationality: "JPN", mainCharacter: "Banjo" },
  { rank: 28, tag: "KEN", firstName: "Unknown", nationality: "JPN", mainCharacter: "Sonic" },
  { rank: 29, tag: "Riddles", firstName: "Michael", nationality: "CAN", mainCharacter: "Kazuya" },
  { rank: 30, tag: "Carmelo", firstName: "Unknown", nationality: "JPN", mainCharacter: "Steve" },
  { rank: 31, tag: "Akakikusu", firstName: "Unknown", nationality: "JPN", mainCharacter: "Hero" },
  { rank: 32, tag: "Crepe Sale", firstName: "Laurent", nationality: "FRA", mainCharacter: "Steve" },
  { rank: 33, tag: "Syrup", firstName: "Unknown", nationality: "USA", mainCharacter: "Steve" },
  { rank: 34, tag: "Wrath", firstName: "Marvin", nationality: "USA", mainCharacter: "Sonic" },
  { rank: 35, tag: "Raflow", firstName: "Arda", nationality: "FRA", mainCharacter: "Palutena" },
  { rank: 36, tag: "Kola", firstName: "Kolawole", nationality: "USA", mainCharacter: "Roy" },
  { rank: 37, tag: "Lima", firstName: "Bharat", nationality: "USA", mainCharacter: "Bayonetta" },
  { rank: 38, tag: "Dabuz", firstName: "Samuel", nationality: "USA", mainCharacter: "Rosalina" },
  { rank: 39, tag: "Neo", firstName: "Neo", nationality: "JPN", mainCharacter: "Corrin" },
  { rank: 40, tag: "Lv. 1", firstName: "Unknown", nationality: "JPN", mainCharacter: "Toon Link" },
  { rank: 41, tag: "alice", firstName: "Unknown", nationality: "JPN", mainCharacter: "Roy" },
  { rank: 42, tag: "Shirayuki", firstName: "Unknown", nationality: "JPN", mainCharacter: "Inkling" },
  { rank: 43, tag: "Umeki", firstName: "Masaki", nationality: "JPN", mainCharacter: "Daisy" },
  { rank: 44, tag: "Karaage", firstName: "Unknown", nationality: "JPN", mainCharacter: "Captain Falcon" },
  { rank: 45, tag: "M0tsunabE", firstName: "Unknown", nationality: "JPN", mainCharacter: "Falco" },
  { rank: 46, tag: "Big D", firstName: "Dawson", nationality: "CAN", mainCharacter: "Ice Climbers" },
  { rank: 47, tag: "Peabnut", firstName: "Christian", nationality: "USA", mainCharacter: "Megaman" },
  { rank: 48, tag: "Kuroponzu", firstName: "Unknown", nationality: "USA", mainCharacter: "ROB" },
  { rank: 49, tag: "Yamanaction", firstName: "Yuto", nationality: "JPN", mainCharacter: "Steve" },
  { rank: 50, tag: "Jakal", firstName: "Jude", nationality: "USA", mainCharacter: "Wolf" }
])
```

## Error handling
