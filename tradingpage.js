
function goToDropPage() {
    
    window.location = "drop-addpage.html";
}

// initialize the listeners for the page
window.onload = function init() {
    this.document.getElementById("drop-addpage").addEventListener("click", goToDropPage);
}
