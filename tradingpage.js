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

    // load all of the players on the team and make them be buttons
    for (let i = 0; i < localStorage.getItem("index_numplayers"); i++) {
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

        // add a listener and react appropriately when clicked on
        button.addEventListener("click", function(){
            // player to be traded out
            if (buttonPressed == false) {
                currentPlayer = button.value;
                button.style.background="white"; // to highlight player
                button.style.color="black";
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
        for (let j = 0; j < localStorage.getItem("index_numteams"); j++) {
            let x = document.getElementById("team" + (j+1));
            let y = x.getElementsByTagName("BUTTON");
            let color;
            switch(j+1) {
                case 1:
                    color = "red";  
                    break;
                case 2:
                    color = "blue";  
                    break;
                case 3:
                    color = "green";  
                    break;
                case 4:
                    color = "yellow";  
                    break;
                case 5:
                    color = "purple";  
                    break;
                case 6:
                    color = "orange";  
                    break;
                default:
                    // nothing
            }
            for (let i = 0; i < y.length; i++) {
                y[i].style.background = color;
                y[i].style.color = "white";
            }
        }
        buttonPressed = false;
    } 
    // trade was cancelled
    else {
        // set all buttons back to default color except for Result Page button
        for (let j = 0; j < localStorage.getItem("index_numteams"); j++) {
            let x = document.getElementById("team" + (j+1));
            let y = x.getElementsByTagName("BUTTON");
            let color;
            switch(j+1) {
                case 1:
                    color = "red";  
                    break;
                case 2:
                    color = "blue";  
                    break;
                case 3:
                    color = "green";  
                    break;
                case 4:
                    color = "yellow";  
                    break;
                case 5:
                    color = "purple";  
                    break;
                case 6:
                    color = "orange";  
                    break;
                default:
                    // nothing
            }
            
            for (let i = 0; i < y.length; i++) {
                y[i].style.background = color;
                y[i].style.color = "white";
            }
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
        for (let j = 0; j < localStorage.getItem("index_numplayers"); j++) {
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

    // load each team
    numteams = localStorage.getItem("index_numteams");
    for (let i = 1; i <= numteams; i++) {
        let team = JSON.parse(localStorage.getItem("draft_t" + i));
        this.loadTeam(team, i);
    }
}
