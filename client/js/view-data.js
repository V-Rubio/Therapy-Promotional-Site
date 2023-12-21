// const express = require('express');
// const app = express();

// // Serve static files from the 'public' directory
// app.use(express.static('public'));

// // Start your server
// app.listen(4000, () => {
//   console.log('Server is running on port 4000');
// });


// const http = require('http');
// const fs = require('fs');

// http.createServer((req, res) => {
//   if (req.url === '/js/view-data.js') {
//     res.writeHead(200, { 'Content-Type': 'text/javascript' });
//     fs.createReadStream('path/to/your/view-data.js').pipe(res);
//   } else {
//     // Handle other routes or file requests
//   }
// }).listen(4000);









// var data = '[{"name":"Nicole","description": "Nicole is one of the kindest professionals that I have personally worked with.", "rating": 5, "suggestion": "", "location":"Lincroft" }, {"name": "Receptionist", "description": "The receptionists make you feel safe and I have never had any trouble rescheduling an appointment when I needed to.", "rating": 4, "suggestion": "", "location":"Middletown"}, {"name": "Nicole", "description": "Nicole has been a great help in my life and Ive seen so many improvements since working with her.", "rating": 5, "suggestion": "", "location":"Lincroft"}, {"name": "Nicole", "description":  "Would recommend to anyone", "rating": "4", "suggestion": "Wish she offered late weekend availability for working people", "location":"Middletown"}, {"name": "Staff", "description":  "The staff have been nothing but kind. A truly welcoming environment", "rating": 4, "suggestion": "Could use another client bathroom and maybe more tissues out front", "location":"Lincroft"}]';

// var jsonObject = JSON.parse(data);

var app = angular.module('viewReviewsApp', []);
app.controller('viewReviewsCtrl', function($scope, $http){
    $scope.obj = {}; 
    $scope.reviews = [];
    $scope.names = [];
    

$scope.retrieveData = function(){ 
  //ajax to get the data from the server 
  $http({
    method: 'get', 
    url: therapyURL + "/get-records" 
  }).then(function(response){
      // var data = JSON.parse(response.data.data);
      // console.log(data.data)
      if(response.data.msg == "SUCCESS"){
        // $scope.showTable(response.data.data);
        // window.location.reload();
        $scope.reviews = response.data.data; 
        $scope.names = getTypes($scope.reviews);
        $scope.selectedType = $scope.reviews[0].name;
      } else {
        console.log("The else statement")
        console.log(response.msg);
      }
    },function(e){
    // error cant talk to the server because crash
      console.log("Cannot Get Records");
      console.log(JSON.stringify(e));
    });
}

// sending and recieving 
$scope.showTable = function(jsonObject) {
    var htmlString ='';

    for (var i = 0; i<jsonObject.length; i++){
        htmlString += "<tr>";
            htmlString += "<td>" + jsonObject[i].name + "</td>";
            htmlString += "<td>" + jsonObject[i].description + "</td>";
            htmlString += "<td>" + jsonObject[i].rating + "</td>";
            htmlString += "<td>" + jsonObject[i].suggestion + "</td>";
            htmlString += "<td>" + jsonObject[i].location + "</td>";
            htmlString += "<td> <button class='delete-button' data-ng-click='deleteReview()' data-id='" + jsonObject[i]._id+ "'> Delete </button> </td>";
        htmlString += "</tr>";
    }

    //REMEMBER THE HASHTAG - to wipe out the table instead of append which just adds a row 
    // $("#reviewTable").html(htmlString);
    $scope.htmlString;
    // $scope.activateDelete();

}

$scope.editReview = function(reviewNumber){
  $scope.name = $scope.reviews[reviewNumber].name;
  $scope.description = $scope.reviews[reviewNumber].description;
  $scope.suggestion = $scope.reviews[reviewNumber].suggestion;
  $scope.rating = $scope.reviews[reviewNumber].rating;
  $scope.location = $scope.reviews[reviewNumber].location;
  $scope.reviewID = $scope.reviews[reviewNumber]['_id'];

  $scope.hideTable = true; 
  $scope.hideForm = false; 
}

$scope.cancelUpdate = function(){
  $scope.hideTable = false; 
  $scope.hideForm = true; 
}

$scope.updateReview = function(){
  if($scope.name === "" || $scope.description === "" || $scope.rating === ""){
      $scope.addResults = "Name, Description, and Rating are required!"
      return;
  } 
  console.log({
      'ID': $scope.reviewID, 
      'name': $scope.name, 
      'description': $scope.description, 
      'suggestion': $scope.suggestion, 
      'rating': $scope.rating,
      'location': $scope.location
  })

  $http({
      method: "put", 
      url: therapyURL + '/update-review', 
      data: {
        'ID': $scope.reviewID, 
        'name': $scope.name, 
        'description': $scope.description, 
        'suggestion': $scope.suggestion, 
        'rating': $scope.rating,
        'location': $scope.location
      }
  }). then(function(response){
      console.log(response);
      if (response.data.msg === "SUCCESS"){
          $scope.cancelUpdate();

          $scope.retrieveData();

          $scope.name = "";
          $scope.description = "";
          $scope.suggestion = "";
          $scope.rating = "";
          $scope.location = "";

      }
  }, function(response){
      console.log(JSON.stringify(response));
  })

}

      // $(".delete").click(function() {
      //   alert("Button Clicked");
      //   // var name = $(this).attr("name");
      //   // alert("delete "+ name);
      // });

// CANT PPUT A LISTENER ON AN OBKECT THAT DOES NOT EXIST, NEED A FUNCTION CALL AFTER THE TABLE CREATED TO ACTIVATE LISTENER 
      // $('.deleteVD').click(function(){
      //   // $(this).parent().parent().remove(); //Deleting the Row (tr) Element
      //   console.log("Button Clicked");
      //   alert(JSON.stringify("Button Clicked!"));
      // });

      // $scope.activateDelete = function(){
  $scope.deleteReview = function(reviewID){

    $http({
      method: "delete",
      url: therapyURL + "/delete-record",  
      params: {id: reviewID} 
    }).then(function(response){
        if(response = "SUCCESS"){
          $scope.retrieveData();
          window.location.reload();

        }else {
          alert(response);
        }
      })
    }, function(err){
      alert("Error: " + JSON.stringify(err));
    }

    $scope.redrawTable = function(){
      console.log("REDRAW TABLE")
      var name = $scope.selectedType.value;
      console.log(name);

      $http({
          method: 'get', 
          url: therapyURL + '/get-reviewsByType', 
          params: {name: name}
      }).then(function(response){
          if(response.data.msg === "SUCCESS"){
              $scope.reviews = response.data.reviews;
          }
      }, function(response){
          console.log(JSON.stringify(response));
      });
  }



$scope.retrieveData();


});
// $("#delete").click(function(){


//   // $("#name").val("");
//   // $("#description").val("");
//   // $("#rating").val("");
//   // $("#suggestion").val("");
//   // $("#location").val("");
// });

// $(this).closest("tr").remove();

function getTypes(reviewsTableData){
  var typesExists; 
  var length = reviewsTableData.length;
  

  typesArray = [{value:"", display: "ALL"}];

  for(var i=0; i<length; i++){
      typesExists = typesArray.find(function(element){
          return element.value === reviewsTableData[i].name;
      });

      if(typesExists){
          continue;
      } else {
          typesArray.push({value: reviewsTableData[i].name, display: reviewsTableData[i].name.toUpperCase()});
      }
  }

  return typesArray;
}