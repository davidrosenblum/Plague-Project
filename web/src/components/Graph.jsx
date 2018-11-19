import React from "react";
import { LineChart } from "react-easy-chart"
import Simulator from "../Simulator";
import GraphData from "../GraphData";
import { GraphRange } from "./GraphRange";
import { TrendLine } from "./TrendLine";

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
	"Dead": 		"gray",
	"TrendLine":	"black"
};

export class Graph extends React.Component{
	constructor(props){
		super(props);

		this.graphContainerRef = React.createRef();
		
	    this.state = {
			visible: false,						// true/false if simulator data to render
			tooltip: null,						// text to display
			containerWidth: WIDTH,				// line graph parent width
			graphLabels: {}						// selected graph labels (Infected, Susceptible, etc)
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

	// exports the current svg graph to a jpg file 
	downloadJPG(){
		let container = this.graphContainerRef.current;
		if(container){
			// get svg element
			let svgElement = container.querySelector("svg");

			// create canvas
			let canvas = document.createElement("canvas");
			let ctx = canvas.getContext("2d");

			// resize canvas to svg
			canvas.width = svgElement.getAttribute("width");
			canvas.height = svgElement.getAttribute("height");

			// convert svg element to xml 
			let svgXml = new XMLSerializer().serializeToString(svgElement);

			// create a data url from the svg+xml
			let blob = new Blob([svgXml], {type: "image/svg+xml"});
			let svgUrl = window.URL.createObjectURL(blob);

			// create an image to hold the svg data url 
			let svgImage = document.createElement("img");

			// when the svgxml image loads...
			svgImage.onload = () => {
				// draw svg+xml onto canvas
				ctx.imageSmoothingEnabled = true;
				ctx.imageSmoothingQuality = "high";
				ctx.drawImage(svgImage, 0, 0);

				// remove black background for white 
				ctx.globalCompositeOperation = "destination-over";
				ctx.fillStyle = "white";
				ctx.fillRect(0, 0, canvas.width, canvas.height);

				// get jpg data
				let jpg = document.createElement("img");
				jpg.onload = () => {
					// jpg is rasterized svg
					// (implement download here)
					//document.body.appendChild(jpg);
					window.URL.revokeObjectURL(svgUrl);
				}
				jpg.setAttribute("src", canvas.toDataURL("image/jpeg"));
			};

			// load the svgxml data
			svgImage.setAttribute("src", svgUrl);
		}
	}

	render(){
		if(this.state.visible){
			let data = GraphData.getData(this.state.graphLabels);
			let dayCount = data.values.length ? data.values[0].length : 0;
			let width = Math.min(this.state.containerWidth, WIDTH);

			return (
				<div className="graph-container">
					<h5>{data.labels.join(" + ") || "(Nothing Selected)"}</h5>
					{this.renderLabelButtons()}
					<div ref={this.graphContainerRef}>
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
							<TrendLine max={data.largestY}/>
						</div>
					</div>
					<div>
						<GraphRange
							min={0}
							max={Simulator.data.length - 1 || 0}
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