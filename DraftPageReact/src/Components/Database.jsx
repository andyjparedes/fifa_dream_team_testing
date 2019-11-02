//import firebase from '../Firebase/firebase';
import React,{Component} from 'react';
import {AgGridReact} from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
//var database = firebase.database();

/** Column config, field = name in JSON, headerName = how you would like to display it on website
 * 
 */
const columns = [
    { field: 'NAME', headerName: 'Name', },
    { field: 'RATING', headerName: 'Overall' },
    { field: 'POSITION', headerName: 'Position' },
	{ field: 'PACE', headerName: 'Pace' },
	{ field: 'SHOOTING', headerName: 'Shooting' } ];
/** This is the main class for displaying the player database for the Draft Page
 *  
 * @author goethel
 * @param props default props for a react component
 * 
 * Changelog:
 * 10/25 - file and class created - goethel
 */
  export default class PlayerDatabase extends Component {
    constructor(props) {
		super(props);
		this.state = {
			rows: [
				{
					NAME: "Pelé",
					CLUB: "Icons",
					LEAGUE: "Icons",
					POSITION: "CAM",
					TIER: "Gold",
					RATING: "98",
					PACE: "95",
					SHOOTING: "96",
					PASSING: "93",
					DRIBBLING: "96",
					DEFENDING: "60",
					PHYSICAL: "76",
					LOADDATE: "2018-09-19 12:10:05"
				},
				{
					NAME: "Diego Maradona",
					CLUB: "Icons",
					LEAGUE: "Icons",
					POSITION: "CAM",
					TIER: "Gold",
					RATING: "97",
					PACE: "92",
					SHOOTING: "93",
					PASSING: "92",
					DRIBBLING: "97",
					DEFENDING: "40",
					PHYSICAL: "76",
					LOADDATE: "2018-09-19 12:10:05"
				},
				{
					NAME: "Ronaldo",
					CLUB: "Icons",
					LEAGUE: "Icons",
					POSITION: "ST",
					TIER: "Gold",
					RATING: "96",
					PACE: "97",
					SHOOTING: "95",
					PASSING: "81",
					DRIBBLING: "95",
					DEFENDING: "45",
					PHYSICAL: "76",
					LOADDATE: "2018-09-19 12:10:05"
				},
				{
					NAME: "Pelé",
					CLUB: "Icons",
					LEAGUE: "Icons",
					POSITION: "CF",
					TIER: "Gold",
					RATING: "95",
					PACE: "96",
					SHOOTING: "93",
					PASSING: "90",
					DRIBBLING: "95",
					DEFENDING: "56",
					PHYSICAL: "75",
					LOADDATE: "2018-09-19 12:10:05"
				},
				{
					NAME: "Diego Maradona",
					CLUB: "Icons",
					LEAGUE: "Icons",
					POSITION: "CAM",
					TIER: "Gold",
					RATING: "95",
					PACE: "88",
					SHOOTING: "91",
					PASSING: "90",
					DRIBBLING: "95",
					DEFENDING: "42",
					PHYSICAL: "75",
					LOADDATE: "2018-09-19 12:10:05"
				},
				{
					NAME: "Ronaldo",
					CLUB: "Icons",
					LEAGUE: "Icons",
					POSITION: "ST",
					TIER: "Gold",
					RATING: "94",
					PACE: "93",
					SHOOTING: "93",
					PASSING: "80",
					DRIBBLING: "93",
					DEFENDING: "46",
					PHYSICAL: "80",
					LOADDATE: "2018-09-19 12:10:05"
				},
				{
					NAME: "Ronaldinho",
					CLUB: "Icons",
					LEAGUE: "Icons",
					POSITION: "LW",
					TIER: "Gold",
					RATING: "94",
					PACE: "92",
					SHOOTING: "90",
					PASSING: "91",
					DRIBBLING: "95",
					DEFENDING: "37",
					PHYSICAL: "81",
					LOADDATE: "2018-09-19 12:10:05"
				},
				]
		}
    }
    /** This function will query the database for a particular player
     * 
     * @param {string} header 
     */
    getPlayer(header) {
        //var mostViewedPosts = firebase.database().ref('Players').orderByChild('NAME').equalTo("Lionel Messi").then(function(snapshot) {

		//});
    }
    render() {
        return (
			<div 
			className="ag-theme-balham-dark"
			style={{ 
			height: '70vh', 
			width: '65vw'}} 
		  >
			<AgGridReact
			  columnDefs={columns}
			  rowData={this.state.rows} onGridReady={(params)=> {params.api.sizeColumnsToFit()}}>
			</AgGridReact>
		  </div>);
    }
}