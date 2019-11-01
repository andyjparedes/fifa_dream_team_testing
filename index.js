function inputTeamNames() {
    for (let i = 0; i < document.getElementById("drop1").value; i++) {
        let teamnames = document.getElementById("teamnames");
        let text = document.createTextNode("Team " + (i+1));
        let x = document.createElement("INPUT");
        x.setAttribute("id", "team" + (i+1));
        x.setAttribute("type", "text");
        teamnames.appendChild(text);
        teamnames.appendChild(x);
    }
}

function goToDraftPage() {
    localStorage.setItem("index_numteams", document.getElementById("drop1").value);
    for (let i = 0; i < document.getElementById("drop1").value; i++) {
        localStorage.setItem("index_team" + (i+1), document.getElementById("team" + (i+1)).value);
    }
    localStorage.setItem("index_numplayers", document.getElementById("drop2").value);
    localStorage.setItem("index_createteams", document.getElementById("drop3").value);
    localStorage.setItem("index_draftorder", document.getElementById("drop4").value);
    localStorage.setItem("index_roundtrans", document.getElementById("drop5").value);
    localStorage.setItem("index_version", document.getElementById("drop6").value);
    
    window.location = "resultpage.html";
}

window.onload = function init() {
    this.document.getElementById("draftpage").addEventListener("click", goToDraftPage);
    this.document.getElementById("drop1").addEventListener("change", inputTeamNames);
}
