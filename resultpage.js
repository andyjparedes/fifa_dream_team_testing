let numteams;

function loadTeam(team, num) {
    document.getElementById("team" + num).innerHTML = "";
    let head = document.createElement("p");
    let text = document.createTextNode(localStorage.getItem("index_team" + num));
    head.appendChild(text);

    let header = document.getElementById("team" + num);
    header.appendChild(head);

    //change when first element not counting is fixed
    for (let i = 0; i < localStorage.getItem("index_numplayers") - 1; i++) {
        let button = document.createElement("BUTTON");
        button.setAttribute("id", "team" + num + "_player" + (i + 1));
        button.setAttribute("value", team[i].NAME);
        button.innerHTML = button.value;

        let element = document.getElementById("team" + num);
        element.appendChild(button); 
    }
}

// initialize the listeners for the page
window.onload = function init() {
    numteams = localStorage.getItem("index_numteams");
    for (let i = 1; i <= numteams; i++) {
        let team = JSON.parse(localStorage.getItem("draft_t" + i));
        this.loadTeam(team, i);
    }
}