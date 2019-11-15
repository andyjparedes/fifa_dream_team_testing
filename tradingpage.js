let numteams; // number of teams in this draft
let buttonPressed = false; // used to change background color of buttons
let currentPlayer; // player to be traded for another player

/*
 * load each team participating in the draft
 * team: team to be loaded
 * num: team number of the current team
 */
function loadTeam(team, num) {
    // clear the div for updates to the team
    document.getElementById("team" + num).innerHTML = "";
    // add and display the team name
    let head = document.createElement("p");
    let text = document.createTextNode(localStorage.getItem("index_team" + num));
    head.appendChild(text);
    let header = document.getElementById("team" + num);
    header.appendChild(head);

    // load all of the players on the team and make them be buttons
    for (let i = 0; i < localStorage.getItem("index_numplayers") - 1; i++) { // EDIT
        let button = document.createElement("BUTTON");
        button.setAttribute("id", "team" + num + "_player" + (i + 1));
        button.setAttribute("value", team[i].NAME);
        button.innerHTML = button.value;
        let element = document.getElementById("team" + num);
        element.appendChild(button);
        // add a listener and react appropriately when clicked on
        button.addEventListener("click", function(){
            // player to be traded out
            if (buttonPressed == false) {
                currentPlayer = button.value;
                button.style.background="blue"; // to highlight player
                buttonPressed = true;
            }
            // player to be traded in
            else {
                tradePlayerOption(currentPlayer, button.value);
            }
        });
    }
}

/*
 * ask the user if they want to confirm this trade
 * trade1: player to be traded out
 * trade2: player to be traded in
 */
function tradePlayerOption(trade1, trade2) {
    // pop-up box to ask user to confirm or cancel trade
    if (confirm("Trade " + trade1 + " for " + trade2 + "?")) {
        tradePlayers(trade1, trade2); // trade the players
        // set all buttons back to default color except for Result Page button
        let x = document.getElementsByTagName("BUTTON");
        for (let i = 0; i < x.length; i++) {
            x[i].style.background = "white";
            document.getElementById("resultpage").style.background = "green";
        }
        buttonPressed = false;
    } 
    // trade was cancelled
    else {
        // set all buttons back to default color except for Result Page button
        let x = document.getElementsByTagName("BUTTON");
        for (let i = 0; i < x.length; i++) {
            x[i].style.background = "white";
            document.getElementById("resultpage").style.background = "green";
        }
        buttonPressed = false;
    }
}

/*
 * perform the actual trade
 * trade1: player to be traded out
 * trade2: player to be traded in
 */
function tradePlayers(trade1, trade2) {
    let temp1, temp2; // temp holders for players to be swapped
    let trade1team; // trade-out team
    let trade2team; // trade-in team 
    let y,z; // index of location of players to be swapped

    // search through each team for the traded players
    for (let i = 1; i <= localStorage.getItem("index_numteams"); i++) {
        // get the current team players
        let team = JSON.parse(localStorage.getItem("draft_t" + i));
        // search through each player for the traded players
        for (let j = 0; j < localStorage.getItem("index_numplayers") - 1; j++) { // EDIT
            let n = team[j].NAME.indexOf(trade1); // index for player to be traded out
            let m = team[j].NAME.indexOf(trade2); // index for player to be traded out
            // player-out found
            if (n != -1) {
                temp1 = team[j];
                trade1team = i; 
                y = j;
            }
            // player-in found
            if (m != -1) {
                temp2 = team[j]; 
                trade2team = i;
                z = j;
            }
        }
    }

    // load the old teams
    let team1 = JSON.parse(localStorage.getItem("draft_t" + trade1team));
    let team2 = JSON.parse(localStorage.getItem("draft_t" + trade2team));

    // swap the players
    team1[y] = temp2;
    team2[z] = temp1;

    // update the old teams to the new teams
    localStorage.setItem("draft_t" + trade1team, JSON.stringify(team1));
    localStorage.setItem("draft_t" + trade2team, JSON.stringify(team2));

    // load the teams for display again
    numteams = localStorage.getItem("index_numteams");
    for (let i = 1; i <= numteams; i++) {
        let team = JSON.parse(localStorage.getItem("draft_t" + i));
        loadTeam(team, i);
    }
}

/*
 * go to the Result Page
 */
function goToResultPage() {
    window.location = "resultpage.html";
}

/* 
 * initialize the listeners for the page and load the teams participating
 */
window.onload = function init() {
    this.document.getElementById("resultpage").addEventListener("click", goToResultPage);
    // change when CSS is implemented
    document.getElementById("resultpage").style.background = "green";

    // load each team
    numteams = localStorage.getItem("index_numteams");
    for (let i = 1; i <= numteams; i++) {
        let team = JSON.parse(localStorage.getItem("draft_t" + i));
        this.loadTeam(team, i);
    }
}
