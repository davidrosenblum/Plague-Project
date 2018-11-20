import "./GraphRange.css"
import React from "react";
import GraphData from "../GraphData";

export class GraphRange extends React.Component{
    constructor(props){
        super(props);

        this.lowerRef = React.createRef();
        this.upperRef = React.createRef();
    }

    onChangeLow(){
        let lowValue = this.lowerRef.current.value,
            low = parseInt(lowValue);

        if(lowValue.length){
            let high = this.selectedMax || this.props.max;

            low = Math.max(this.props.min, low);
            low = Math.min(low, high - 1);

            this.lowerRef.current.value = low;

            GraphData.startDay = low;
        }
    }

    onChangeHigh(){
        let highValue = this.upperRef.current.value,
            high = parseInt(highValue);

        if(highValue.length){
            let low = this.selectedMin || this.props.min;

            high = Math.max(low + 1, high);
            high = Math.min(high, this.props.max);

            this.upperRef.current.value = high;

            GraphData.endDay = high;
        }
    }

    onSubmit(evt){
        evt.preventDefault();
    }

    render(){
        return (
            <div className="graph-range-container">
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input
                        ref={this.lowerRef}
                        min={this.props.min}
                        max={this.props.max}
                        step={1}
                        defaultValue={this.props.min}
                        placeholder="Start"
                        type="number"
                        required
                        onChange={this.onChangeLow.bind(this)}
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
                        onChange={this.onChangeHigh.bind(this)}
                    />
                </form>
            </div>
        )
    }

    get selectedMin(){
        return parseFloat(this.lowerRef.current.value) || this.props.min;
    }

    get selectedMax(){
        return parseFloat(this.upperRef.current.value) || this.props.max;
    }
}