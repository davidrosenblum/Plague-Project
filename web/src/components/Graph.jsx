import React from "react";
import Simulator from "../Simulator";
import { LineChart, T } from "react-easy-chart"

export class Graph extends React.Component{
	constructor(props){
		super(props);
		
	    this.state = {
			data: 			null,			// graph data
			day: 			0,				// current simulation day
			yLabel: 		"Infected",		// y-axis value
			tooltip:		null
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

	componentDidUpdate(prevProps, prevState){
		if(prevState.yLabel !== this.state.yLabel){
			this.setState({tooltip: null});
		}
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

	// gets the data values (multiple lines) up to do the current
	getDataForAllLabels(){
		let values = [];		// holds the correctly formatted values
		let valuesObj = {};		// helps to sort by label ('Infected', 'Susceptible', etc)

		// iterate over each day...
		for(let i = 0; i <= this.state.day; i++){
			// day json, example: {'Infected': 100, 'Susceptible': 5, etc}
			let row = this.state.data[i]; 

			// for each label... (row[label] is the y value for the y label (ex: how many infected))
			for(let label in row){
				if(label === "TotalPopulation") continue;

				let y = parseFloat(row[label]);

				let pt = {x: i, y};

				if(label in valuesObj){
					valuesObj[label].push(pt);
				}
				else{
					valuesObj[label] = [pt];
				}
			}
		}

		// convert the dictionary into the correctly formatted array
		for(let key in valuesObj){
			values.push(valuesObj[key]);
		}

		// allData is used by render method to determine multiline
		return {values, largestY: this.state.data[0].TotalPopulation};
	}

	// gets the data values up to the current day (single line)
	getData(){
		// make sure there is data
		if(!this.state.data || this.state.day < 1){
			return null;
		}

		// All = multiline, this function is for one line
		if(this.state.yLabel === "All"){
			return this.getDataForAllLabels();
		}

		let largestY = 0;

		let values = [];

		// iterate... find largest Y and populate values with {x, y} format
		for(let i = 0; i <= this.state.day; i++){
			let y = parseFloat(this.state.data[i][this.state.yLabel]);

			largestY = Math.max(largestY, y);

			values.push({x: i, y});
		}

		return {values: [values], label: this.state.yLabel, largestY};
	}

	onGraphClick(data, evt){
		if(this.state.yLabel !== "All"){
			let {x, y} = data;

			this.setState({tooltip: `${Math.round(y)} ${this.state.yLabel.toLowerCase()} on day ${x}.`});
		}
	}

	render(){
		// graph size constants
		const WIDTH = 		540,
			HEIGHT = 		475,
			MARGIN_TOP = 	10,
			MARGIN_BOTTOM =	50,
			MARGIN_LEFT = 	80,
			MARGIN_RIGHT = 	10;

		// graph line colors
		const COLORS = {
			"Infected": 	"green",
			"Susceptible": 	"red",
			"Immune": 		"steelblue",
			"Dead": 		"gray"
		};

		let data = this.getData();
		if(data){
			let numDays = data.values[0].length - 1; // day zero = initial params
			
			return (
				<div>
					<h5>Simulated {this.state.yLabel}</h5>
					<div className="GraphDropdown" onChange={this.onYLabelChange.bind(this)}>
						<select className="form-control">
							<option>Infected</option>
							<option>Susceptible</option>
							<option>Immune</option>
							<option>Dead</option>
							<option>All</option>
						</select>
					</div>
					<div>
						<LineChart
							data={data.values}
							width={WIDTH}
							height={HEIGHT}
							margin={{
								top: MARGIN_TOP, bottom: MARGIN_BOTTOM,
								left: MARGIN_LEFT, right: MARGIN_RIGHT
							}}
							axes
							axisLabels={{x: "Days Elapsed", y: (this.state.yLabel === "All" ? "People" : `People ${this.state.yLabel}`)}}
							interpolate={"cardinal"}
							dataPoints={numDays < 50 && this.state.yLabel !== "All"}
							xDomainRange={[0, numDays]}
							yDomainRange={[0, data.largestY]}
							lineColors={data.values.length !== 1 ? Object.values(COLORS) : [COLORS[data.label]]}
							clickHandler={this.onGraphClick.bind(this)}
							style={{
								".label": {fill: "black"},
								".axis": {fontSize: "0.75em", fontFamily: "arial"}
							}}
						/>
					</div>
					<div className="text-center">
						{this.state.tooltip}
					</div>
				</div>
			);
		}
		return null;
	}
}