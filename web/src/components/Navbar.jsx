import React from "react";

export class Navbar extends React.Component{
	constructor(props){
		super(props);

	    this.state = {

	    };
	}

	render(){
		return (
			<nav class="navbar navbar-expand-lg navbar-light bg-light">
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav mr-auto">
	  					<li class="nav-item active">
	    					<a class="nav-link" href="#">Report Bug <span class="sr-only">(current)</span></a>
	  					</li>
	  				</ul>
	  			</div>
      		</nav>
		);
	}
}