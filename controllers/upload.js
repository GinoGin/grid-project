const upload = require('../middleware/upload');
const dbConfig = require('../config/db');
const MongoClient = require('mongodb').MongoClient;
const GridFsBucket = require('mongodb').GridFSBucket;
const url=dbConfig.dbUrl;

const uploadFiles = async(req,res)=>{
    try{
        await upload(req,res);
        console.log(req.files);
        if (req.file <0) {
            return res.send({
              message: "You must select a file.",
            });
          }
        return res.send({
            message: "File has been uploaded.",
        });
    }
    catch (error) {
        console.log(error);
        return res.send({
          message: "Error when trying upload image: ${error}",
        });
      }
}


module.exports ={
    uploadFiles
}