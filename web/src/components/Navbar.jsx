import React from "react";

export class Navbar extends React.Component{
	constructor(props){
		super(props);

	    this.state = {

	    };
	}

	render(){
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
	  					<li className="nav-item active">
	    					<a className="nav-link" href="!">Report Bug <span className="sr-only">(current)</span></a>
	  					</li>
	  				</ul>
	  			</div>
      		</nav>
		);
	}
}