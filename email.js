var firebaseConfig = {
    apiKey: "AIzaSyCAUcv-6CJW33tCPDY0cRNr9G_LA-oaxzE",
    authDomain: "todolist-c70f8.firebaseapp.com",
    databaseURL: "https://todolist-c70f8-default-rtdb.firebaseio.com",
    projectId: "todolist-c70f8",
    storageBucket: "todolist-c70f8.appspot.com",
    messagingSenderId: "301021833129",
    appId: "1:301021833129:web:35e4a9eb76118066d446b8",
    measurementId: "G-4D4K05V0TV"
    };
    //init Database
firebase.initializeApp(firebaseConfig);

var email = document.querySelector('.user');
var password = document.querySelector('.psw');
var loginbtn = document.querySelector('.login');
// var logoutbtn = document.querySelector('.logout');

loginbtn.onclick = function(){
firebase.auth().signInWithEmailAndPassword(email.value, password.value)
.then((userCredential) => {
// Signed in
var myUserId = firebase.auth().uid;
var user = userCredential.user;
alert('LOGIN');

window.location.href='index.html';
})
.catch((error) => {
    window.location.href='login.html';
alert('ERROR');
});
}
// logoutbtn.onclick = function(){
// firebase.auth().signOut()
//   .then(function() {
//     // 登出後強制重整一次頁面
//     window.location.href='login.html';
//     //window.location.reload();
//   }).catch(function(error) {
//     console.log(error.message)
//   });
// }
