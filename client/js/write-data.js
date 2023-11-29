var app = angular.module('addReviewsApp', []);

app.controller('addReviewsCtrl', function ($scope, $http){
    $scope.addResults = ""; 

    $scope.submitReview = function () {
        if($scope.name === "" || $scope.description === "" || $scope.rating === ""){
            $scope.addResults = "Name, Description, and Rating are required!"
            return;
        } 

        $http({
            method: "post", 
            url: therapyURL + "/write-record", 
            data: {
                "name": $scope.name, 
                "description": $scope.description,
                "rating": $scope.rating, 
                "suggestion": $scope.suggestion, 
                "location": $scope.location
            }
        }).then(function(response){
            if(response.data.msg === "SUCCESS"){
                // data is from angular, msg is from us
                $scope.addResults = "Review is added!";
                $scope.name = ""; 
                $scope.description = "";
                $scope.rating = ""; 
                $scope.suggestion = "";
                $scope.location = "";
            }else {
                $scope.addResults = response.data.msg;
            }
        }, function(response){
            // ERROR FUNCTION
            console.log(response);
            alert("CANT CONNECT TO SERVER" + response);
        })

        $scope.startNew = function (){
            $scope.addResults = "";
        }
    }
});



//dont need to import config, script url it in HTML

//CREATING THE LISTENER - to add new object 
    // $("#clearInput").click(function(){
    //         $("#name").val("");
    //         $("#description").val("");
    //         $("#rating").val("");
    //         $("#suggestion").val("");
    //         $("#location").val("");
    // });

// $('#submit').click(function() {
    // var name = $('#name').val(); 
    // var description = $('#description').val();
    // var rating = $('#rating').val();
    // var suggestion = $('#suggestion').val();
    // var location = $('#location').val();

    // var review = {
    //     name: name, 
    //     description: description, 
    //     rating: rating, 
    //     suggestion: suggestion, 
    //     location: location
    // };
            // var review = {
            //     name: $('#name').val(), 
            //     description: $('#description').val(), 
            //     rating: $('#rating').val(), 
            //     suggestion: $('#suggestion').val(), 
            //     location: $('#location').val()
            // };

    

    // const firstTextBox = document.getElementById("name");
    // const secondTextBox = document.getElementById("description");
    // const thirdTextBox = document.getElementById("rating");
    // const fourthTextBox = document.getElementById("suggestion");
    // const fifthTextBox = document.getElementById("location");
    // var name = firstTextBox.value;
    // var description = secondTextBox.value;
    // var rating = thirdTextBox.value;
    // var suggestion = fourthTextBox.value;
    // var location = fifthTextBox.value;

    // var input3 = $("#input3").val();
        /* Using jQuery to do the same thing you see above in less lines #for id, none for class*/

    // alert("Submit Button was Pressed.");
    // return false;
    /* Dont do anything else that you would normally do*/

//     $.ajax({
//         url: therapyURL + "/write-record", 
//         type: "post", 
//         data: review, 
//         success: function(response){
//             var data = JSON.parse(response);
//             if(data.msg=="SUCCESS"){
//                 alert("Data Successfully Saved");
//             } else {
//                 console.log(data.msg);
//             }
//         }, 
//         error: function(err){
//             console.log(err);
//         }
//     });
// });

//OLD SUBMIT BUTTON
// $("#submitInput").click(function(){
//     alert("Submit Button was Pressed.");
// });