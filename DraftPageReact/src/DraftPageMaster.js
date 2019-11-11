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
const DialogBox = (params) => {
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
                1:{},
                2:{},
                3:{},
                4:{},
                5:{},
                6:{},
                
        NumPlayersTeam:12, // Number of players per team (48 is a bit much!)
        numTeams:6, // number of teams
        DialogState:false,
        curPlayerSelected:"",
        curTeam:1,
        draftType:"normal", // Snake or Normal
        pickNum:1 // CUrrent Pick #
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
     * 11/2 - file created - goethel
     */
    componentDidMount() {
        var that = this;
        // var mostViewedPosts = firebase.database().ref('Players').orderByChild('RATING').limitToLast(numPlayers).once("value").then(function(snapshot){
        //     snapshot.forEach(function (childSnapshot) {
        //         var childData = childSnapshot.val();
        //         // This is where checks for Drafted players will occur
        //         that.setState({rows:[...that.state.rows,childData]});
        //     });
        // });    
        this.setState({rows:data})
     
    }
    /** This handles the initial opening of the DialogBox after the user double clicks on a player in the Data Grid
     * 
     */
    handleClick(playerSelected) {
        this.setState({DialogState:true,curPlayerSelected:playerSelected})
    }
    /** This function closes the dialog box, if the user clicks cancel
     * 
     */
    handleClose() {
        this.setState({DialogState:false})
    }
    /** This is the function where the switchover code for changing who is drafting should occur
     * 
     */
    handleConfirmDraft() {
        this.setState({DialogState:false,pickNum:(this.state.pickNum+1)});
        if(this.isDraftDone() == true) {
            this.DraftFinished();
        }
        else {
            // Code for switching to next pick
            
        }
    }
    /** This function will check if Draft is Done or not, treat as js function
     * 
     */
    isDraftDone() {
        if(this.state.pickNum == this.state.numTeams*this.state.NumPlayersTeam) {
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

    }
    render() {
        return(
            <div className="App">
                <header className="App-header">
                    <h1>
                    This is the shell of the Draft Page
                    </h1>
                </header>
                <body className="draft-Body">
                
                    <DialogBox props={{DialogState:this.state.DialogState,handleClose:this.handleClose,handleConfirmDraft:this.handleConfirmDraft,player:this.state.curPlayerSelected}}></DialogBox>
                    <CurrentDraft/>
                    <PlayerDatabase props={{rows:this.state.rows,handleClick:this.handleClick}}></PlayerDatabase>
                    <div>
                    <Formation/>
                    <PlayerTeam ></PlayerTeam>
                    </div>
                    
                </body>
                <div>
                <Button href="../../resultpage.html" color="primary" variant="contained" className="results">Results Page (TESTING ONLY)</Button>
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