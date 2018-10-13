import React from "react";

export class Chart extends React.Component{
	render(){
		// only render if rows are provided
		return this.props.rows ? (
			<table className="table">
				<thead>
					<th>
						<th>Day</th>
						<th>Susceptible</th>
						<th>Infected</th>
						<th>Immune</th>
						<th>Dead</th>
						<th>Total Population</th>
					</th>
				</thead>
				<tbody>
					{this.props.rows}
				</tbody>
			</table>
		) : null;
	}
}