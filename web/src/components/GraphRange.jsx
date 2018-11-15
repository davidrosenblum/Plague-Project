import "./GraphRange.css"
import React from "react";
import GraphData from "../GraphData";

export class GraphRange extends React.Component{
    constructor(props){
        super(props);

        this.lowerRef = React.createRef();
        this.upperRef = React.createRef();
    }

    onChange(evt){
        let lowValue = this.selectedMin.toString(),
            highValue = this.selectedMax.toString();

        let low = parseInt(lowValue),
            high = parseInt(highValue);

        if(lowValue.length){
            // low in range (ignoring high value)
            low = Math.max(low, this.props.min);
            low = Math.min(low, this.props.max);

        }

        if(highValue.length){
           // high in range (ignoring low value)
            high = Math.max(high, this.props.min);
            high = Math.min(high, this.props.max);
        }

        if(lowValue.length && highValue.length){
            // don't let the values pass each other
            // (reverse the lines order to allow decrease high to move low)
            high = Math.max(low + 1, high);
            low = Math.min(low, high + 1)
        }
       
        this.lowerRef.current.value = low;
        this.upperRef.current.value = high;

        GraphData.setDaysRange(low, high);
    }

    render(){
        return (
            <div className="graph-range-container">
                <input
                    ref={this.lowerRef}
                    min={this.props.min}
                    max={this.props.max}
                    step={1}
                    defaultValue={this.props.min}
                    placeholder="Start"
                    type="number"
                    required
                    onChange={this.onChange.bind(this)}
                />&nbsp;
                <input
                    ref={this.upperRef}
                    min={this.props.min}
                    max={this.props.max}
                    step={1}
                    defaultValue={this.props.max}
                    placeholder="End"
                    type="number"
                    required
                    onChange={this.onChange.bind(this)}
                />
            </div>
        )
    }

    get selectedMin(){
        return parseFloat(this.lowerRef.current.value);
    }

    get selectedMax(){
        return parseFloat(this.upperRef.current.value);
    }
}