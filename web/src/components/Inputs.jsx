import React from "react";
import Simulator from "../Simulator";
import ParamStorage from "../ParamStorage";
import { NumSlider } from "./NumSlider";
import preset from "../preset"

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
        this.presetRef = React.createRef();

        this.state = {
            pending: false,         // no new requests while pending (disable buttons)
            message: null,          // message to display (errors)
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

            ParamStorage.saveParamsInputsDict(this.getInputsDictionary());
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
            simulation_length =     this.daysRef.current.value,
            preset =                this.presetRef.current.value;

        // make sure infected <= population
        initial_infected = Math.min(initial_infected, initial_population);

        // MUST match API expectations! 
        return {immune_percent, transmission_rate, virulence, initial_infected, initial_population, infection_length, simulation_length, preset};
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

    // downloads the csv file
    downloadCSV(){
        if(!this.state.pending){
            // disable buttons
            this.setState({pending: true});

            Simulator.downloadCSVFile(this.getInputsDictionary())
                .catch(err => {
                    // something went wrong (server did not respond or bad request)
                    this.setState({message: err.message});
                })
                .then(() => {
                    // (this fires when any response happens not successful only!)
                    // always enable buttons
                    this.setState({pending: false})
                });
        }
    }

    runSimulation(){
        // no simulation data - load it (first simulation or reset happened)
        if(!Simulator.hasData){
            // disable buttons for loading time
            this.setState({pending: true});

            // load data then auto run
            Simulator.load(this.getInputsDictionary())
                .then(() => {
                    this.setState({message: null}); // remove possible err message

                    ParamStorage.saveParamsInputsDict(this.getInputsDictionary());  // save parameters
                })
                .catch(err => this.setState({message: err.message}));
        }
        else{
            // verify current parameters are not the same as the ones already run
            // (prevents reloading data that we already have!)
            let currParams = ParamStorage.convertToTitleCase(this.getInputsDictionary());

            if(ParamStorage.paramsNotLastSave(currParams)){
                // parameters are different than last time
                // run new simulation
                Simulator.reset();      // triggers clearing graph/table and clears data
                this.runSimulation();   // runs again, but sim will have no data
            }
        }
    }

    // called when the form is 'submitted'
    // entire purpose is to block the sending of the form
    // (submit enforces 'required', 'min', 'max' constraints)
    onSubmit(evt){
        // no default submission (using ajax instead)
        evt.preventDefault();

        this.runSimulation();
    }

    onPresetChange(){
        let value = this.presetRef.current.value;
        
        if(value !== "Custom"){
            this.setState({isDisabled: true});
            this.infectionLengthRef.current.value = preset[value]["Infection Length"];
            this.transmissionRef.current.value = preset[value]["Transmission"];
            this.virulenceRef.current.value = preset[value]["Virulence"]
        }else{
            this.setState({isDisabled: false});
        }
    }

    // moves the parameter storage day & updates UI inputs
    switchParamSet(direction){
        // move the day
        if(direction === "backwards"){
            ParamStorage.stepBackwards();
        }
        else if(direction === "forwards"){
            ParamStorage.stepForwards();
        }
        else throw new Error("Parameter switch direction must be 'forwards' or 'backwards'.");

        // bail if nothing already saved
        let params = ParamStorage.currentParams || null;
        if(!params) return; // nothing saved

        // fill out UI form
        this.infectionLengthRef.current.value = params.infectionLength;
        this.transmissionRef.current.value = params.transmissionRate;
        this.virulenceRef.current.value = params.virulence;
        this.intialPopRef.current.value = params.initialPopulation;
        this.intialImmunityRef.current.value = params.immunePercent;
        this.initialInfectedRef.current.value = params.initialInfected;
        this.daysRef.current.value = params.simulationLength;

        this.presetRef.current.value = params.preset;
        this.onPresetChange();
    }

    render(){
        return (
            <div>
                <div id="inputs-header-container" className="text-center">
                    <button onClick={() => this.switchParamSet("backwards")}>&larr;</button>
                    <h5 className="text-center">Experimental Variables</h5>
                    <button onClick={() => this.switchParamSet("forwards")}>&rarr;</button>
                </div>
                <br/>
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
                            <select ref={this.presetRef} className="form-control" onChange={this.onPresetChange.bind(this)}>
                                <option>Custom</option>
                                <option>Seasonal Flu</option>
                                <option>Smallpox</option>
                                <option>Polio</option>
                                <option>Measles</option>
                                <option>Ebola</option>
                                <option>H1N1 Flu</option>
                                <option>H5N1 Flu</option>
                                <option>1918 Flu</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group text-center">
                        <button className="input-btn" disabled={this.state.pending} btn="auto-run">Run</button>&nbsp;
                        <button onClick={this.onReset.bind(this)} className="input-btn" disabled={this.state.pending} type="button" >Reset</button>&nbsp;
                        <button className="input-btn" disabled={this.state.pending}>Export CSV</button>
                    </div>
                </form>
                <div>{this.state.message}</div>
            </div>
        );
    }
}