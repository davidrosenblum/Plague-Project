import "./NumSlider.css";
import React from "react";

export class NumSlider extends React.Component{
    constructor(props){
        super(props);

        this.numRef = React.createRef();
        this.rangeRef = React.createRef();
    }

    // mounted - set the default numbers
    componentDidMount(){
        this.numRef.current.value = this.props.init || this.props.min;
        this.rangeRef.current.value = this.props.init || this.props.min;
    }

    // on text field input
    onNumber(evt){
        // set the range value to the number value
        let val = evt.target.value;
    
        // enforce min/max constraints
        val = Math.min(Math.max(val, this.props.min), this.props.max); 

        // update inputs (update both incase bad number entered)
        this.rangeRef.current.value = val;
        this.numRef.current.value = val;
    }

    // on range bar move
    onSlide(evt){
        // set the text value to the number value
        let val = evt.target.value;

        // enforce min/max constraints 
        val = Math.min(Math.max(val, this.props.min), this.props.max);

        // update number input
        this.numRef.current.value = val;
    }

    render(){
        return (
            <div className="num-slider-container">
                <div>
                    <label>{this.props.label}</label>
                    {this.props.showRange ? (` ${this.minText}-${this.maxText}`) : null}
                </div>
                <div>
                    <input 
                        ref={this.numRef}
                        onChange={this.onNumber.bind(this)}
                        type="number"
                        min={this.props.min}
                        max={this.props.max}
                        step={this.props.step}
                        placeholder={this.props.placeholder}
                        required={this.props.required}
                    />
                </div>
                <div>
                    <input
                        ref={this.rangeRef}
                        onChange={this.onSlide.bind(this)}
                        type="range"
                        min={this.props.min}
                        max={this.props.max}
                        step={this.props.step}
                    />
                </div>
            </div>
        );
    }

    get minText(){
        return this.props.minText ? this.props.minText : this.props.min;
    }

    get maxText(){
        return this.props.maxText ? this.props.maxText : this.props.max;
    }

    get value(){
        return this.numRef.current.value;
    }
}