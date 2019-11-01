import React from 'react';
import logo from './logo.svg';
import './App.css';
import PlayerDatabase from './Components/Database.jsx'
import PlayerTeam from './Components/PlayerTeam.jsx'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          This is the shell of the Draft Page
        </h1>
      </header>
      <body className="draft-Body">
      <PlayerDatabase></PlayerDatabase>
      <PlayerTeam></PlayerTeam>
     
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
  );
}

export default App;
