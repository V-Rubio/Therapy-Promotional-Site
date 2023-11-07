const express = require('express');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Start your server
app.listen(4000, () => {
  console.log('Server is running on port 4000');
});


const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  if (req.url === '/js/view-data.js') {
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    fs.createReadStream('path/to/your/view-data.js').pipe(res);
  } else {
    // Handle other routes or file requests
  }
}).listen(4000);









var data = '[{"name":"Nicole","description": "Nicole is one of the kindest professionals that I have personally worked with.", "rating": 5, "suggestion": "", "location":"Lincroft" }, {"name": "Receptionist", "description": "The receptionists make you feel safe and I have never had any trouble rescheduling an appointment when I needed to.", "rating": 4, "suggestion": "", "location":"Middletown"}, {"name": "Nicole", "description": "Nicole has been a great help in my life and Ive seen so many improvements since working with her.", "rating": 5, "suggestion": "", "location":"Lincroft"}, {"name": "Nicole", "description":  "Would recommend to anyone", "rating": "4", "suggestion": "Wish she offered late weekend availability for working people", "location":"Middletown"}, {"name": "Staff", "description":  "The staff have been nothing but kind. A truly welcoming environment", "rating": 4, "suggestion": "Could use another client bathroom and maybe more tissues out front", "location":"Lincroft"}]';

var jsonObject = JSON.parse(data);

main();

function main() {

    showTable();
}

function showTable() {
    var htmlString = "";

    for (var i = 0; i<jsonObject.length; i++){
        htmlString += "<tr>";
            htmlString += "<td>" + jsonObject[i].name + "</td>";
            htmlString += "<td>" + jsonObject[i].description + "</td>";
            htmlString += "<td>" + jsonObject[i].rating + "</td>";
            htmlString += "<td>" + jsonObject[i].suggestion + "</td>";
            htmlString += "<td>" + jsonObject[i].location + "</td>";
        htmlString += "</tr>";
    }

    //REMEMBER THE HASHTAG - to wipe out the table instead of append which just adds a row 
    $("#reviewTable").html(htmlString);
}