import React from "react";
import { Modal } from "./Modal"

export class Navbar extends React.Component{

	constructor(props){
		super(props);

	    this.state = {
	    	showModal: false,
	    	closeModal:false
	    };

	}

	closeMethod(){
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
		    					<a className="nav-link" href="!" onClick={this.openModal.bind(this)}>Report Bug <span className="sr-only">(current)</span></a>
		  					</li>
		  				</ul>
		  			</div>
	      		</nav>
	      		<Modal showModal={this.state.showModal} 
	      		closeModal={this.closeMethod.bind(this)}
	      		/>
	      	</div>
		);
	}
}