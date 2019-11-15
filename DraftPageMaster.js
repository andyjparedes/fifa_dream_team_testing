import React from 'react';
import Formation from './Formation';
import CurrentDraft from './CurrentDraft';
import PlayerDatabase from './Components/Database.jsx';
import PlayerTeam from './Components/PlayerTeam.jsx';
import Button from '@material-ui/core/Button';
import firebase from './Firebase/firebase'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

/** This is an arrow function to set up the Dialog/Confirmation popup to draft a player they clicked on
 * @author goethel
 * @param {
 * DialogState:boolean
 * handleClose:function (from parent component)
 * } params 
 * CHANGES
 * 11/11 - Function Created, Code moved outside of class to avoid Hook errors with react - goethel
 */
export const DialogBox = (params) => {
    const [open, setOpen] = React.useState(false);
    
if(params.props.DialogState == true && open == false) {
    setOpen(true);
}
const  handleClose = () => {
    setOpen(false);
    params.props.handleClose();
}
const  handleConfirmed = () => {
    setOpen(false);
    params.props.handleConfirmDraft();
}
    return(<Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
    <DialogTitle id="alert-dialog-title">{"Draft This Player?"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {params.props.player.NAME}{"\n"}
        {params.props.player.RATING}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={handleConfirmed} color="primary" autoFocus>
        Draft
      </Button>
    </DialogActions>
    </Dialog>);
}

const numPlayers = 30; // This is to allow for testing/development, so that we do not run over our server quota by pulling the whole database every time. Will be increased to top 2000 during demos
const data=require('./Player.json');
/** This is the parent Component of all the components in the Draft Page, so that state can be shared easily
 * 
 * @author shivi 
 * 
 * CHANGELOG
 * 11/01 Updated with documentation and a button linking to results page for testing - goethel
 * 10/30 Component Created - shivi
 */
class DraftPageMaster extends React.Component {
    
    constructor(props) {
        // This is where you should grab the settings from index browser storage to use throughout draft
        super(props);
        this.state = {
		rows:[],
                t1:[],
                t2:[],
                t3:[],
                t4:[],
                t5:[],
                t6:[], 
                
        NumPlayersTeam: localStorage.getItem("index_numplayers"), // Number of players per team
        numTeams: localStorage.getItem("index_numteams"), // Number of teams
        DialogState:false,
        curPlayerSelected:"", // The player that the user double clicked on
        draftedPlayer:"", // This variable will update with the last drafted player
        curTeam:1, // Allows Players to select which team drafts first
        curTeamName: localStorage.getItem("index_team" + 1), // Team name of current team
        draftType: localStorage.getItem("index_roundtrans"), // Snake or Normal draft
        snakeDraftSide:1, // Snake going forward round (1234) or backwards round (4321)
        pickNum:1, // Current Pick #
        }
    // Any function used in callback must be bound here or React will not work with them
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleConfirmDraft = this.handleConfirmDraft.bind(this);
    }
    /** This function grabs the X number of players from firebase, and by default sorts by overall or rating
     * 
     * @author goethel 
     * 
     * CHANGELOG
     * 11/5 - added option for local DB usage - goethel
     * 11/2 - file created - goethel
     */
    componentDidMount() {
        var myData = Object.keys(data).map(key => {
            return data[key];
        })
        var that = this;
        if(false) {
        var mostViewedPosts = firebase.database().ref('Players').orderByChild('RATING').limitToLast(numPlayers).once("value").then(function(snapshot){
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                // This is where checks for Drafted players will occur
                that.setState({rows:[...that.state.rows,childData]});
            });
        });   
        } 
        this.setState({rows:myData})
     
    }
    /** This handles the initial opening of the DialogBox after the user double clicks on a player in the Data Grid
     * 
     */
    handleClick(event) {

       this.gridApi = event.api;
        this.rowNode = event.node;
        this.setState({DialogState:true,curPlayerSelected:event.data})
    }
    /** This function closes the dialog box, if the user clicks cancel
     * 
     * 
     * 11/11 - Function Created
     */
    handleClose() {
        this.setState({DialogState:false})
    }
    /** This function adds the drafted player to the correct team
     * @author goethel
     * 
     * 11/13 - Function Created
     */
    addPlayerToTeam() {
        let team = this.state.curTeam;

        if(team ==1) {
            this.setState({t1:(this.state.t1.concat(this.state.curPlayerSelected))});
        }
        else if(team ==2) {
            this.setState({t2:(this.state.t2.concat(this.state.curPlayerSelected))});
        }
        else if(team ==3) {
            this.setState({t3:(this.state.t3.concat(this.state.curPlayerSelected))});
        }
        else if(team ==4) {
            this.setState({t4:(this.state.t4.concat(this.state.curPlayerSelected))});
        }
        else if(team ==5) {
            this.setState({t5:(this.state.t5.concat(this.state.curPlayerSelected))});
        }
        else if(team ==6) {
            this.setState({t6:(this.state.t6.concat(this.state.curPlayerSelected))});
        }
    }
    /** This function removes a drafted player from the data grid
     * 
     */
    onRemoveSelected() {
        var res = this.gridApi.updateRowData({ remove: [this.rowNode.data] });
        console.log(res);
      }
    /** This is the function where the switchover code for changing who is drafting should occur
     * 
     */
    handleConfirmDraft() {
        this.setState({DialogState:false,pickNum:(this.state.pickNum+1),draftedPlayer:this.state.curPlayerSelected});
        this.addPlayerToTeam();
       if(this.state.draftedPlayer != "") {
        this.onRemoveSelected();
       }
        
        if(this.isDraftDone() == true) {
            this.DraftFinished();
        }
        else {
            if(this.state.draftType == "repeating") {
                if(this.state.curTeam==this.state.numTeams) {
                    this.setState({curTeam:1});
                    this.setState({curTeamName: localStorage.getItem("index_team" + this.state.curTeam)});
                }
                else {
                    this.setState({curTeam:(this.state.curTeam+1)});
                    this.setState({curTeamName: localStorage.getItem("index_team" + this.state.curTeam)});
                }
            }
            // Code for evaluating next pick in snake draft
            else if(this.state.draftType == "snake") {
                console.log(this.state.curTeam+", forward/back:"+this.state.snakeDraftSide); // debug
                    if(this.state.snakeDraftSide == 1) {
                        if(this.state.curTeam == this.state.numTeams) {
                            this.setState({snakeDraftSide:0})
                        }
                        else {
                        this.setState({curTeam:(this.state.curTeam+1)});
                        this.setState({curTeamName: localStorage.getItem("index_team" + this.state.curTeam)});
                        }
                    }
                    else {
                        if(this.state.curTeam == 1) {
                            this.setState({snakeDraftSide:1})
                        }
                        else {
                        this.setState({curTeam:(this.state.curTeam-1)});
                        this.setState({curTeamName: localStorage.getItem("index_team" + this.state.curTeam)});
                        }
                    }
                
            }
            // Code for switching to next pick
            
        }
    }
    /** This function will check if Draft is Done or not, treat as js function
     * 
     */
    isDraftDone() {
        if(this.state.pickNum >= this.state.numTeams*this.state.NumPlayersTeam) {
            return true;
        }
        else {
            return false;
        }
    }

    /** This Function handles the eventual switchover to Results Page, and stores the Team data into the local browser storage to be used by the Results Page
     * 
     */
    DraftFinished() {
        localStorage.setItem("draft_t1", JSON.stringify(this.state.t1));
        localStorage.setItem("draft_t2", JSON.stringify(this.state.t2));
        localStorage.setItem("draft_t3", JSON.stringify(this.state.t3));
        localStorage.setItem("draft_t4", JSON.stringify(this.state.t4));
        localStorage.setItem("draft_t5", JSON.stringify(this.state.t5));
        localStorage.setItem("draft_t6", JSON.stringify(this.state.t6));

        //window.href("../../resultpage.html");
    }
    render() {
        return(
            <div className="App">
                <header className="App-header">
                    <h1>
                    {this.state.curTeamName} currently drafting
                    </h1>
                    <h2>Pick Number {this.state.pickNum}</h2>
                </header>
                <div className="draft-Body">
                
                    <DialogBox props={{DialogState:this.state.DialogState,handleClose:this.handleClose,handleConfirmDraft:this.handleConfirmDraft,player:this.state.curPlayerSelected}}></DialogBox>
                    <CurrentDraft/>
                    <PlayerDatabase props={{rows:this.state.rows,handleClick:this.handleClick}}></PlayerDatabase>
                    <div>
                    <Formation/>
                    <PlayerTeam curTeam={this.state.curTeam} t1={this.state.t1} t2={this.state.t2} t3={this.state.t3} t4={this.state.t4} t5={this.state.t5} t6={this.state.t6}></PlayerTeam>
                    </div>
                    
                </div>
                <div>
                <Button href="../../tradingpage.html" color="primary" variant="contained" className="results">Results Page (TESTING ONLY)</Button>
                </div>
                
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    Built with React.js
                 </a>
            </div>
        )
    }
    currentDraft(){

    }
}

export default DraftPageMaster;