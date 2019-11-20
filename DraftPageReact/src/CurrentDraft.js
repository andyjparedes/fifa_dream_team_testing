import React,{Component} from 'react';
//import {Card} from 'reactstrap';
import Card from '@material-ui/core/Card'
import { CardContent } from '@material-ui/core';
/**
 * @author Shivi
 * 
 * changes
 * 
 * 11/15 - Made edits since reactstrap card broke goethel
 * 11/10 - File created Shivi
 */
export class CurrentDraft extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlayerNo: 0,
            currentPlayerName:""

        };
        debugger;
    }
    /**
     * https://material-ui.com/components/cards/
     */
    render() {
        return this.props.playerList.map((player) => {
            return (
                <Card style={{color:"#fff",backgroundColor:"#1F1B24"}}>
                     <CardContent>
                        {player.playerDrafted.NAME}
                        <ul></ul>
                        {player.teamNames[player.teamNumber]}
                        <ul></ul>
                        Pick {player.playerNum}
                    </CardContent>
                </Card>
            );
        });
    }
    getCurrentPlayer(){
        var tempList2 = [];
        tempList2.push(
            <Card>
                <Card.Body >
                    <Card.Title>Player {this.state.currentPlayerNo}</Card.Title>
                    <Card.Subtitle>Drafting...</Card.Subtitle>
                </Card.Body>
            </Card>
        )
        return tempList2;
    }
}

