var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

//console.log('Teste 1');

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  /*Return only the documents with the address "Park Lane 38":*/
  var query = { address: "Tibirica 763" };
  dbo.collection("customers").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
