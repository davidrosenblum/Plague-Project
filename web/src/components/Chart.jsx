import React from "react";
import Simulator from "../Simulator";

export class Chart extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			visible: false	//true/false if simulator data to render
		};
	}

	componentDidMount(){
		// simulator singles data set loaded - render data
		Simulator.on("data", () => this.setState({visible: true}));

		// simulator signals a reset - nothing to render
		Simulator.on("reset", () => this.setState({visible: false}));
	}


	getStyleForDay(index){
		let style = null;

		if(Simulator.firstInvalidDay > -1){
			if(index === Simulator.firstInvalidDay){
				// this row is first invalid day
				style = {
					borderLeft: "5px solid red",
					borderRight: "5px solid red"
				};
			}
			else if(index > Simulator.firstInvalidDay){
				// subsequent invalid days
				style = {
					borderLeft: "1px solid red",
					borderRight: "1px solid red"
				};
			}
		}		

		return style;
	}

	// renders table rows up to the current simulation day
	renderRows(){
		let data = Simulator.data;

		if(data){
			let rows = new Array(data.length + 1);

			data.forEach((dayData, index) => {
				// extract data
				let susceptible = 	Math.round(dayData.Susceptible),
					infected = 		Math.round(dayData.Infected),
					immune = 		Math.round(dayData.Immune),
					dead = 			Math.round(dayData.Dead),
					population = 	Math.round(dayData.TotalPopulation);

				// get the style (for data correction)
				let style = this.getStyleForDay(index);

				// create table row
				// (toLocalString adds the ',' as the number grows in thousands)
				rows[index] = (
					<tr key={index} style={style}>
						<td>{index}</td>
						<td>{susceptible.toLocaleString()}</td>
						<td>{infected.toLocaleString()}</td>
						<td>{immune.toLocaleString()}</td>
						<td>{dead.toLocaleString()}</td>
						<td>{population.toLocaleString()}</td>
					</tr>
				);
			});

			return rows;
		}

		return null;
	}

	render(){
		return this.state.visible ? (
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
				<div className="text-center">
					{Simulator.firstInvalidDay > -1 ? `* Error correction begins on day ${Simulator.firstInvalidDay} *` : null}
				</div>
			</div>
		) : null;
	}
}