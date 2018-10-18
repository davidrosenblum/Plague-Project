import React from "react";
import Simulator from "../Simulator";
import { LineChart } from "react-d3-components";

export class Graph extends React.Component{
	constructor(props){
		super(props);

	    this.state = {
			data: null,		// graph points
			day: 0			// current simulation day
	    };
	}

	componentDidMount(){
		// when the simulator signals it has received data
		Simulator.on("data", this.onSimulatorData.bind(this));

		// when the simulator signals a reset
		Simulator.on("reset", this.onSimulatorReset.bind(this));

		// when the simulator changes the day
		Simulator.on("update", this.onSimulatorUpdate.bind(this));

		// when the simulator changes the graph
		Simulator.on("update-graph", this.onSimulatorUpdateGraph.bind(this));
	}

	// simulator has data - convert to d3 format and store it
	onSimulatorData(){
		// map a new array of {x: day, y: dead}
		let data = Simulator.data.map((row, index) => {
			return {
				x: index,
				y: row.infected
			};
		});

		// update
		this.setState({data});
	}

	// simulator reset - reset this component
	onSimulatorReset(){
		this.setState({data: null, day: 0});
	}

	// simulator update - update to the current day
	onSimulatorUpdate(){
		this.setState({day: Simulator.currentDay});
	}

	// simulator update - graph change
	onSimulatorUpdateGraph(evt){
		// day change
		if("day" in evt){
			this.setState({day: evt.day});
		}
	}

	// gets the data values up to the current day
	getData(){
		if(!this.state.data || this.state.day < 1){
			return null;
		}

		// d3 wants {values:[...]}
		let values = this.state.data.slice(0, this.state.day + 1);
		return {values};
	}

	render(){
		return this.state.data !== null ? (
			<div>
				<h5></h5>
				<div>
					<LineChart
						data={this.getData()}
						axes
						width={400}
						height={400}
						margin={{top: 10, bottom: 50, left: 80, right: 10}}
						xAxis={{label: "Day"}}
						yAxis={{label: "Infected"}}
					/>
				</div>
			</div>
		) : null;
	}
}