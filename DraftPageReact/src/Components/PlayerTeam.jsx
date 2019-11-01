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
	{ field: 'POSITION', headerName: 'Position' }];
const gridOptions = {


};
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
					NAME: "Messi",
					CLUB: "FC-Barcelona",
					LEAGUE: "BBVA",
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
       // var mostViewedPosts = firebase.database().ref('Players').orderByChild('NAME').equalTo("Lionel Messi").then(function(snapshot) {

		//});
	}
	sizeToFit() {
		this.gridApi.sizeColumnsToFit()
	}
    render() {
        return (
			<div 
			className="ag-theme-balham-dark"
			style={{ 
			height: '50vh', 
			width: '35vw'}}>
			<AgGridReact
			  columnDefs={columns}
			  rowData={this.state.rows} onGridReady={(params)=> {params.api.sizeColumnsToFit()}}>
			</AgGridReact>
		  </div>);
    }
}