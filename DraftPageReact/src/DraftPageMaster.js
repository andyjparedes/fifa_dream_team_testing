import React from 'react';
import Formation from './Formation';
import CurrentDraft from './CurrentDraft';
import PlayerDatabase from './Components/Database.jsx';
import PlayerTeam from './Components/PlayerTeam.jsx';
import Button from '@material-ui/core/Button';
/** This is the parent Component of all the components in the Draft Page, so that state can be shared easily
 * 
 * @author shivi 
 * 
 * CHANGELOG
 * 11/01 Updated with documentation and a button linking to results page for testing - goethel
 * 10/30 Component Created - shivi
 */
class DraftPageMaster extends React.Component {
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
                    <PlayerDatabase></PlayerDatabase>
                    <PlayerTeam></PlayerTeam>
                    <Formation/>
                    
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