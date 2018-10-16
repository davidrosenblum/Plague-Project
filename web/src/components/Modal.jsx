import React from "react";
import ReactModal from "react-modal"

export class Modal extends React.Component{

	onClick(){

	}

	render(){
		return (
			<div>
				<ReactModal isOpen={this.props.showModal} >
      				<a onClick={this.props.closeModal} href=""><span className="close">&times;</span></a>
      					<h2 className="modalHeader">Report Bug or Request New Feature</h2>
      					<table>
      						<tr>
	      						<td className="bugReport">
	      							<h5>Report Bug:</h5>
			      					<textarea rows="4" cols="100">
			      						Report Bug Here
			      					</textarea>
			      					<br/>
			      					<button onClick={this.onClick.bind(this)}>Submit</button>
		      					</td>
		      					<td className="featureRequest">
		      						<h5>Request Feature:</h5>
			      					<textarea rows="4" cols="100">
			      						 Request feature Here
			      					</textarea>
			      					<br/>
			      					<button onClick={this.onClick.bind(this)}>Submit</button>
		      					</td>
	      					</tr>
      					</table>
      			</ReactModal>
			</div>
		);
	}
}
