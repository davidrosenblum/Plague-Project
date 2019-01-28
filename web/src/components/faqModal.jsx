import React from "react";
import ReactModal from "react-modal"

export class faqModal extends React.Component{

	constructor(props){
        super(props);
	}
	 
	render(){
		return this.props.showHelp ? (
			<div>
                Faq Modal
			</div>
		) : null;
	}
}