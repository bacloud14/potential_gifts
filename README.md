# Potential gifts
A MYSQL database for virtual gifts. It can be used as a model for games or even for serious wishlist apps.

### Initial dumb model

![alt text](https://github.com/bacloud14/potential_gifts/raw/master/data_model2.PNG)

### DB

https://github.com/bacloud14/potential_gifts/raw/master/db2.sql

#### Fields

##### generic_asset and assets tables
- description: description
- type: an asset can be:

   - productive like a machine, 
   - entertaining like a toy, 
   - raw like precious metals, 
   - information like any valuable information that is authentic or completely secret, 
   - symbolic like a love letter, 
   - assuring like a contract, 
   - other for anything other that these.
   
- ephemeral: wheather it is ephemeral like food or not
- expiration: only specified if it is ephemeral
- atomic: if it is valuable only if not devided like a computer keyboard
- valuable_exchange: if it still has value when given to others like real money
- unicode: unique just like id, but readible to identify all assets
- media: a picture link

##### user

user is just a subscribed user (technically for loggin but also for gaming).

##### possession and wishlist

a possession is a one to many link so that a user can have many assets. Each entry is labeled by time to indicate the time of possessing an asset.
possessions and wishlists are the same for now, maybe not later.

##### Note:

This is just my 0-version immagination of it, please feel free to open an issue and suggest any improvements.

### Dumb dump content

https://github.com/bacloud14/potential_gifts/raw/master/dump.sql

### NodeJS API

Building a small NodeJS API around the database in order to fetch items from the DB more easily.

#### Current APIs
- /status
  - Returns a JSON object with the status of the server
- /version
  - Returns a JSON object with the currently running version of the API
- /assets
  - Returns an array of JSON objects each elements represents an asset from the database
  - Will return the same number of assets that exist in the database
- /assets/atomic
  - Returns an array of JSON objects each elements represents an asset from the database
  - Will return the same number of atomic assets that exist in the database
- /assets/type/:type
  - Returns an array of JSON objects each elements represents an asset from the database
  - Will return the same number of assets with that type that exist in the database

### How Do I Use This?
- Clone this repo
- In the root directory run `npm install`
- When the install is completed run `npm run start:dev`
- Point your browser to http://127.0.0.1:8080/status
- You should see that the server status is reporting live
- Use Postman or any other API tool to hit the API's listed in the [NodeJS API](#nodejs-api) section above

#### Your ENV File
To run the application you need to have a `.env` file in your root directory. This `.env` file should contain the following data:

```bash
DB_HOST=your_host
DB_USER=your_user
DB_PASS=your_password
DB_DATA=the_database
DB_PORT=your_port
```

An example of this would be if I had a MySQL instance running `locally` on my machine on port `3306` with a username of `michael.scott` and the password `WillyWonka` which was using the database name `DunderMifflin`, the file contents would look like this:
```bash
DB_HOST=localhost
DB_USER=michael.scott
DB_PASS=WillyWonka
DB_DATA=DunderMifflin
DB_PORT=3306
```

### todo

- Revise this 0 version and update the NodeJS model that will be used for Sequelize...
- NodeJS CRUD API to play with ?
- Make a web app game for virtual gifts ? For this we need some kind of virtual money units, to let users trade or exchange assets. A nice open source media package would be greate as you can imagine...
- Help wanted ! Propose any ideas ... This could be a huge amusement for teenageers.
