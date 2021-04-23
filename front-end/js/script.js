var svgHead = document.getElementsByTagName('svg')[0];
svgHead.style.display="none";

const pageContent = document.getElementsByClassName("page");
const navMenu = document.getElementsByClassName("menu");
let isActive = false;
pageContent[0].classList.add("active-page");
for(let i = 0;i < pageContent.length; i++){
  navMenu[i].addEventListener("click" , () => {
    checkActivePage(i)
    pageContent[i].classList.add("active-page");
    console.log(pageContent[i]);
  });
  if(i==0){
    homeFunctionality();
  }
  else if(i==1){
    Appfunctionality();
  }
  else if(i==2){
    docFunctionality();
  }
}
function checkActivePage(index){
  for(let j = 0;j < pageContent.length; j++){
    if(j!=index){
      let isActive = pageContent[j].classList.contains("active-page");
      if(isActive == true){
        pageContent[j].classList.remove("active-page");
      }
    }
  }
}

const checkBoxHold = document.querySelectorAll(".check-box-hold");
const inputIcon = document.querySelectorAll(".icon");
const checkBoxTxt = document.querySelectorAll("input[type=checkbox]");
const checkBoxBig = document.getElementById("check-box-big").querySelectorAll("input[type=checkbox]");
for(let i=0;i< checkBoxHold.length ;i++){
    let x=i;
    checkBoxTxt[x].addEventListener('change', ()=>{
        if(checkBoxTxt[x].checked == true){
            checkBoxHold[x].classList.add('active-check-box');
        }
        else{
            checkBoxHold[x].classList.remove('active-check-box');
            
        }
        
    });
}
for(let j=0;j< checkBoxBig.length ;j++){
  let y=j;
  checkBoxBig[y].addEventListener('change', ()=>{
      if(checkBoxBig[y].checked == true){
          inputIcon[y].classList.add('active-icon');
      }
      else{
          inputIcon[y].classList.remove('active-icon');
      }
      
  });
}


const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".option-container");

const optionsList = document.querySelectorAll(".option");

selected.addEventListener("click", () => {
  optionsContainer.classList.toggle('active');
});

optionsList.forEach(o => {
  o.addEventListener("click", () => {
    selected.innerHTML = o.querySelector("label").innerHTML;
    optionsContainer.classList.remove('active');
  });
});

const photoBtn = document.getElementById("photo-id-btn");
const addProofBtn = document.getElementById("add-proof-btn");
const photoid = document.getElementById("photoid");
const addressProof = document.getElementById("addressproof");
const isContainsActive = addProofBtn.classList.contains('active-button');
photoBtn.addEventListener('click', () =>{
  addressProof.style.display="none";
  photoid.style.display="block";
  addProofBtn.classList.remove('active-button');
  photoBtn.classList.add('active-button');
  });
  
  addProofBtn.addEventListener('click', () =>{
    addressProof.style.display="block";
    photoid.style.display="none";
    addProofBtn.classList.add('active-button');
    photoBtn.classList.remove('active-button');
  });

  const uploadId = document.querySelector(".upload-id");
  var fileInput = document.getElementById("select-file");
  var uploadFile = document.querySelector(".upload-file-info")
  var fileValues = [];
  let isFilebig = false;
  let isDroped  = false;
  fileInput.addEventListener("change",showFileInfo);
  function showFileInfo(event){
    uploadId.classList.add("upload-field-active")
    if(isDroped == true){
      var fileInput = event.dataTransfer;
      isDroped = false;
    }
    else{
      var fileInput = event.srcElement;
    }
    var fileLength = fileInput.files.length;
    if(fileLength>10){
      alert("You cannot upload more than 10 file");
    }
    else{
      uploadFile.classList.add("overflow");
      for(let i = 0;i < fileLength; i++){
        let z=i;
        var fileName = fileInput.files[z].name; 
        var fileFormat = fileName.split('.').pop();
        var fileSize = fileInput.files[z].size;
        var button = document.createElement("button");
        button.setAttribute("class" , "delete-btn");
        var deleteIcon = document.createElement("img");
        var fileIcon = document.createElement("img");
        if(fileFormat == "png" || fileFormat == "jpg"){
          fileIcon.setAttribute("src" , "../front-end/img/images-color.png");
          fileIcon.setAttribute("class" , "image-icon");
        }
        else if(fileFormat == "pdf"){
          fileIcon.setAttribute("src" , "../front-end/img/pdf-color.png");
          fileIcon.setAttribute("class" , "pdf-icon");
        }
        deleteIcon.setAttribute("src" , "../front-end/img/delete.png");
        deleteIcon.setAttribute("class" , "delete-icon");
        deleteIcon = button.appendChild(deleteIcon);
        if (fileSize >= 1073741824){ 
        alert("File too Big, please select a file less than 3MB");
        isFilebig = true;
        }
        else if (fileSize >= 1048576){ 
        fileSize = (fileSize / 1048576).toFixed(2);
          if(fileSize>3){
            alert("File too Big, please select a file less than 3MB");
            isFilebig = true;
          }
          else{
            fileSize = fileSize + "MB";
          } 
        }
        else if (fileSize >= 1024){ 
          fileSize = (fileSize / 1024).toFixed(2) + " KB";
        }
        else if (fileSize > 1){ 
          fileSize = fileSize + " bytes"; 
        }
        else if (fileSize == 1){ 
          fileSize = fileSize + " byte"; 
        }
        if (isFilebig == false) {
          fileValues.push([]);
          fileValues[z][0] = fileIcon;
          fileValues[z][1] = fileName;
          fileValues[z][2] = fileSize;
          fileValues[z][3] = fileFormat;
          fileValues[z][4] = "UPLOADED";
          fileValues[z][5] = button;	
        }
        else{
          isFilebig = false;
        } 
      }  
      for(let j = 0;j < fileLength; j++){
      var ul = document.createElement("ul");
      ul.setAttribute("class" , "fileField");
      for(let k=0; k < 6; k++){
        var li = document.createElement("li");
        if(k==0||k==5){
          li.appendChild(fileValues[j][k]);
        }
        else{
          li.appendChild(document.createTextNode(fileValues[j][k]));
        }
        ul.appendChild(li);
      }	
      uploadId.appendChild(ul);
      } 
    }
    const deleteBtn = document.querySelectorAll(".delete-btn");
    const fileList = document.querySelector(".upload-id").querySelectorAll("ul");
    console.log(fileList);
    for(let m=0;m<fileLength;m++){
      deleteBtn[m].addEventListener('click',() => {
        fileList[m].classList.add('delete-ul');
        console.log("remove");
      })
    }
  }
  
  const dropArea = document.querySelector(".photo-id").querySelector(".upload-box");
  dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("highlight");
  });
  ["dragleave", "dragend"].forEach((type) => {
    dropArea.addEventListener(type, (e) => {
      dropArea.classList.remove("highlight");
    });
  });
  dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      isDroped = true;
      showFileInfo(e);
    }
  });   
  const dropAreaAdd = document.querySelector(".photo-id").querySelector(".upload-box");
  dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("highlight");
  });
  ["dragleave", "dragend"].forEach((type) => {
    dropArea.addEventListener(type, (e) => {
      dropArea.classList.remove("highlight");
    });
  });
  dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      isDroped = true;
      showFileInfo(e);
    }
  });   


function homeFunctionality(){
  var inputTextHome = document.getElementById("home").querySelectorAll("input[type=text]");
  var errorTextHome = document.getElementById("home").querySelectorAll(".error-txt");
  var nextBtnHome = document.getElementById("home").querySelector(".next");
  nextBtnHome.disabled = true;
  let isHomeFilled = false;
  let validCount = 0;
  let isFocused = false;
  for(let j=0; j<inputTextHome.length;j++){
    inputTextHome[j].addEventListener("focus" , () => {
       isFocused = true;
    });
    inputTextHome[j].addEventListener("input" , () => {
      if(inputTextHome[j].value){
        inputTextHome[j].classList.remove("invalid");
        errorTextHome[j].style.display = "none";
      }
    });  
    inputTextHome[j].addEventListener("blur" , () => {
      if(inputTextHome[j].value == ""){
        inputTextHome[j].classList.add("invalid");
        nextBtnHome.disabled = true;
        isHomeFilled = false;
        errorTextHome[j].style.display = "block";
      }
      else if(inputTextHome[j].value){
        validCount++;
        if(validCount>=inputTextHome.length){
          isHomeFilled = true;
          nextBtnHome.disabled = false;
          nextBtnHome.addEventListener("click" , () =>{ 
            let currentIndex = 0;
            pageContent[currentIndex].classList.remove("active-page");
            pageContent[currentIndex+1].classList.add("active-page");
          });
        }
      } 
    });
    return isHomeFilled;
  }
}
function findActivepage(){
  for(let i = 0; i < pageContent.length; i++){
    let isActivePage = false;
    isActivePage = pageContent[i].classList.contains("active-page");
    if(isActivePage == true){
      return i;
    }
  }
}
function Appfunctionality() {
  var inputTextApp = document.querySelector(".col-right").querySelectorAll("input[type=text]");
  var errorTextApp = document.getElementById("application").querySelectorAll(".error-txt");
  var nextBtnApp = document.getElementById("application").querySelector(".next");
  var prevBtnApp = document.getElementById("application").querySelector(".prev");
  nextBtnApp.disabled = true;
  let validCount = 0;
  let isFocused = false;
  for(let k=0;k<inputTextApp.length;k++){
    inputTextApp[k].disabled = false;
    inputTextApp[k].addEventListener("focus" , () => {
      isFocused = true;
    });
    inputTextApp[k].addEventListener("input" , () => {
      if(inputTextApp[k].value){
        inputTextApp[k].classList.remove("invalid");
        errorTextApp[k].style.display = "none";
      }
    });  
    inputTextApp[k].addEventListener("blur" , () => {
      if(inputTextApp[k].value == ""){
        validCount--;
        inputTextApp[k].classList.add("invalid");
        nextBtnApp.disabled = true;
        isAppFilled = false;
        errorTextApp[k].style.display = "block";
      }
      else if(inputTextApp[k].value){
        validCount++;
        if(validCount>=inputTextApp.length){
          isAppFilled = true;
          nextBtnApp.disabled = false;
        }
      } 
    });
  }  
  nextBtnApp.addEventListener("click" , () =>{ 
    let currentIndex = 1;
    let validateS = validateCheckBoxS();
    let validateL = validateCheckBoxL();
    let validateDate = validateDob();
    let validateList = validateOptions(); 
    console.log("DOB CHANGED"+validateDate);
    if(validateS == true && validateL == true && validateDate == true && validateList == true){
      pageContent[currentIndex].classList.remove("active-page");
      pageContent[currentIndex+1].classList.add("active-page");
    }
  });
  prevBtnApp.addEventListener("click" ,() =>{
    let currentIndex = 1;
    pageContent[currentIndex].classList.remove("active-page");
    pageContent[currentIndex-1].classList.add("active-page");
  });
  
}
function docFunctionality() {
  var nextBtnDoc = document.getElementById("document").querySelector(".next");
  var prevBtnDoc = document.getElementById("document").querySelector(".prev");
  nextBtnDoc.addEventListener("click" , () =>{ 
    let currentIndex = 2;
    pageContent[currentIndex].classList.remove("active-page");
    pageContent[currentIndex+1].classList.add("active-page");
  });
  prevBtnDoc.addEventListener("click" ,() =>{
    let currentIndex = 2;
    pageContent[currentIndex].classList.remove("active-page");
    pageContent[currentIndex-1].classList.add("active-page");
  });
}  
  
  function validateCheckBoxS(){
    var checkBoxS = document.querySelector(".house-type").querySelectorAll("input[type=checkbox]");
    var errortxtS = document.querySelector(".house-type").querySelector(".error-txt");
    let isCheckedS = false;
    for(let x = 0;x < checkBoxS.length;x++){
      if(checkBoxS[x].checked){
        isCheckedS = true;
        errortxtS.style.display = "none";
        return isCheckedS;
      }
      else{
        isCheckedS = false;
        errortxtS.style.display = "block";
      }
      checkBoxS.forEach(e => {
        e.addEventListener("change", () => {
          errortxtS.style.display = "none";
        });  
      }); 
    }
}
function validateCheckBoxL(){
  var checkBoxL = document.querySelector(".feature").querySelectorAll("input[type=checkbox]");
  var errortxtL = document.querySelector(".feature").querySelector(".error-txt");
  let isCheckedL = false;
  for(let y = 0;y < checkBoxL.length;y++){
    if(checkBoxL[y].checked){
      isCheckedL = true;
      errortxtL.style.display = "none";
      return isCheckedL;
    }
    else{
      isCheckedL = false;
      errortxtL.style.display = "block";
    }
    checkBoxL.forEach(e => {
      e.addEventListener("change", () => {
        errortxtL.style.display = "none";
      });  
    });    
  }    
}
function validateDob() {
  var dateOfBirth = document.querySelector(".col-left").querySelector("input[type=text]");
  var today = new Date();
  let month = String(today.getMonth()+ 1).padStart(2, '0');
  let myDate = (today.getUTCDate()) + " / " + month + " / " + (today.getUTCFullYear());
  var errorDob = document.querySelector(".col-left").querySelector(".error-txt");
  let isDobChanged = false;
  console.log(myDate);
  dateOfBirth.addEventListener("change", () =>{
    console.log("DB3"+dateOfBirth.value);
    errorDob.style.display = "none";
    isDobChanged = true;
    console.log(isDobChanged);
    return isDobChanged;
  });
  if(dateOfBirth.value == myDate){
    console.log("Same");
    isDobChanged = false;
    errorDob.style.display = "block";
    return isDobChanged;
  }
  if(dateOfBirth.value != myDate){
    isDobChanged = true;
    return isDobChanged;
  }
}
function validateOptions() {
  var options = document.querySelector(".application-page").querySelector(".selected");
  var option = document.querySelector(".select-hold");
  var errorOptions = document.querySelector(".select-hold").querySelector(".error-txt");
  let isSelected = false;
  option.addEventListener("change", () => {
    errorOptions.style.display = "none";
    console.log("Its changing");
    return isSelected;
  }); 
  console.log(options.innerText);
  if(options.innerText == "Select Duration"){
    errorOptions.style.display = "block";
    return isSelected;
  }
  else{
    errorOptions.style.display = "none";
    isSelected = true;
    return isSelected;
  }
   
}
