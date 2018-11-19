import React from "react";
import { LineChart } from "react-easy-chart"
import Simulator from "../Simulator";
import GraphData from "../GraphData";
import { GraphRange } from "./GraphRange";

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

export class Graph extends React.Component{
	constructor(props){
		super(props);

		this.graphContainerRef = React.createRef();
		
	    this.state = {
			visible: false,						// true/false if simulator data to render
			tooltip: null,						// text to display
			containerWidth: WIDTH,				// line graph parent width
			graphLabels: {}
	    };
	}

	componentDidMount(){
		// auto select infected
		this.toggleLabel("Infected");

		// simulator singles data set loaded - render data
		Simulator.on("data", () => this.setState({visible: true}));

		// simulator reset - nothing to render
		Simulator.on("reset", () => this.setState({visible: false}));

		// graph update
		GraphData.on("update", () => this.forceUpdate());

		// when the window size changes - resize the graph if neccessary
		window.addEventListener("resize", this.onResize.bind(this));
		this.onResize();
	}

	componentDidUpdate(prevProps, prevState){
		if(prevState.yLabel !== this.state.yLabel){
			this.setState({tooltip: null});
		}
	}

	// when a label ('Infected', 'Susceptible', etc) is clicked...
	toggleLabel(label){
		// copy labels dictionary
		let nextLabels = Object.assign({}, this.state.graphLabels);

		// toggle parameter label
		if(label in nextLabels){
			nextLabels[label] = !nextLabels[label];
		}
		else{
			nextLabels[label] = true;
		}

		// update state
		this.setState({graphLabels: nextLabels});
	}

	// when a point on the graph is clicked...
	onGraphClick(data, evt){
		let {x, y} = data;
		this.setState({tooltip: `${Math.round(y)} people on day ${x}.`});
	}

    onResize(){
        // updates the state to reflect the maximum size allowed for the graph
        let element = this.graphContainerRef.current;
		if(element){
			this.setState({containerWidth: element.getBoundingClientRect().width});
		}
    }

	// renders a simple HTML key for the graph line/colors
	renderLabelButtons(){
		let labels = this.state.graphLabels;

		// border style for button (null = no change)
		let borders = [
			(labels.Infected === true) ? `2px solid ${COLORS.Infected}` : null,
			(labels.Susceptible === true) ? `2px solid ${COLORS.Susceptible}` : null,
			(labels.Immune === true) ? `2px solid ${COLORS.Immune}` : null,
			(labels.Dead === true) ? `2px solid ${COLORS.Dead}` : null
		];

		return (
			<div>
				<button style={{color: COLORS["Infected"], borderBottom: borders[0]}} onClick={() => this.toggleLabel("Infected")} className="pointer graph-button">Infected</button>
				<button style={{color: COLORS["Susceptible"], borderBottom: borders[1]}} onClick={() => this.toggleLabel("Susceptible")} className="pointer graph-button">Susceptible</button>
				<button style={{color: COLORS["Immune"], borderBottom: borders[2]}} onClick={() => this.toggleLabel("Immune") }className="pointer graph-button">Immune</button>
				<button style={{color: COLORS["Dead"], borderBottom: borders[3]}} onClick={() => this.toggleLabel("Dead")} className="pointer graph-button">Dead</button>
			</div>
		);
	}

	render(){
		if(this.state.visible){
			let data = GraphData.getData(this.state.graphLabels);
			let dayCount = data.values.length ? data.values[0].length : 0;
			let width = Math.min(this.state.containerWidth, WIDTH);

			return (
				<div className="graph-container d-print-inline" ref={this.graphContainerRef}>
					<h5>{data.labels.join(" + ") || "(Nothing Selected)"}</h5>
					{this.renderLabelButtons()}
					<div>
						<LineChart
							data={data.values}
							width={width}
							height={HEIGHT}
							margin={{
								top: MARGIN_TOP, bottom: MARGIN_BOTTOM,
								left: MARGIN_LEFT, right: MARGIN_RIGHT
							}}
							axes
							axisLabels={{x: "Days Elapsed", y: "People"}}
							dataPoints={dayCount < 0} // enable this later
							xDomainRange={[GraphData.startDay, GraphData.endDay]}
							yDomainRange={[0, data.largestY]}
							lineColors={data.labels.map(label => COLORS[label])}
							clickHandler={this.onGraphClick.bind(this)}
							style={{
								".label": {fill: "black"},
								".axis": {fontSize: "0.75em", fontFamily: "arial"}
							}}
						/>
					</div>
					<div>
						<GraphRange
							min={1}
							max={Simulator.data.length || 1}
						/>
					</div>
					<div className="text-center">
						{this.state.tooltip}
					</div>
				</div>
			);
		}
		return <div ref={this.graphContainerRef}></div> // required for resize to work! 
	}
} 