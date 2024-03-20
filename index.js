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

//var myUserId = 0;
var database = firebase.database();
var data;
//Write data
function writeData(list){
  firebase.database().ref('New Todo').set(JSON.stringify(list));
}
//Read Data
function readData(){
  firebase.database().ref('New Todo').on('value',function(snapshot){
  data = snapshot.val();
  checklogin();
  showTasks();
  })
}

//must read first
readData();
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");
// "+"Button active or not
inputBox.onkeyup = function(){
  let userEnteredValue = inputBox.value; 
  if(userEnteredValue.trim() != 0){ 
    addBtn.classList.add("active"); 
  }else{
    addBtn.classList.remove("active"); 
  }
}
// Add todolist
addBtn.onclick = function(){ 
  let userEnteredValue = inputBox.value; 
  showTasks();
  if(data == null){ 
    listArray = []; 
  }else{
    listArray = JSON.parse(data);  
  }
  listArray.push(userEnteredValue); 
  writeData(listArray);
  addBtn.classList.remove("active");  
  readData(); 
}

function showTasks(){
if(data == null){
  listArray = [];
}else{
  listArray = JSON.parse(data); 
}
const pendingTasksNumb = document.querySelector(".pendingTasks");
pendingTasksNumb.textContent = listArray.length; 
if(listArray.length > 0)
  deleteAllBtn.classList.add("active"); 
else
  deleteAllBtn.classList.remove("active"); 
let newLiTag = "";
listArray.forEach((element, index) => {
  newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
});
todoList.innerHTML = newLiTag; 
inputBox.value = ""; 
writeData(listArray);
}

function deleteTask(index){
    showTasks();
    listArray = JSON.parse(data);
    listArray.splice(index, 1); //delete or remove the li
    writeData(listArray);
    readData();
}
deleteAllBtn.onclick = function(){

  firebase.database().ref('New Todo').set({});
  readData(); 
}
inputBox.addEventListener("keyup", function(event) {
  let userEnteredValue = inputBox.value;
  if (event.keyCode === 13 && userEnteredValue.trim()!= 0) {
  event.preventDefault();
  addBtn.onclick();
  }
});
function checklogin(){
var user = firebase.auth().currentUser;

if(user){
}
else{
  alert('PLS LOGIN');
  window.location.href='login.html';
}
}
