import React from "react";
import Simulator from "../Simulator";

export class Inputs extends React.Component{
    constructor(props){
        super(props);

        // input refs
        this.intialImmunityRef = React.createRef();
        this.virilityRef = React.createRef();
        this.fatalityRef = React.createRef();
        this.initialInfectedRef = React.createRef();
        this.intialPopRef = React.createRef();
        this.daysRef = React.createRef();

        this.state = {
            pending: false,         // no new requests while pending (disable buttons)
            message: null,          // message to display (errors)
            lastBtn: null
        };
    }

    componentDidMount(){
        Simulator.on("load", this.onSimulatorLoad.bind(this));
        Simulator.on("error", this.onSimulatorError.bind(this));
    }

    // creates a dictionary of all the inputs and their values (names formatted for the API call) 
    getInputsDictionary(){
        // extract data from inputs to use in query string 
        let immune_percent = this.intialImmunityRef.current.value,
            virility = this.virilityRef.current.value,
            fatal_percent = this.fatalityRef.current.value,
            initial_infected = this.initialInfectedRef.current.value,
            initial_population = this.intialPopRef.current.value,
            infection_length = this.daysRef.current.value;

        // MUST match API expectations! 
        return {immune_percent, virility, fatal_percent, initial_infected, initial_population, infection_length};
    }

    onSimulatorError(){
        this.setState({pending: false});    // enable buttons
    }

    onSimulatorLoad(){
        this.setState({pending: false});    // enable buttons
    }

    // called when then the reset button is clicked
    onReset(){
        // clear input fields?
        /*this.intialImmunityRef.current.value = "";
        this.virilityRef.current.value = "";
        this.fatalityRef.current.value = "";
        this.initialInfectedRef.current.value = "";
        this.intialPopRef.current.value = "";
        this.daysRef.current.value = "";*/

        // cleared stored simulation data
        Simulator.reset();
    }

    // called when the export csv button is clicked
    onExportCSV(){
        if(!this.state.pending){
            this.setState({pending: true});     // disable buttons

            // async csv download request
            Simulator.downloadCSV(this.getInputsDictionary())
                .catch(err => this.setState({message: err.message}))    // error
                .then(() => this.setState({pending: false}));           // enable buttons after fulfilled/rejected
        }
    }

    // called when the form is 'submitted'
    // entire purpose is to block the sending of the form
    // (submit enforces 'required', 'min', 'max' constraints)
    onSubmit(evt){
        // no default submission (using ajax instead)
        evt.preventDefault();

        // problem - both autorun + next day activate this... (only way to do it with using form requires)

        // day-by-day was the trigger
        if(this.state.lastBtn === "day-by-day"){
            if(!Simulator.hasData){
                // disable buttons for loading time
                this.setState({pending: true});
    
                // load data then show next day
                Simulator.load(this.getInputsDictionary())
                    .then(() => Simulator.nextDay())
                    .catch(err => this.setState({message: err.message}));
            }
            else{
                Simulator.nextDay();
            }
        }

        // autorun was the trigger
        else{
            if(!Simulator.hasData){
                // disable buttons for loading time
                this.setState({pending: true});
    
                // load data then auto run
                Simulator.load(this.getInputsDictionary())
                    .then(() => Simulator.autoRun())
                    .catch(err => this.setState({message: err.message}));
            }
            else{
                Simulator.autoRun();
            }
        }
        
    }

    // sets the last button to 'day-by-day' or 'autorun'
    // kinda ugly but its because form has 2 submit buttons
    onFormClick(evt){
        this.setState({lastBtn: evt.target.getAttribute("btn")});
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
                        <input ref={this.initialInfectedRef} className="form-control" type="number" min="0" max="9999" placeholder="How many infected people in the initial population?" required/>
                    </div>
                    <div className="form-group text-center">
                        <button onClick={this.onFormClick.bind(this)} className="input-btn" disabled={this.state.pending} btn="day-by-day">Day-By-Day</button>&nbsp;
                        <button onClick={this.onFormClick.bind(this)} className="input-btn" disabled={this.state.pending} btn="auto-run">Auto Run</button>&nbsp;
                        <button onClick={this.onReset.bind(this)} className="input-btn" disabled={this.state.pending} type="button" >Reset</button>&nbsp;
                        <button onClick={this.onExportCSV.bind(this)} className="input-btn" disabled={this.state.pending} type="button">Export CSV</button>
                    </div>
                </form>
                <div>{this.state.message}</div>
            </div>
        );
    }
}