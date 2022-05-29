const util = require('util')
const multer = require('multer')
const {GridFsStorage}  = require('multer-gridfs-storage')
const dbConfig = require('../config/db');



var storage = new GridFsStorage({

    url:dbConfig.dbUrl+dbConfig.database,

    options:{useNewUrlParser: true, useUnifiedTopology: true},

    file: (req,file)=>{
        const match =["image/png","image/jpeg","image/jpg"];
        if(match.indexOf(file.mimetype)===-1){
            const filename = `${file.originalname}`;
            return filename;
        }
        return{
            bucketName : dbConfig.bucketName,
            filename : `${file.originalname}`
        }

    }

});
var uploadFiles = multer({storage: storage}).array("file",10)
var uploadFileMiddleware = util.promisify(uploadFiles)
module.exports = uploadFileMiddleware;