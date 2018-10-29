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
    
        if(val.length){
            // enforce min/max constraints
            val = Math.min(Math.max(val, this.props.min), this.props.max); 

            // update inputs
            this.numRef.current.value = val;
            this.rangeRef.current.value = val;
        }
        else{
            // empty input - range at min and number will be empty
            this.rangeRef.current.value = this.props.min;
        }
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
                        className="num-slider-slider"
                    />
                </div>
            </div>
        );
    }

    set value(n){
        this.numRef.current.value = n;
        this.rangeRef.current.value = n;
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