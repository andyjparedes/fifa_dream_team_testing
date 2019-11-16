import React,{Component} from 'react';
//import {Card} from 'reactstrap';
import Card from '@material-ui/core/Card'
import { CardContent } from '@material-ui/core';
export class CurrentDraft extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlayerNo: 0,
            currentPlayerName:""

        };
    }
    /**
     * https://material-ui.com/components/cards/
     */
    render() {
        return this.props.playerList.map((player) => {
            return (
                <Card>
                    <CardContent>{player.NAME}</CardContent>
                </Card>
            );
        });
    }
    getCurrentPlayer(){
        var tempList2 = [];
        tempList2.push(
            <Card>
                <Card.Body>
                    <Card.Title>Player {this.state.currentPlayerNo}</Card.Title>
                    <Card.Subtitle>Drafting...</Card.Subtitle>
                </Card.Body>
            </Card>
        )
        return tempList2;
    }
}

