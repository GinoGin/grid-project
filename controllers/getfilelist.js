const MongoClient = require('mongodb').MongoClient;
const dbConfig = require("../config/db")

const mongoClient = new MongoClient(dbConfig.dbUrl);
const baseUrl = "http://localhost:8080/files/"


const getFileLists = async(req,res)=>{
    try{
        await mongoClient.connect();
        const database = mongoClient.db(dbConfig.database);
        const images = database.collection(dbConfig.bucketName+".files");

        const cursor = images.find({});
        if ((await cursor.length) === 0) {
            return res.status(500).send({
                message: "No files found!",
            });
        }

        let fileInfo =[];
        await cursor.forEach((doc)=>{
            fileInfo.push({
                name:doc.filename,
                url:baseUrl+doc.filename
            });
        });
        return res.status(200).send(fileInfo);
    } catch (error) {
        return res.status(500).send({
          message: error.message,
        });
      }
}

module.exports.getFileLists = getFileLists