import firebase from '../Firebase/firebase';
import React,{Component} from 'react';
import {AgGridReact} from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

/** Column config, field = name in JSON, headerName = how you would like to display it on website
 *  
 */
const columns = [
	{ field: 'NAME', headerName: 'Name',filter:"agTextColumnFilter", 
	filterParams: {
		filterOptions: ["contains", "notContains"],
		textFormatter: function(r) {
			// This function removes accents from players, so that users can search with or without accents and stil get a match
		  if (r == null) return null;
		  r = r.replace(new RegExp("[àáâãäå]", "g"), "a");
		  r = r.replace(new RegExp("æ", "g"), "ae");
		  r = r.replace(new RegExp("ç", "g"), "c");
		  r = r.replace(new RegExp("[èéêë]", "g"), "e");
		  r = r.replace(new RegExp("[ìíîï]", "g"), "i");
		  r = r.replace(new RegExp("ñ", "g"), "n");
		  r = r.replace(new RegExp("[òóôõøö]", "g"), "o");
		  r = r.replace(new RegExp("œ", "g"), "oe");
		  r = r.replace(new RegExp("[ùúûü]", "g"), "u");
		  r = r.replace(new RegExp("[ýÿ]", "g"), "y");
		  return r;}
		}},
    { field: 'RATING', headerName: 'Overall',sortable:true,filter:"agNumberColumnFilter"  },
    { field: 'POSITION', headerName: 'Position',sortable:true  },
	{ field: 'PACE', headerName: 'Pace',sortable:true,filter:"agNumberColumnFilter"   },
	{ field: 'PASSING', headerName: 'Passing',sortable:true,filter:"agNumberColumnFilter"   },
	{ field: 'DEFENDING', headerName: 'Defending',sortable:true,filter:"agNumberColumnFilter"   },
	{ field: 'SHOOTING', headerName: 'Shooting',sortable:true,filter:"agNumberColumnFilter" } ];

/** This is the main class for displaying the player database for the Draft Page
 *  
 * @author goethel
 * @param props default props for a react component, contains the rowdata for display
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
	/** This function will resize the grid as soon as we get rowdata loaded, so that the columns wont be cut off
 	 *  @param params: GridEvent
	  * @author goethel
	  * 
	  * 
	 */
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
			width: '65vw',
		
			}} 
		  >
			<AgGridReact
			  columnDefs={columns}
			  rowData={this.props.props.rows} onGridReady={this.onGridReady} onColumnValueChanged={(params)=> {params.api.sizeColumnsToFit()}} onRowDoubleClicked={(event) => { this.props.props.handleClick(event)}} animateRows={true}>
			</AgGridReact>
		  </div>);
    }
}