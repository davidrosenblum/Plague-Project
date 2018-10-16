import React from "react";
import ReactModal from "react-modal"

export class Modal extends React.Component{
	render(){
		return (
			<div>
				<ReactModal isOpen={this.props.showModal} >
					My React Modal
      				<a onClick={this.props.closeModal} href=""><span class="close">&times;</span></a>
      			</ReactModal>
			</div>
		);
	}
}
