const fs = require('fs');
const path = require('path');

// make sure that this directory is leading to the right place, otherwise buttons are not going to work

const DATABASE_FILE = path.join(__dirname + "/../server/files/data.txt");

var services = function(app) {
    app.post('/write-record', function(req, res){
        var id = 'lib' + Date.now();

        var bookData = {
            id: id, 
            name: req.body.name, 
            description: req.body.description, 
            rating: req.body.rating,
            suggestion: req.body.suggestion,
            location: req.body.location
        };

        //array 
        var libraryData = []; 

        // node is async, this one is synch
        if(fs.existsSync(DATABASE_FILE)){
            fs.readFile(DATABASE_FILE, "utf-8", function(err, data){
                if(err){
                    res.send(JSON.stringify({msg: err}));
                } else {
                    // console.log("Data: " + JSON.stringify(bookData))
                    libraryData = JSON.parse(data);

                    libraryData.push(bookData);

                    console.log(JSON.stringify(libraryData));
                    fs.writeFile(DATABASE_FILE, JSON.stringify(libraryData), function (err, res){
                        if(err){
                            res.send(JSON.stringify({msg:err}));
                        } else {
                            console.log("Will I cause Issues: services.js:41")
                            res.send(JSON.stringify({msg: "SUCCESS"}));
                        }
                    });
                }
            })
        } else {
            libraryData.push(bookData);

            // dont have to read anything because nothing currently exists

            fs.writeFile(DATABASE_FILE, JSON.stringify(libraryData), function(err){
                if(err){
                    res.send(JSON.stringify({msg:err}));
                } else {
                    res.send(JSON.stringify({msg: "SUCCESS"}));
                }
            })
        }
    });

    app.get("/get-records", function(req, res){
        if(fs.existsSync(DATABASE_FILE)){
            fs.readFile(DATABASE_FILE, "utf-8", function(err,data){
                if(err){
                    res.send(JSON.stringify({msg: err}));
                } else {
                    var libraryData = JSON.parse(data);
                    // call this whatever you want - libraryData
                    res.send(JSON.stringify({msg: "SUCCESS", libraryData: libraryData}));
                }
            });
        } else {
            var data = [];
            res.send(JSON.stringify({msg: "SUCCESS", libraryData: data}));
        }
    });
};

module.exports = services;
 
