import "../lib/bootstrap.min.css";
import React from "react";

export class Chart extends React.Component{
	constructor(props){
		super(props);

	    this.state = {

	    };
	}

	render(){
		return (
				<table className="Output">
					<tbody>
						<th>
							<td> Day </td>
							<td> % Sick </td>
							<td> % Immune </td>
							<td> Population </td>
						</th>
					</tbody>
				</table>
		);
	}
}