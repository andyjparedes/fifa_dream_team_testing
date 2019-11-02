import React from 'react';
import Formation from './Formation';
import CurrentDraft from './CurrentDraft';
import PlayerDatabase from './Components/Database.jsx';
import PlayerTeam from './Components/PlayerTeam.jsx';
import Button from '@material-ui/core/Button';
import firebase from './Firebase/firebase'

const numPlayers = 30; // This is to allow for testing, so that we do not run over our server quota by pulling the whole database every time. Will be increased to top 2000 during demos
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
        super(props);
        this.state = {
		rows:[],
            Teams: {
                Team1:{},
                Team2:{},
                Team3:{},
                Team4:{},
                Team5:{},
                Team6:{},
            }
		}
    }
    /** This function grabs the X number of players, and by default sorts by overall or rating
     * 
     * @author goethel 
     * 
     * CHANGELOG
     * 11/2 - file created - goethel
     */
    componentDidMount() {
        var that = this;
        var mostViewedPosts = firebase.database().ref('Players').orderByChild('RATING').limitToLast(numPlayers).once("value").then(function(snapshot){
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                that.setState({rows:[...that.state.rows,childData]});
            });
        });    
     
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
                    <CurrentDraft/>
                    <PlayerDatabase props={{rows:this.state.rows}}></PlayerDatabase>
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