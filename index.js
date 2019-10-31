function goToDraftPage() {
    window.location = "draftpage.html";
}

window.onload = function init() {
    this.document.getElementById("draftpage").addEventListener("click", goToDraftPage);
}