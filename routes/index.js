const express = require('express')
const router = express.Router();
const uploadController  = require('../controllers/upload')
const getListController = require('../controllers/getfilelist')
const downloadController = require('../controllers/downloadfile')
  
let routes = app=>{
    router.post("/upload",uploadController.uploadFiles);
    router.get("/files",getListController.getFileLists)
    router.get("/files/:name",downloadController.downloadFile)
    
    return app.use("/",router)
}

module.exports = routes;