import React from "react";
import Simulator from "../Simulator";
import ParameterStorage from "../Storage";
import { NumSlider } from "./NumSlider";
import ParameterStorage from "../Storage";

export class Inputs extends React.Component{
    constructor(props){
        super(props);

        // input refs
        this.intialImmunityRef = React.createRef();
        this.transmissionRef = React.createRef();
        this.virulenceRef = React.createRef();
        this.initialInfectedRef = React.createRef();
        this.intialPopRef = React.createRef();
        this.infectionLengthRef = React.createRef();
        this.daysRef = React.createRef();

        this.state = {
            pending: false,         // no new requests while pending (disable buttons)
            message: null,          // message to display (errors)
            lastBtn: null,
            isDisabled: false       // to disable/enable fields depending on what preset is selected
        };        
    }

    componentDidMount(){
        Simulator.on("load", this.onSimulatorLoad.bind(this));
        Simulator.on("error", this.onSimulatorError.bind(this));

        // test values
        if(new URLSearchParams(window.location.search).get("test") === "true"){
            this.initialInfectedRef.current.value = 500;
            this.intialImmunityRef.current.value = 0.10;
            this.intialPopRef.current.value = 1000000;
            this.virulenceRef.current.value = 0.25;
            this.daysRef.current.value = 365;
            this.infectionLengthRef.current.value = 100;
            this.transmissionRef.current.value = 0.2;

            paramStorage = ParameterStorage(
                this.infectionLengthRef.current.value,
                this.transmissionRef.current.value,
                this.virulenceRef.current.value,
                this.intialPopRef.current.value,
                this.intialImmunityRef.current.value,
                this.initialInfectedRef.current.value,
                this.daysRef.current.value
            );
        }
    }

    // creates a dictionary of all the inputs and their values (names formatted for the API call) 
    getInputsDictionary(){
        // extract data from inputs to use in query string 
        let immune_percent =        this.intialImmunityRef.current.value,
            transmission_rate =     this.transmissionRef.current.value,
            virulence =             this.virulenceRef.current.value,
            initial_infected =      this.initialInfectedRef.current.value,
            initial_population =    this.intialPopRef.current.value,
            infection_length =      this.infectionLengthRef.current.value,
            simulation_length =     this.daysRef.current.value;

        // make sure infected <= population
        initial_infected = Math.min(initial_infected, initial_population);

        // MUST match API expectations! 
        return {immune_percent, transmission_rate, virulence, initial_infected, initial_population, infection_length, simulation_length};
    }

    onSimulatorError(){
        this.setState({pending: false});    // enable buttons
    }

    onSimulatorLoad(){
        this.setState({pending: false});    // enable buttons
    }

    // called when then the reset button is clicked
    onReset(){
        // cleared stored simulation data
        Simulator.reset();
    }

    dayByDay(){
        if(!Simulator.hasData){
            // disable buttons for loading time
            this.setState({pending: true});

            // load data then show next day
            Simulator.load(this.getInputsDictionary())
                .then(() => {
                    this.setState({message: null}); // remove possible err message
                    Simulator.nextDay();
                    paramStorage.saveParamsDict(this.getInputsDictionary());
                })
                .catch(err => this.setState({message: err.message}));
        }
        else{
            Simulator.nextDay();
        }
    }

    autoRun(){
        if(!Simulator.hasData){
            // disable buttons for loading time
            this.setState({pending: true});

            // load data then auto run
            Simulator.load(this.getInputsDictionary())
                .then(() => {
                    this.setState({message: null}); // remove possible err message
                    Simulator.autoRun();
                    paramStorage.saveParamsDict(this.getInputsDictionary());
                })
                .catch(err => this.setState({message: err.message}));
        }
        else{
            Simulator.autoRun();
        }
    }

    // downloads the csv file
    downloadCSV(){
        if(!this.state.pending){
            // create download link (never rendered)
            let url = Simulator.createCSVDownloadURL(this.getInputsDictionary());

            // create a link tag
            let link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute("target", "_blank");
            link.setAttribute("download", "download");

            // click the tag
            link.click();
            link = null;

            /*
            //this.setState({pending: true});     // disable buttons

            // async csv download request
            Simulator.downloadCSV(this.getInputsDictionary())
                .catch(err => this.setState({message: err.message}))    // error
                .then(() => this.setState({pending: false}));           // enable buttons after fulfilled/rejected
            */
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
            this.dayByDay();
        }

        // autorun was the trigger
        else if(this.state.lastBtn === "auto-run"){
            this.autoRun();
        }

        // csv export was the trigger
        else if(this.state.lastBtn === "export-csv"){
            this.downloadCSV();
        }
        
    }

    // sets the last button to 'day-by-day' or 'autorun'
    // kinda ugly but its because form has 2 submit buttons
    onFormClick(evt){
        this.setState({lastBtn: evt.target.getAttribute("btn")});
    }

    onPresetChange(evt){
        if(evt.target.value != "Custom"){
            this.setState({isDisabled:true});
        }else{
            this.setState({isDisabled:false});
        }
    }

    render(){
        return (
            <div>
                <h5 className="text-center">Experimental Variables</h5>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="row">
                        <div className="form-group col-lg-6">
                            <NumSlider
                                label={"Length of Infection (Days)"}
                                showRange={true}
                                min={1}
                                max={365}
                                step={1}
                                required={true}
                                ref={this.infectionLengthRef}
                                disabled={this.state.isDisabled}
                            />
                        </div>
                        <div className="form-group col-lg-6">
                            <NumSlider
                                label={"Transmission Rate"}
                                showRange={true}
                                min={0}
                                max={20}
                                step={0.01}
                                required={true}
                                ref={this.transmissionRef}
                                disabled={this.state.isDisabled}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-lg-6">
                            <NumSlider
                                label={"Virulence"}
                                showRange={true}
                                min={0}
                                max={1}
                                step={0.001}
                                required={true}
                                ref={this.virulenceRef}
                                disabled={this.state.isDisabled}
                            />
                        </div>
                        <div className="form-group col-lg-6">
                            <NumSlider
                                label={"Initial Population"}
                                showRange={true}
                                min={1}
                                max={1000000}
                                step={1}
                                required={true}
                                ref={this.intialPopRef}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-lg-6">
                            <NumSlider
                                label={"Initial Immunity Percent"}
                                showRange={true}
                                min={0}
                                max={1}
                                step={0.01}
                                required={true}
                                ref={this.intialImmunityRef}
                            />
                        </div>
                        <div className="form-group col-lg-6">
                            <NumSlider
                                label={"Initial Infected"}
                                showRange={true}
                                min={0}
                                max={1000000}
                                maxText={"Population"}
                                step={1}
                                required={true}
                                ref={this.initialInfectedRef}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-lg-6">
                            <NumSlider
                                label={"Simulation Length (Days)"}
                                showRange={true}
                                min={1}
                                max={365}
                                step={1}
                                required={true}
                                ref={this.daysRef}
                            />
                        </div>
                        <div className="form-group col-lg-6">
                            <label>Presets:</label>
                            <select className="form-control" onChange={this.onPresetChange.bind(this)}>
                                <option value="Custom">Custom</option>
                                <option value="Not Custom">Not Custom</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group text-center">
                        <button onClick={this.onFormClick.bind(this)} className="input-btn" disabled={this.state.pending} btn="day-by-day">Day-By-Day</button>&nbsp;
                        <button onClick={this.onFormClick.bind(this)} className="input-btn" disabled={this.state.pending} btn="auto-run">Auto Run</button>&nbsp;
                        <button onClick={this.onReset.bind(this)} className="input-btn" disabled={this.state.pending} type="button" >Reset</button>&nbsp;
                        <button onClick={this.onFormClick.bind(this)} className="input-btn" disabled={this.state.pending} btn="export-csv">Export CSV</button>
                    </div>
                </form>
                <div>{this.state.message}</div>
            </div>
        );
    }
}