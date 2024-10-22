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
> Make sure Docker Desktop is running from this point onward
>
> Run these commands in the order they are shown here

Open Docker Desktop an your command interpreter then run the following commands:
1) Mongo:
   
``docker run --name mongo-smash -p 27017:27017 -v mongo:/data/db -d mongo``

2) Redis: 

``docker run -d --name redis -p 6379:6379 redis``

Then in you command interpreter go to the directory of SmashAPI, when you get there you will build the API image and run the container:
``docker build -t smashapi:1 .``

## Create the database and collection
Access the mongo container bash:

``docker exec -it mongo-smash mongosh``

Input the following commands:

```
use smashdb
db.createCollection('Top')
```

>[!TIP]
> To avoid errors please start your containers in the same order as they were given here
>
> Do this by starting them on docker desktop or using the command
>
> ``docker start <container-name>``

## The API is ready to be used
Type this command to run the API itself:

``docker run -d --name smashapi -p 5000:5000 smashapi:1``

Now you can use it on you browser by typing on your URL search bar:

``localhost:5000/api-docs``

## Insert sample data (Optional but Recommended)
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

## How to use the API
>[!TIP]
> When inserting data always try to use the POST method **DO NOT** insert it yourself on mongo directly unless you know what you are doing

If you chose to not use the sample data given previously you will need to insert your own, here's the way to do it:

1. Run the API on the software of your choice (Postman, Thunder Client, Swagger...)
2. Open a new request and select the POST method
3. On your body enter data formatted like this:

```
{
  "rank": 1,
  "tag": "PlayerTag",
  "firstName": "PlayerName",
  "nationality": "USA",
  "mainCharacter": "Mario"
}
```

4. You should recieve a 201 status code signaling the correct insertion of your data

From then on, use the methods provided on the Swagger documentation to further expand your data. Use the same format for the body when requested.

## Error handling
>[!IMPORTANT]
> Before anything check no other aplications are using ports 5000, 27017 or 6379

As with any software, there is bound to be error at some point in their lifetime. Here we will address the most common errors and how to fix them:

### API doesn't run / Runs for a little while then stops
This is commonly caused because you didn't **start the containers in the order they are supposed** to so check that.
If that doesn't work then follow these steps:
1. Make sure the Redis and Mongo containers are running
2. Run these commands one by one on your terminal:

``docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mongo-smash``

``docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' redis``


These should output 172.17.0.2 and 172.17.0.3 respectively, if not then you are encountering an extraordinary case and **will need to modify code**. **Make sure to save the IP addresses you were provided with if this is the case**

3. Go to the SmashAPI directory and open the connections folder
4. Open ``db.js`` and on line number 7 replace the IP address with the one that was given to you on the first command (mongo-smash)
5. Save the file
6. Repeat the process with ``redis.js``

>[!WARNING]
> **DO NOT MODIFY ANYTHING ELSE IN THE SCRITPS**

### API runs but all methods return errors
If this is the case you have to make sure you have data on your database and its correctly formatted.

1. Enter the mongo bash on you mongo-smash container
   
   ``docker exec -it mongo-smash mongosh``
   
   ``use smashdb``

3.  Look for missing or misformatted data
   
   ``db.Top.find()``

4.  Delete it

   ``db.Top.finOneAndDelete({id: exampleid123456ABCD})``

When inserting data, please refer to the [HOW TO USE THE API](#how-to-use-the-api) section
