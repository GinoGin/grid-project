const MongoClient = require('mongodb').MongoClient
const dbConfig = require('../config/db')
const GridFSBucket = require('mongodb').GridFSBucket;

const mongoClient =new MongoClient(dbConfig.dbUrl)


const downloadFile =async ( req,res)=>{
    try{
        await mongoClient.connect();
        const database = (await mongoClient).db(dbConfig.database);
        const bucket = new GridFSBucket(database,{
            bucketName :dbConfig.bucketName
        });
        let downloadStream =await bucket.openDownloadStreamByName(req.params.name);
        downloadStream.pipe(res)
        
    }catch (error) {
        return res.status(500).send({
          message: error.message,
        });
      }
}

module.exports.downloadFile = downloadFile;