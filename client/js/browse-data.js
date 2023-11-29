var reviews = []; 
var activeReview = 0; 

var app = angular.module('browseReviewsApp', []);
app.controller('browseReviewsCtrl', function($scope, $http){
    $scope.obj = {}; 
    
        // empty obj
    // $scope.obj = []; 
    $scope.get_records = function (){
        $http({
            method: "get", 
            url: therapyURL + "/get-records"
        }).then(function(response){
            //WHAT HAPPENS AFTER
            console.log( "Response: "+ JSON.stringify(response));
            if(response.data.msg = "SUCCESS"){
                //reviews will return a reviews array and we set it inside reviews array we created 
                reviews = response.data.libraryData;
            
                $scope.obj = reviews[activeReview];
                $scope.showHide();
            } else {
                //DATABASE COULDN'T GIVE DATA BUT WE TALKED TO SERVER 
                alert(response.data.msg);
                console.log(response.data.msg);
            }
        }), function(response){
            //SOMETHING WRONG
            alert(response);
            console.log(response);
        }
    }

    $scope.get_records();

    $scope.changeReview = function(direction) {
        activeReview += direction;
        $scope.obj = reviews[activeReview];
        $scope.showHide();
    }

    $scope.showHide = function() {
        $scope.hidePrev = (activeReview ===0) ? true: false; 
        $scope.hideNext = (activeReview === reviews.length-1) ? true: false;
    }
});