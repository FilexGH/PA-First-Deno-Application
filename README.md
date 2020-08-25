#### Welcome!

As mentioned in the description this is my first Deno application, this is a simple posting application.

The Project is built in the following Technologies:

**Front-End:**
* Plain HTML/CSS/JS ( The design is awful tho since the focus is on the backend)

**Back-End**
* [Deno](https://deno.land/)
* MongoDB (Using [deno-mongo](https://github.com/manyuanrong/deno_mongo) to communicate)

**Usage**

You will have first to download Deno, i'm using Linux & Windows so i basically did, more info on the deno website:

```sh
# Windows
iwr https://deno.land/x/install/install.ps1 -useb | iex
# Linux 
curl -fsSL https://deno.land/x/install/install.sh | sh
```

To run the application first you need to set the data on `server/config.json` conncted to MongoDB and set the server url on `client/index.js` since server and client are seperated:

```json
"MONGO_DB": {
   "MONGO_DB_URL": "",
   "DATABASE_NAME": "",
   "COLLECTION_NAME": ""
}
```

To run the server simply move to the server directory and type the deno run command with needed flags as following:

```sh
cd server 
deno run --allow-net --allow-read --allow-plugin --allow-write --unstable index.ts
```