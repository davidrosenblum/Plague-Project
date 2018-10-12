import "../lib/bootstrap.min.css";
import React from "react";

export class Buttons extends React.Component{
	constructor(props){
		super(props);

	    this.state = {

	    };
	}

	render(){
		return (
			<div>
				<button>Day-By-Day</button>
				<button>Auto Run</button>
				<button>Reset</button>
				<button>Export to Excel</button>
			</div>
		);
	}
}