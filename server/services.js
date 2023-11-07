const fs = require('fs');
const path = require('path');

const DATABASE_FILE = path.join(__dirname + "./files/data.txt");

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

                    fs.writeFile(DATABASE_FILE, JSON.stringify(libraryData), function (err, res){
                        if(err){
                            res.send(JSON.stringify({msg:err}));
                        } else {
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
};

module.exports = services;
 
