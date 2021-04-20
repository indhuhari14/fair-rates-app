var svgHead = document.getElementsByTagName('svg')[0];
svgHead.style.display="none";

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