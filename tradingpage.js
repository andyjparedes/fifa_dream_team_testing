let numteams;
let buttonPressed = false;
let currentPlayer;

function goToDropPage() {
    
    window.location = "resultpage.html";
}

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
        button.addEventListener("click", function(){
            if (buttonPressed == false) {
                currentPlayer = button.value;
                button.style.background="blue";
                buttonPressed = true;
            }
            else {
                tradePlayerOption(currentPlayer, button.value, button);
            }
        });
    }
}

function tradePlayerOption(trade1, trade2, button) {
    if (confirm("Trade " + trade1 + " for " + trade2 + "?")) {
        tradePlayers(trade1, trade2);
        let x = document.getElementsByTagName("BUTTON");
          for (let i = 0; i < x.length; i++) {
              x[i].style.background="white";
              document.getElementById("resultpage").style.background = "green";
          }
          buttonPressed = false;
      } else {
          //currentPlayer = null;
          let x = document.getElementsByTagName("BUTTON");
          for (let i = 0; i < x.length; i++) {
              x[i].style.background="white";
              document.getElementById("resultpage").style.background = "green";
          }
          buttonPressed = false;
      }
}

function tradePlayers(trade1, trade2) {
    let temp1, temp2;
    let trade1team;
    let trade2team;
    let n,m;
    let y,z;
    for (let i = 1; i <= localStorage.getItem("index_numteams"); i++) {
        let team = JSON.parse(localStorage.getItem("draft_t" + i));
        for (let j = 0; j < localStorage.getItem("index_numplayers") - 1; j++) {
            n = team[j].NAME.indexOf(trade1);
            m = team[j].NAME.indexOf(trade2);
            if (n != -1) {
                temp1 = team[j];
                trade1team = i;
                y = j;
            }
            if (m != -1) {
                temp2 = team[j];
                trade2team = i;
                z = j;
            }
        }
    }
    let team1 = JSON.parse(localStorage.getItem("draft_t" + trade1team));
    let team2 = JSON.parse(localStorage.getItem("draft_t" + trade2team));

    team1[y] = temp2;
    team2[z] = temp1;

    localStorage.setItem("draft_t" + trade1team, JSON.stringify(team1));
    localStorage.setItem("draft_t" + trade2team, JSON.stringify(team2));

    numteams = localStorage.getItem("index_numteams");
    for (let i = 1; i <= numteams; i++) {
        let team = JSON.parse(localStorage.getItem("draft_t" + i));
        loadTeam(team, i);
    }
}

// initialize the listeners for the page
window.onload = function init() {
    this.document.getElementById("resultpage").addEventListener("click", goToDropPage);
    document.getElementById("resultpage").style.background = "green";

    numteams = localStorage.getItem("index_numteams");
    for (let i = 1; i <= numteams; i++) {
        let team = JSON.parse(localStorage.getItem("draft_t" + i));
        this.loadTeam(team, i);
    }
}
