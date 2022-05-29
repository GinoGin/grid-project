const cors = require('cors');
const express = require('express')
const app = express();




const initRoutes = require("./routes/index");

var corsOptions = {
  origin: "http://localhost:8081"
};


app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }));
initRoutes(app);



app.listen(8080,()=>{
    console.log('Server is running');
})