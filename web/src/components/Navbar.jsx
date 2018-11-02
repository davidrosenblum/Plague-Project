import React from "react";
import { MailModal } from "./MailModal"

export class Navbar extends React.Component{

	constructor(props){
		super(props);

	    this.state = {
	    	showModal: false,
	    	closeModal:false
	    };

	}

	closeModal(){
		this.setState({showModal:false});
	}

	openModal(){
		this.setState({showModal:true});
	}

	render(){
		return (
			<div>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav mr-auto">
		  					<li className="nav-item active">
		    					<span className="nav-link" onClick={this.openModal.bind(this)}>Contact Us <span className="sr-only">(current)</span></span>
		  					</li>
		  				</ul>
		  			</div>
	      		</nav>
	      		<MailModal showModal={this.state.showModal} closeModal={this.closeModal.bind(this)} />
	      	</div>
		);
	}
}