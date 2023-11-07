//CREATING THE LISTENER - to add new object 
$("#clearInput").click(function(){
        $("#input1").val("");
        $("#input2").val("");
        $("#input3").val("");
});

const buttonListener = document.getElementById("submit");
buttonListener.addEventListener("click", function() {
    const firstTextBox = document.getElementById("name");
    const secondTextBox = document.getElementById("description");
    const thirdTextBox = document.getElementById("rating");
    const fourthTextBox = document.getElementById("suggestion");
    const fifthTextBox = document.getElementById("location");
    var name = firstTextBox.value;
    var description = secondTextBox.value;
    var rating = thirdTextBox.value;
    var suggestion = fourthTextBox.value;
    var location = fifthTextBox.value;

    var input3 = $("#input3").val();
    /* Using jQuery to do the same thing you see above in less lines #for id, none for class*/

    alert("Submit Button was Pressed.");
    return false;
    /* Dont do anything else that you would normally do*/
});

//OLD SUBMIT BUTTON
// $("#submitInput").click(function(){
//     alert("Submit Button was Pressed.");
// });