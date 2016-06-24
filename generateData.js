import fs from 'fs';
import dotenv from 'dotenv';
import {
  MongoClient,
  ObjectId
} from 'mongodb';

dotenv.config()


function generate(){
  MongoClient.connect(process.env.MONGO_URL, {
    promiseLibrary: Promise
  })
  .catch(err => console.error(err.stack))
  .then(db => {
    db.collection('characters').find().sort({name:1 }).toArray().then(function(res,err){
      fs.writeFile(__dirname + '/data/characters.json', JSON.stringify(res,null,4), function (err) {
        if (err) return err;
        console.log('<h1>characters > characters.json</h1>')
      });
    })
  });
}

generate();
