const path = require("path"); 

//Page Listeners 

var router = function (app) {
    app.get("/", function(req, res){
            //200 okie dokey
            // always put that / in front 
        res.status(200).sendFile(path.join(__dirname + "/../client/html/nicoles-therapy.html"));
    });

    app.get("/nicoles-therapy.html", function(req, res){
            //200 okie dokey
        res.status(200).sendFile(path.join(__dirname + "/../client/html/nicoles-therapy.html"));
    });
    app.get("/home", function(req, res){
            //200 okie dokey
        res.status(200).sendFile(path.join(__dirname + "/../client/html/nicoles-therapy.html"));
    });

    app.get("/write-data", function(req, res){
            //200 okie dokey
        res.status(200).sendFile(path.join(__dirname + "/../client/html/write-data.html"));
    });

    app.get("/view-data", function(req, res){
            //200 okie dokey
        res.status(200).sendFile(path.join(__dirname + "/../client/html/view-data.html"));
    });
    app.get("/browse-data", function(req, res){
            //200 okie dokey
        res.status(200).sendFile(path.join(__dirname + "/../client/html/browse-data.html"));
    });


};

module.exports = router;