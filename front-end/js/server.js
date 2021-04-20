function openTab(evt ,page) {
    const pageContent = document.getElementsByClassName("page");
    for (let i = 0; i < pageContent.length; i++) {
      pageContent[i].style.display = "none";  
    }
    document.getElementById(page).style.display = "block";  
}