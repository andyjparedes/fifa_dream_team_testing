import firebase from '../Firebase/firebase';
import React,{Component} from 'react';
import {AgGridReact} from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
//var database = firebase.database();

/** Column config, field = name in JSON, headerName = how you would like to display it on website
 *  For information regarding datatable API
 * @see https://www.ag-grid.com/documentation-main/documentation.php
 */
const columns = [
    { field: 'NAME', headerName: 'Name', },
    { field: 'RATING', headerName: 'Overall' },
	{ field: 'POSITION', headerName: 'Position' }];
const gridOptions = {


};
const test = {
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
}
/** This is the main class for displaying the currently selecting teams players
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
		let data = this.getData();
		this.state = {
			rows:data
		}
		this.refreshGrid.bind(this);
	}
	getData() {
		
		let team = this.props.curTeam;
		let data = {test};
		if(team ==1) {
           data = this.props.t1;
        }
        else if(team ==2) {
			data = this.props.t2;
        }
        else if(team ==3) {
			data = this.props.t3;
        }
        else if(team ==4) {
			data = this.props.t4;        }
        else if(team ==5) {
			data = this.props.t5;        }
        else if(team ==6) {
			data = this.props.t6;        }
		return data;
	}
	componentWillReceiveProps() {
		this.setState({rows:this.getData()});
	}
	sizeToFit() {
		this.gridApi.sizeColumnsToFit()
	}
	onGridReady = params => {
		this.gridApi = params.api;
		this.gridColumnApi = params.columnApi;
		params.api.sizeColumnsToFit();
		
	  };
	refreshGrid() {
    	this.gridApi.refreshCells();
	}
    render() {
        return (
			<div 
			className="ag-theme-balham-dark"
			style={{ 
			height: '40vh', 
			width: '35vw'}}>
			<AgGridReact
			  columnDefs={columns}
			  rowData={this.getData()} onGridReady={this.onGridReady} >
			</AgGridReact>
		  </div>);
    }
}