import React from "react";
import { Ajax } from "../Ajax";

export class Inputs extends React.Component{
    constructor(props){
        super(props);

        // input refs
        this.intialImmunityRef = React.createRef();
        this.virilityRef = React.createRef();
        this.fatalityRef = React.createRef();
        this.initialinfectedRef = React.createRef();
        this.intialPopRef = React.createRef();
        this.daysRef = React.createRef();

        this.state = {
            pending: false,        // no new requests while pending (disable buttons)
            message: null          // message to display (errors)
        };
    }

    // creates a dictionary of all the inputs and their values (names formatted for the API call) 
    getInputsDictionary(){
        // extract data from inputs to use in query string 
        let immune = this.intialImmunityRef.current.value,
            virility = this.virilityRef.current.value,
            fatality = this.fatalityRef.current.value,
            initial_infected = this.initialinfectedRef.current.value,
            initial_population = this.intialPopRef.current.value,
            model_length = this.daysRef.current.value;

        // MUST match API expectations! 
        return {immune, virility, fatality, initial_infected, initial_population, model_length};
    }

    // called when the auto run button is clicked
    onDayByDay(){
        this.setState({pending: true}); // disable buttons

        // logic...
    }

    // caled when the auto run button is clicked
    onAutoRun(){
        this.setState({pending: true}); // disable buttons

        // logic...
    }

    // called when then the reset button is clicked
    onReset(){
        // clear input fields
        this.intialImmunityRef.current.value = "";
        this.virilityRef.current.value = "";
        this.fatalityRef.current.value = "";
        this.initialinfectedRef.current.value = "";
        this.intialPopRef.current.value = "";
        this.daysRef.current.value = "";

        // cleared store simulation data
        // logic...
    }

    // called when the export csv button is clicked
    onExportCSV(){
        // logic...
    }

    // called when the form is 'submitted'
    // entire purpose is to block the sending of the form
    // (submit enforces 'required', 'min', 'max' constraints)
    onSubmit(evt){
        // no default submission (using ajax instead)
        evt.preventDefault();
    }

    render(){
        return (
            <div>
                <h5 className="text-center">Experimental Variables</h5>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">
                        <label>Length of Infection (Days)</label>
                        <input ref={this.daysRef} className="form-control" type="number" min="1" max="365" placeholder="How many days?" required/>
                    </div>
                    <div className="form-group">
                        <label>Virility</label>
                        <input ref={this.virilityRef} className="form-control" type="number" min="0" max="0.75" step="0.01" placeholder="How infectious?" required/>
                    </div>
                    <div className="form-group">
                        <label>Fatality</label>
                        <input ref={this.fatalityRef} className="form-control" type="number" min="0" max="1" step="0.01" placeholder="What % of people die when infected?" required/>
                    </div>
                    <div className="form-group">
                        <label>Initial Population</label>
                        <input ref={this.intialPopRef} className="form-control" type="number" min="1" max="9999" placeholder="How many people in the initial population?" required/>
                    </div>
                    <div className="form-group">
                        <label>Initial Immunity</label>
                        <input ref={this.intialImmunityRef} className="form-control" type="number" min="0" max="1" step="0.01" placeholder="What % of the intial population people is immune?" required/>
                    </div>
                    <div className="form-group">
                        <label>Initial Infected</label>
                        <input ref={this.initialinfectedRef} className="form-control" type="number" min="0" max="9999" placeholder="How many infected people in the initial population?" required/>
                    </div>
                    <div className="form-group text-center">
                        <button onClick={this.onDayByDay.bind(this)} className="input-btn" disabled={this.state.pending}>Day-By-Day</button>&nbsp;
                        <button onClick={this.onAutoRun.bind(this)} className="input-btn" disabled={this.state.pending}>Auto Run</button>&nbsp;
                        <button onClick={this.onReset.bind(this)} className="input-btn" disabled={this.state.pending} type="button" >Reset</button>&nbsp;
                        <button onClick={this.onExportCSV.bind(this)} className="input-btn" disabled={this.state.pending} type="button">Export CSV</button>
                    </div>
                </form>
            </div>
        );
    }
}