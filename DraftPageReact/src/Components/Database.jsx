import firebase from '../Firebase/firebase';
import React,{Component} from 'react';
import {AgGridReact} from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
//var database = firebase.database();

/** Column config, field = name in JSON, headerName = how you would like to display it on website
 * 
 */
const columns = [
    { field: 'NAME', headerName: 'Name'},
    { field: 'RATING', headerName: 'Overall',sortable:true,filter:"agNumberColumnFilter"  },
    { field: 'POSITION', headerName: 'Position',sortable:true  },
	{ field: 'PACE', headerName: 'Pace',sortable:true,filter:"agNumberColumnFilter"   },
	{ field: 'PASSING', headerName: 'Passing',sortable:true,filter:"agNumberColumnFilter"   },
	{ field: 'DEFENDING', headerName: 'Defending',sortable:true,filter:"agNumberColumnFilter"   },
	{ field: 'SHOOTING', headerName: 'Shooting',sortable:true,filter:"agNumberColumnFilter" } ];
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
			rows:this.props.props.rows
		}
		
	}
	componentDidMount() {
		
	}
    /** This function will query the database for a particular player
     * 
     * @param {string} header 
     */
    getPlayer(header) {
        
	}
	onGridReady = params => {
		this.gridApi = params.api;
		this.gridColumnApi = params.columnApi;
		params.api.sizeColumnsToFit();
		
	  };
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
			  rowData={this.props.props.rows} onGridReady={this.onGridReady} onColumnValueChanged={(params)=> {params.api.sizeColumnsToFit()}} onRowDoubleClicked={(event) => { this.props.props.handleClick(event)}} animateRows={true}>
			</AgGridReact>
		  </div>);
    }
}