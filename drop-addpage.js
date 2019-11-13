
function goToResultPage() {
    
    window.location = "resultpage.html";
}

// initialize the listeners for the page
window.onload = function init() {
    this.document.getElementById("resultpage").addEventListener("click", goToResultPage);
}
