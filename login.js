// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCoYBRJiTcvfGNeGy-yoHJmJNxpylsIu80",
    authDomain: "testing-9762b.firebaseapp.com",
    databaseURL: "https://testing-9762b.firebaseio.com",
    projectId: "testing-9762b",
    storageBucket: "testing-9762b.appspot.com",
    messagingSenderId: "205984318356"
  };
  firebase.initializeApp(config);


var mainText = document.getElementById("mainText");
var submitBtn = document.getElementById("submitbtn");
var fireHeading = document.getElementById("fireHeading");

/*retrieving a new heading from the database*/
var firebaseHeadingRef = firebase.database().ref("Heading");
firebaseHeadingRef.on('value',(datasnapshot) =>{
	
	if(fireHeading){
		fireHeading.innerText = datasnapshot.val();
	}
});
function submitClick(){
//reference the platform
var firebaseRef =firebase.database().ref();
var messageText = mainText.value;
//sent your value to the database
firebaseRef.update({"Heading":messageText});
console.log(messageText);
}

$(document).ready(function(){
var rootRef = firebase.database().ref().child("Users");
rootRef.on("child_added",snap =>{
	var name = snap.child("Name").val();
	var email = snap.child("Email").val();
	$("#table_body").append("<tr><td>"+name+"</td><td>"+email+"</td><td><button>REMOVE</button></td></tr>");
});
});
/////////////////////SIGN IN SECTION////////////////////////////////////////////////////////
///////////this section allows the dialog box to be displayed////////////////////////////////
firebase.auth().onAuthStateChanged(function(user){
	if(user){
		// user is logged in
		$(".login-cover").hide();
		var dialog = document.querySelector('#loginDialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);  
    }
	 dialog.close();
	}else{
		//no user is logged in
		$(".login-cover").show();
		var dialog = document.querySelector('#loginDialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
	  
    }
	 dialog.showModal();
	  }
});

//This is the loggin process
$("#loginBtn").on('click',function(){
		var email = $("#loginEmail").val();
		var password = $("#loginPassword").val();
		if(email !="" && password !=""){
			$("#loginProgress").show();
            $("#loginBtn").hide();
			
firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
    $("#loginError").show().text(error.message);
		$("#loginProgress").hide();
            $("#loginBtn").show();
			
        });
		}
  // ...
});			
//This is the log-out process
$('#signoutBtn').on('click',function(){
	firebase.auth().signOut().then(function(){
		//sign-out successfull
	}),
	function(error){
	   //An error happened
      alert(error.message);			
		};
});
////////////////////////CONTACT FORM SECTION///////////////////////////////////////////
// reference messages collection
var messageRef = firebase.database().ref('messages');
//listen for form Submit

if(document.getElementById('contactForm')){
	document.getElementById('contactForm').addEventListener("submit",submitForm);
}
// submit form
function submitForm(e){
	e.preventDefault();
	//Get value
	var name = getInputVal('name'); 	
	var company = getInputVal('company');
	var email = getInputVal('email');
	var phone = getInputVal('phone');
	var message = getInputVal('message');
	 
//save message
	saveMessage(name,company,email,phone,message);
	
	//show alertdo
	document.querySelector(".alert").style.display="block";
	//hide alert after 3 second
	setTimeout(function(){
	document.querySelector(".alert").style.display="none";
	},3000);
	document.getElementById("contactForm").reset();
	
}
//get get values from the form
function getInputVal(id){
	if(!id) return;
	return document.getElementById(id).value;	
}
//save the messages to the database 
function saveMessage(name,company,email,phone,message){
	var newMessageref = messageRef;
	newMessageref.push({
		name:name,
		company:company,
		email:email,
		phone:phone,
		message:message	
	});
}






