// const mongodb = require('mongodb');

// const MongoClient = mongodb.MongoClient;

// let database;

// async function connectToDatabase() {
//   const client = await MongoClient.connect(
//     'mongodb://localhost:27017'
//   );
//   database = client.db('auth-demo');
// }

const mysql = require('mysql2/promise');

var pool = mysql.createPool({
    host : "localhost",
    user : "root",
    password:"Yuvraj",
    database:"project"
  })


module.exports = pool;
  // sessionStore:sessionStore};


// function getDb() {
//   if (!database) {
//     throw { message: 'You must connect first!' };
//   }
//   return pool;
// }

// module.exports = {
//   connectToDatabase: connectToDatabase,
//   getDb: getDb,
// };
