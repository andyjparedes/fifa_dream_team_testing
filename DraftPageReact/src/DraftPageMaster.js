import React from 'react';
import Formation from './Formation';
import CurrentDraft from './CurrentDraft';
import PlayerDatabase from './Components/Database.jsx';
import PlayerTeam from './Components/PlayerTeam.jsx';

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
                
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    Results Page
                 </a>
            </div>
        )
    }

    currentDraft(){

    }
}

export default DraftPageMaster;