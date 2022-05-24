# Blog_Node
An blog project using Node, I'm using it to learn about sessions, Mongo, etc
## How to setup the application
First of all, run `npm install`.

To set the database, you'll need docker. You can do it 2 ways.
1º: without `docker compose`
```
docker run -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=username -e MONGO_INITDB_ROOT_PASSWORD=123456 --name my-mongo-db mongo
```
2º: The other way would be to use the `docker-compose.yml` file, it'd build the database and also create an container for the app, you'd simply run: `docker compose up`.

Obs: in the `docker-compose.yml` file, there're env variables with the database's username and password, if you do the first way, you'll need to change the env variables values in this file to the ones you ran in the script. You can change it as you please, just be careful to change where it's required.

## To run the app
You can simply run `npm start`.

The app has admin routes, used to manipulate categories and posts, to use them you have to create an account with an email that contains `@admin.adm` in the end, e.g `test@admin.adm`.
