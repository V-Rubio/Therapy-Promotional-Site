const fs = require('fs');
const path = require('path');
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");

var dbURL = "mongodb://localhost:27017";
// const client = new MongoClient(dbURL);


const connection = mongoose.createConnection(
    "mongodb://localhost:27017/",
    {
      dbName: "Therapy-Site",
    },
    (err) =>
      err ? console.log(err) : console.log("Connected to Therapy database")
  );
  
  const newSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    suggestion: {
      type: String,
    },
    rating: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
  });
  
  var collection = connection.model("reviews", newSchema);
  
  module.exports = collection;
  


// make sure that this directory is leading to the right place, otherwise buttons are not going to work

const DATABASE_FILE = path.join(__dirname + "/../server/files/data.txt");

var services = function(app) {
    app.post('/write-record', async function(req, res){
        // await client.connect();
            var id = 'lib' + Date.now();

        
            var id = id;
            var name = req.body.name;
            var description = req.body.description;
            var rating= req.body.rating;
            var suggestion= req.body.suggestion;
            var location= req.body.location;
       

            var newReview = {
                name: name,
                description: description,
                rating: rating,
                suggestion: suggestion,
                location: location
              };

              await collection.insertMany([newReview]);
              res.send(JSON.stringify({msg: "SUCCESS"}));
              
        //array 
    
        // MongoClient.connect(
        //     dbURL,
        //     function (err, client) {
        //       if (err) {
        //         return res.status(201).send(JSON.stringify({ msg: err }));
        //       } else {
        //         var dbo = client.db("Therapy-Site");
      
        //         dbo.collection("reviews").insertOne(newReview, function (err) {
        //           if (err) {
        //             return res.status(201).send(JSON.stringify({ msg: err }));
        //           } else {
        //             return res.status(200).send(JSON.stringify({ msg: "SUCCESS" }));
        //           }
        //         });
        //       }
        //     }
        //   );

        // // node is async, this one is synch
        // if(fs.existsSync(DATABASE_FILE)){
        //     fs.readFile(DATABASE_FILE, "utf-8", function(err, data){
        //         if(err){
        //             res.send(JSON.stringify({msg: err}));
        //         } else {
        //             // console.log("Data: " + JSON.stringify(bookData))
        //             libraryData = JSON.parse(data);

        //             libraryData.push(bookData);

        //             // console.log(JSON.stringify(libraryData));

        //             // not res should be data 
        //             fs.writeFile(DATABASE_FILE, JSON.stringify(libraryData), function (err){
        //                 if(err){
        //                     res.send(JSON.stringify({msg:err}));
        //                 } else {
        //                     // console.log("Will I cause Issues: check services.js:41")
        //                     res.send(JSON.stringify({msg: "SUCCESS"}));
        //                 }
        //             });
        //         }
        //     })
        // } else {
        //     libraryData.push(bookData);

        //     // dont have to read anything because nothing currently exists

        //     fs.writeFile(DATABASE_FILE, JSON.stringify(libraryData), function(err){
        //         if(err){
        //             res.send(JSON.stringify({msg:err}));
        //         } else {
        //             res.send(JSON.stringify({msg: "SUCCESS"}));
        //         }
        //     })
        // }
    });

    app.get("/get-records", async function(req, res){
        try {
            const data = await collection.find();
            // const cursor = db.collection('inventory').find({});
        
            res.send(JSON.stringify({msg: "SUCCESS", data: data}));
          } catch (e) {
            res.send(JSON.stringify({msg: e}));
          }

        // if(fs.existsSync(DATABASE_FILE)){
        //     fs.readFile(DATABASE_FILE, "utf-8", function(err,data){
        //         if(err){
        //             res.send(JSON.stringify({msg: err}));
        //         } else {
        //             var libraryData = JSON.parse(data);
        //             // call this whatever you want - libraryData
        //             res.send(JSON.stringify({msg: "SUCCESS", libraryData: libraryData}));
        //         }
        //     });
        // } else {
        //     var data = [];
        //     res.send(JSON.stringify({msg: "SUCCESS", libraryData: data}));
        // }
    });

    app.delete("/delete-record", async function(req, res){
        // delete in body 
        //read file/ json parse into object, array of data, loop, find that id, take it out of array, json stringify array and send it back to the file and send it back to the client 
        // ellement out of the array splice 
        // get id
        // send the array back with the same write file above 

        var libraryData = []; 
        var reqID = req.query.id;
        try{
          await collection.deleteOne({_id: reqID});
          res.send(JSON.stringify({msg: "SUCCESS"}));
        }catch(e){
          res.send(JSON.stringify({msg: e}));
        }

        // node is async, this one is synch
    //     if(fs.existsSync(DATABASE_FILE)){
    //         fs.readFile(DATABASE_FILE, "utf-8", function(err, data){
    //             if(err){
    //                 res.send(JSON.stringify({msg: err}));
    //             } else {
    //                 // console.log("Data: " + JSON.stringify(bookData))
    //                 libraryData = JSON.parse(data);
    //                 var currentID;
    //                 var found = false; 

    //                 for(var i = 0; i < libraryData.length; i++){
    //                     currentID = libraryData[i].id;
    //                     if (currentID === reqID){
    //                         found = true;
    //                         libraryData.splice(i,1);
    //                         // find id and remove record from an array
    //                         break;
    //                     } 
    //                 }
                    

    //                 // console.log(JSON.stringify(libraryData));

    //                 // not res should be data 
    //                 fs.writeFile(DATABASE_FILE, JSON.stringify(libraryData), function (err){
    //                     if(err){
    //                         res.send(JSON.stringify({msg:err}));
    //                     } else {
    //                         // console.log("Will I cause Issues: check services.js:41")
    //                         res.send(JSON.stringify({msg: "SUCCESS"}));
    //                     }
    //                 });
    //             }
    //         })
    //     } else {

    //         // dont have to read anything because nothing currently exists

    //         alert("ERROR: No File Exists: 404 NOT FOUND");
    //     }
    });


    app.put("/update-review", function (req, res) {
      //update data that already exists 
      var reviewID = req.body.ID;
      var name = req.body.name; 
      var description = req.body.description; 
      var suggestion = req.body.suggestion; 
      var rating = req.body.rating;
      var location = req.body.location;
  
      var r_id = new ObjectId(reviewID);
  
      var search = {_id: r_id}; 
  
      var updateData = {
          $set: {
              name: name, 
              description: description, 
              suggestion: suggestion, 
              rating: rating, 
              location, location
          }
      }
  
      
      try{
        console.log("Here");
        const check = collection.updateOne(search, updateData); 
        console.log(check)

        if(check){
          return res.status(200).send(JSON.stringify({ msg: "SUCCESS"}));
        } else {
          console.log("Error Services 252");
        }
        
        
      } catch(e){
        return res.status(201).send(JSON.stringify({ msg: result }));
      }
               
        });

};

module.exports = services;
 
