import React from "react";
import ReactModal from "react-modal"

export class Modal extends React.Component{

	// on click of submit button 
	onClick(){

	}

	//on check of radio button
	onCheck(evt){

	}

	render(){
		return (
			<div>
				<ReactModal isOpen={this.props.showModal} >
      				<span className="nav-link" onClick={this.props.closeModal}>&times;</span>
      					<h2 className="modalHeader">Contact Us</h2>
      					<table className="reportsTable">
      						<tr>
	      						<td>
	      							<input type="radio" value="Have a problem?"/>Have a problem?
	      							&nbsp;
	      							<input type="radio" value="Have an idea?"/>Have an idea?
	      							&nbsp;
	      							<input type="radio" value="Other"/>Other
		      					</td>
		      				</tr>
		      				<tr>
		      					<td>
			      					<textarea rows="4" cols="100" placeholder="Type message in here."></textarea>
		      					</td>
		      				</tr>
		      				<tr>
		      					<td>
		      						<button onClick={this.onClick.bind(this)}>Submit</button>
		      					</td>
	      					</tr>
      					</table>
      			</ReactModal>
			</div>
		);
	}
}
