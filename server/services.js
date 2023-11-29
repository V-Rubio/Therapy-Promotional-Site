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

                    // console.log(JSON.stringify(libraryData));

                    // not res should be data 
                    fs.writeFile(DATABASE_FILE, JSON.stringify(libraryData), function (err){
                        if(err){
                            res.send(JSON.stringify({msg:err}));
                        } else {
                            // console.log("Will I cause Issues: check services.js:41")
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

    app.delete("/delete-record", function(req, res){
        // delete in body 
        //read file/ json parse into object, array of data, loop, find that id, take it out of array, json stringify array and send it back to the file and send it back to the client 
        // ellement out of the array splice 
        // get id
        // send the array back with the same write file above 

        var libraryData = []; 
        var reqID = req.body.deleteID;
        console.log("REQUEST ID IS: "+reqID);

        // node is async, this one is synch
        if(fs.existsSync(DATABASE_FILE)){
            fs.readFile(DATABASE_FILE, "utf-8", function(err, data){
                if(err){
                    res.send(JSON.stringify({msg: err}));
                } else {
                    // console.log("Data: " + JSON.stringify(bookData))
                    libraryData = JSON.parse(data);
                    var currentID;
                    var found = false; 

                    for(var i = 0; i < libraryData.length; i++){
                        currentID = libraryData[i].id;
                        if (currentID === reqID){
                            found = true;
                            libraryData.splice(i,1);
                            // find id and remove record from an array
                            break;
                        } 
                    }
                    

                    // console.log(JSON.stringify(libraryData));

                    // not res should be data 
                    fs.writeFile(DATABASE_FILE, JSON.stringify(libraryData), function (err){
                        if(err){
                            res.send(JSON.stringify({msg:err}));
                        } else {
                            // console.log("Will I cause Issues: check services.js:41")
                            res.send(JSON.stringify({msg: "SUCCESS"}));
                        }
                    });
                }
            })
        } else {

            // dont have to read anything because nothing currently exists

            alert("ERROR: No File Exists: 404 NOT FOUND");
        }
    });

};

module.exports = services;
 
