
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:root@cluster0.cxqt7.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, });

client.connect(async (err) => {
  const collection = await client.db("sample_airbnb").collection("listingsAndReviews");

//select
  //const documents = await collection.find().toArray();
  //console.log(documents);

// base existestes
  const databaselist = await client.db().admin().listDatabases();
  console.log('Databases:')
  databaselist.databases.forEach(element => {
    console.log(` - ${element.name}`);
  });

  client.close();
});

