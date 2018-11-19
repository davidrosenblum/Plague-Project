import "./TrendLine.css";
import React from "react";
import GraphData from "../GraphData";

export class TrendLine extends React.Component{
    constructor(props){
        super(props);

        this.rangeRef = React.createRef();
        this.numRef = React.createRef();
    }

    onSlide(){
        let val = this.rangeRef.current.value;
        GraphData.trendLineY = parseInt(val);
    }

    render(){
        return (
            <div className="trend-line-container">
                <input
                    className="trend-slider"
                    ref={this.rangeRef}
                    type="range"
                    min={this.props.min || 0}
                    max={this.props.max}
                    step={100}
                    defaultValue={this.props.defaultValue || 0}
                    onChange={this.onSlide.bind(this)}
                />
                <div className="trend-line-text">
                Trend Line
                </div>
            </div>
        )
    }
}