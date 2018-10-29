import React from "react";
import Simulator from "../Simulator";
import { LineChart } from "react-d3-components";

export class Graph extends React.Component{
	constructor(props){
		super(props);
		
	    this.state = {
			data: null,			// graph data
			day: 0,				// current simulation day
			yLabel: "Infected"	// y-axis value
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
		// update
		this.setState({data: Simulator.data});
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
		if(typeof evt.day === "number"){
			this.setState({day: evt.day});
		}
	}

	// when the graph y axis drop down is changed
	onYLabelChange(evt){
		this.setState({yLabel: evt.target.value})
	}

	// gets the data values up to the current day
	getData(){
		if(!this.state.data || this.state.day < 1){
			return null;
		}

		let largestY = 0;

		let data = this.state.data.map((row, index) => {
			let y = parseFloat(row[this.state.yLabel]);

			largestY = Math.max(largestY, y);

			return {
				x: index,
				y
			};
		});

		// d3 wants {values:[...]}
		let values = data.slice(0, this.state.day + 1);
		return {values, largestY};
	}

	render(){
		let data = this.getData();
		if(data){

			/*
				data.largestY for biggest Y value! 
			*/

			return (
				<div>
					<h5></h5>
					<div className="GraphDropdown" onChange={this.onYLabelChange.bind(this)}>
						<select className="form-control">
							<option value="Infected">Infected</option>
							<option value="Susceptible">Susceptible</option>
							<option value="Immune">Immune</option>
							<option value="Dead">Dead</option>
						</select>
					</div>
					<div>
						<LineChart
							data={data}
							axes
							width={540}
							height={525}
							margin={{top: 10, bottom: 50, left: 80, right: 10}}
							xAxis={{label: "Day"}}
							yAxis={{label: this.state.yLabel}}
							//tooltipHtml={(x, y) => `Day ${x} - ${y} ${this.state.yLabel}`}
						/>
					</div>
				</div>
			);
		}
		return null;
	}
}