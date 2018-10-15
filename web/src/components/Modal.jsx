import React from "react";
import ReactModal from "react-modal"

export class Modal extends React.Component{

	onCloseModal(){
		this.props.closeMethod();
	}

	render(){
		return this.props.showModal ?(
			<div>
				<ReactModal>
					My React Modal
      				<a onClick={this.onCloseModal.bind(this)} href="!"><span class="close">&times;</span></a>
      			</ReactModal>
			</div>
		) : null;
	}
}
