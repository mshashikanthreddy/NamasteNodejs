
const  { MongoClient } = require('mongodb');
const url = "mongodb+srv://shashikanth:Umo1PqwvYjAnObn3@backend-projects.ewiwyeo.mongodb.net/"

const client = new MongoClient(url);

const dbName =  "backend-practice";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('User');

 

  const filteredDocs = await collection.updateMany({location : 'bengaluru'},{$set : {height : '5.6'}} );
console.log('Found documents filtered by Location =>', filteredDocs);

  return 'done.';

}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

/* Notes :

create an MongoDB Account 
create a M0 free cluster
create an user
Get the connection String

Install MongoDB compass
  for mongoDB connection Here give "Access from Everywhere" in Network tab then only it will work.
    - create a database(documents)
    - create a collection
        -In there we have fields.

*/