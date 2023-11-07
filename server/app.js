// server.js

const express = require("express");
const cors = require("cors");
    // these need importing npm install -s express/cors 

const app = express();
const path = require('path');
const bodyParser = require("body-parser");

    // app contains express and has those methods 
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');
        // * meaning anyone can use our server without getting a cors error
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
    // extended should be false so we get it short and simple 

app.use("/client", express.static(path.resolve(__dirname+"/../client/")));
    // always put that / in front 

//Make the server 
var server; 
var port = 4000;

//Page listeners (router file) 
var router = require("./router.js");
router(app);
    // ./ is current directory ../ goes up one 

//Service listeners (services.js)
var services = require("./services.js");
services(app);

//Start web server - listen 
server = app.listen(port, function(err){
    if(err) throw err;
    console.log("Listening on Port: " + port);

    //test in terminal - node server/app.js (sitting in route terminal)
    // control + C (cut/end server)

    // browser - http://localhost:4000/
});

