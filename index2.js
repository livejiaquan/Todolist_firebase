
//這個是原本的版本 




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
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();
    
    function writeData(){
      firebase.database().ref('New Todo').set(localStorage.getItem("New Todo"));
    }
    function readData(){
      firebase.database().ref('New Todo').on('value',function(snapshot){
      localStorage.setItem("New Todo", snapshot.val());
      showTasks();
      })
    }
    // getting all required elements
    const inputBox = document.querySelector(".inputField input");
    const addBtn = document.querySelector(".inputField button");
    const todoList = document.querySelector(".todoList");
    const deleteAllBtn = document.querySelector(".footer button");
    // onkeyup event
    inputBox.onkeyup = ()=>{
      let userEnteredValue = inputBox.value; //getting user entered value
      if(userEnteredValue.trim() != 0){ //if the user value isn't only spaces
        addBtn.classList.add("active"); //active the add button
      }else{
        addBtn.classList.remove("active"); //unactive the add button
      }
    }
    readData(); //calling showTask function
    addBtn.onclick = ()=>{ //when user click on plus icon button
      let userEnteredValue = inputBox.value; //getting input field value
      let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage
      
      if(getLocalStorageData == null){ //if localstorage has no data
        listArray = []; //create a blank array
      }else{
        listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
      }
      listArray.push(userEnteredValue); //pushing or adding new value in array
      localStorage.setItem("New Todo", JSON.stringify(listArray)); //transforming js object into a json string
      showTasks(); //calling showTask function
      addBtn.classList.remove("active"); //unactive the add button once the task added
      writeData();
    }
    
    function showTasks(){
    let getLocalStorageData = localStorage.getItem("New Todo");
    if(getLocalStorageData == null){
      listArray = [];
    }else{
      listArray = JSON.parse(getLocalStorageData); 
    }
    const pendingTasksNumb = document.querySelector(".pendingTasks");
    pendingTasksNumb.textContent = listArray.length; //passing the array length in pendingtask
    if(listArray.length > 0){ //if array length is greater than 0
      deleteAllBtn.classList.add("active"); //active the delete button
    }else{
      deleteAllBtn.classList.remove("active"); //unactive the delete button
    }
    let newLiTag = "";
    listArray.forEach((element, index) => {
      newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputBox.value = ""; //once task added leave the input field blank
    writeData();
    }
    // delete task function
    function deleteTask(index){
      let getLocalStorageData = localStorage.getItem("New Todo");
      listArray = JSON.parse(getLocalStorageData);
      listArray.splice(index, 1); //delete or remove the li
      localStorage.setItem("New Todo", JSON.stringify(listArray));
      showTasks(); //call the showTasks function
    }
    // delete all tasks function
    deleteAllBtn.onclick = ()=>{
      listArray = []; //empty the array
      localStorage.setItem("New Todo", JSON.stringify(listArray)); //set the item in localstorage
      firebase.database().ref('New Todo').set({});// reset firebase
      showTasks(); //call the showTasks function
    }
    inputBox.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
       event.preventDefault();
       addBtn.onclick();
      }
    });