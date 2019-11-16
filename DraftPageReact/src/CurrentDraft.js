import React from 'react';
import { Card } from 'reactstrap';

class CurrentDraft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlayerNo: 0,
            currentPlayerName:""

        };
    }
    render() {
        return(
            <div>
                {this.getPlayers(this.props.playerList)}
                {this.getCurrentPlayer()}
            </div>
        )
    }

    getPlayers(currentList){
        var tempList = [];
        console.log(currentList);
        // for(const player of []){
        //     tempList.push(
        //         <Card>
        //             <Card.Body>
        //                 <Card.Title>Player {player.playerNum}</Card.Title>
        //                 <Card.Subtitle>{player.playerDrafted}</Card.Subtitle>
        //             </Card.Body>
        //         </Card>
        //     )
        // }
        return tempList;
    }

    getCurrentPlayer(){
        var tempList2 = [];
        // tempList2.push(
        //     <Card>
        //         <Card.Body>
        //             <Card.Title>Player {this.state.currentPlayerNo}</Card.Title>
        //             <Card.Subtitle>Drafting...</Card.Subtitle>
        //         </Card.Body>
        //     </Card>
        // )
        return tempList2;
    }
}

export default CurrentDraft;