import React from "react";
import Simulator from "../Simulator";

export class Chart extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			data: null,		// simulatoion data set
			day: 0			// current simulation day
		};
	}

	componentDidMount(){
		// simulator singles data set loaded
		Simulator.on("data", this.onSimulatorData.bind(this));

		// simulator signals a reset
		Simulator.on("reset", this.onSimulatorReset.bind(this));

		// simulator signals a different day
		Simulator.on("update", this.onSimulatorUpdate.bind(this));
	}

	// simulator got data - store it
	onSimulatorData(){
		this.setState({data: Simulator.data});
	}

	// simulator reset - reset this component
	onSimulatorReset(){
		this.setState({data: null, day: 0});
	}

	// simulator day changed - update component day
	onSimulatorUpdate(){
		this.setState({day: Simulator.currentDay});
	}

	// renders table rows up to the current simulation day
	renderRows(){
		if(Simulator.hasData){
			let rows = new Array(Simulator.currentDay + 1);

			for(let i = 0; i <= Simulator.currentDay; i++){
				let day = Simulator.data[i];

				let susceptible = Math.round(day.Susceptible),
					infected = Math.round(day.Infected),
					immune = Math.round(day.Immune),
					dead = Math.round(day.Dead),
					population = Math.round(day.TotalPopulation);

				rows[i] = (
					<tr key={i}>
						<td onClick={()=>Simulator.setGraphDay(i)}>{i}</td>
						<td>{susceptible}</td>
						<td>{infected}</td>
						<td>{immune}</td>
						<td>{dead}</td>
						<td>{population}</td>
					</tr>
				);
			}

			return rows;
		}

		return null;
	}

	render(){
		return this.state.data !== null ? (
			<div>
				<table className="table table-striped overflow-table">
					<thead>
						<tr>
							<th>Day</th>
							<th>Susceptible</th>
							<th>Infected</th>
							<th>Immune</th>
							<th>Dead</th>
							<th>Total Population</th>
						</tr>
					</thead>
					<tbody>
						{this.renderRows()}
					</tbody>
				</table>
			</div>
		) : null;
	}
}