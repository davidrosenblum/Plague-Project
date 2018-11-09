import React from "react";
import Simulator from "../Simulator";
import { LineChart, d3 } from "react-d3-components";

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

	// gets the data values (multiple lines) up to do the current
	getDataForAllLabels(){
		let largestY = 0;

		let values = [];		// holds the correctly formatted values
		let valuesObj = {};		// helps to sort by label ('Infected', 'Susceptible', etc)

		// iterate over each day...
		for(let i = 0; i <= this.state.day; i++){
			// day json, example: {'Infected': 100, 'Susceptible': 5, etc}
			let row = this.state.data[i]; 

			// for each label... (row[label] is the y value for the y label (ex: how many infected))
			for(let label in row){
				let y = parseFloat(row[label]);

				largestY = Math.max(largestY, y);

				let pt = {x: i, y};

				if(label in valuesObj){
					valuesObj[label].values.push(pt);
				}
				else{
					valuesObj[label] = {
						label, values: [pt]
					};
				}
			}
		}

		// convert the dictionary into the correctly formatted array
		for(let key in valuesObj){
			values.push(valuesObj[key]);
		}

		// allData is used by render method to determine multiline
		return {values, largestY, allData: true};
	}

	// gets the data values up to the current day
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

		// d3 wants {values:[...]}
		return {values, largestY};
	}

	render(){
		// graph size constants
		const WIDTH = 		540,
			HEIGHT = 		525,
			MARGIN_TOP = 	10,
			MARGIN_BOTTOM =	50,
			MARGIN_LEFT = 	80,
			MARGIN_RIGHT = 	10;

		let data = this.getData();
		if(data){
			// 2 ways to render based on multiline or 1 line
			// 1 line = {values: [....]}
			// multiline = [ { label: "", values: [ {x, y} ] } ]
			// "allData" in data === multiline 
			let dataToRender = "allData" in data ? data.values : data;
			let endX = "allData" in data ? data.values[0].values.length : data.values.length;

			// scale the x-axis (0 - last day) with graph width
			let xScale = d3.scale.linear()
				.domain([0, endX-1])
				.range([0, WIDTH - MARGIN_LEFT - MARGIN_RIGHT]);
			
			// scale the y-axis based on (0 - biggest y) with graph height
			let yScale = d3.scale.linear()
				.domain([data.largestY, 0])
				.range([0, HEIGHT - MARGIN_TOP - MARGIN_BOTTOM]);

			return (
				<div>
					<h5></h5>
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
							data={dataToRender}
							axes
							width={WIDTH}
							height={HEIGHT}
							margin={{
								top: MARGIN_TOP, bottom: MARGIN_BOTTOM,
								left: MARGIN_LEFT, right: MARGIN_RIGHT
							}}
							xAxis={{label: "Day"}}
							yAxis={{label: this.state.yLabel}}
							xScale={xScale}
							yScale={yScale}
							colorScale={d3.scale.category20()}
							tooltipMode={"element"}
							tooltipContained={true}
							tooltipHtml={(label, pt) => `Day ${pt.x} - ${pt.y} ${label || this.state.yLabel}`}
						/>
					</div>
				</div>
			);
		}
		return null;
	}
}