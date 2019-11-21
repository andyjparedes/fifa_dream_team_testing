let numteams; // number of teams in this draft 

/* 
 * load all of the participating teams info
 * team: the current team to load
 * num: the number of the current team
 */
function loadTeam(team, num) {
    // clear the div for error handling
    document.getElementById("team" + num).innerHTML = "";

    // add and display the team name
    let head = document.createElement("p");
    let text = document.createTextNode(localStorage.getItem("index_team" + num));
    head.setAttribute("class", "text");
    head.appendChild(text);
    let header = document.getElementById("team" + num);
    header.appendChild(head);

    // create blocks
    for (let j = 0; j < 4; j++) {
        let block = document.createElement("div");
        block.setAttribute("id", "team" + num + "_block" + (j+1));
        header.appendChild(block);
    }

    // iterate through all of the players and display them
    for (let i = 0; i < localStorage.getItem("index_numplayers"); i++) { // EDIT
        // display players as buttons for enhanced user interface
        let button = document.createElement("BUTTON");
        button.setAttribute("id", "team" + num + "_player" + (i + 1));
        button.setAttribute("value", team[i].NAME);
        button.innerHTML = button.value;

        // put button in it's appropriate block
        if (i < 8) {
            document.getElementById("team" + num + "_block1").appendChild(button);
        }
        if (i > 7 && i < 16) {
            document.getElementById("team" + num + "_block2").appendChild(button);
        }
        if (i > 15 && i < 24) {
            document.getElementById("team" + num + "_block3").appendChild(button);
        }
        if (i > 23 && i < 26) {
            document.getElementById("team" + num + "_block4").appendChild(button);
        } 
    }
}
 
/* 
 * get the team info drom the previous page (local storage)
 */
window.onload = function init() {
    numteams = localStorage.getItem("index_numteams");
    // iterate through all the teams and load them
    for (let i = 1; i <= numteams; i++) {
        let team = JSON.parse(localStorage.getItem("draft_t" + i));
        this.loadTeam(team, i);
    }
}