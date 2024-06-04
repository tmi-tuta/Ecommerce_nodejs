var MongoClient = require('mongodb').MongoClient;
const dotenv = require("dotenv");
dotenv.config();
var url = `${process.env.DB_HOST}`;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.createCollection("products", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});