import React from 'react';
import Card from 'react-bootstrap/Card';

class CurrentDraft extends React.Component {
    render() {
        return(
            <div>
                {getPlayers(["Ronaldo", "Messi"], 4)}
            </div>
        )
    }

    getPlayers(currentList, numOfPlayers){
        var tempList = [];
        var count = 0;
        for(const player of currentList){
            if(count === numOfPlayers){
                count = 0;
            }
            count++;
            render(
                <Card>
                    <Card.Body>
                        <Card.Title>Player {count}</Card.Title>
                        <Card.Subtitle>{player.name}</Card.Subtitle>
                    </Card.Body>
                </Card>
            )
        }
        return tempList;
    }
}

export default CurrentDraft;