import React from "react";
import { Row, Col, Form, FormGroup, Button, Input } from "reactstrap";
import Simulator from "../Simulator";
import ParamStorage from "../ParamStorage";
import GraphData from "../GraphData";
import { NumSlider } from "./NumSlider";
import { ExportsModal } from "./ExportsModal";
import preset from "../preset"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// input range constraints (min, max, step)
export const INPUT_RANGES = {
    INFECTION_LENGTH:   [1, 365, 1],
    TRANSMISSION_RATE:  [0, 20, 0.01],
    VIRULENCE:          [0, 1, 0.001],
    INITIAL_POPULATION: [1, 1000000, 1],
    IMMUNE_PERCENT:     [0, 1, 0.01],
    INITIAL_INFECTED:   [0, 1000000, 1],
    SIMULATION_LENGTH:  [1, 365, 1]
};

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
            pending: false,             // no new requests while pending (disable buttons)
            message: null,              // message to display (errors)
            isDisabled: false,          // to disable/enable fields depending on what preset is selected
            exportModalOpen: false      // export options modal visibility
        };
    }

    componentDidMount(){
        Simulator.on("load", this.onSimulatorLoad.bind(this));
        Simulator.on("error", this.onSimulatorError.bind(this));
        
        // re-render on param storage save - used for disabling the << >> buttons
        ParamStorage.on("save", () => this.forceUpdate());

        // query string params?
        this.extractQueryStringParams();

        // test values?
        if(new URLSearchParams(window.location.search).get("test") === "true"){
            this.useTestValues();
        }
    }
    
    // extracts optional query string parameters from the query string
    extractQueryStringParams(){
        // get query string data
        let qs = new URLSearchParams(window.location.search);

        // extract values from query string - set to the number value or default to min
        // (setting value to below min will result in min)
        this.initialInfectedRef.current.value = parseInt(qs.get("initial_infected")) || -1;
        this.intialImmunityRef.current.value =  parseFloat(qs.get("immune_percent")) || -1;
        this.intialPopRef.current.value =       parseInt(qs.get("initial_population")) || -1;
        this.virulenceRef.current.value =       parseFloat(qs.get("virulence")) || -1;
        this.daysRef.current.value =            parseInt(qs.get("simulation_length")) || -1;
        this.infectionLengthRef.current.value = parseInt(qs.get("infection_length")) || -1;
        this.transmissionRef.current.value =    parseFloat(qs.get("transmission_rate")) || -1;

        // preset query string
        let preset = qs.get("preset");
        if(preset){
            this.presetRef.current.value = preset;
            this.onPresetChange();
        }
    }

    // changes the input parameters to predefined test values
    useTestValues(){
        // set values
        this.initialInfectedRef.current.value = 500;
        this.intialImmunityRef.current.value = 0.10;
        this.intialPopRef.current.value = 1000000;
        this.virulenceRef.current.value = 0.25;
        this.daysRef.current.value = 365;
        this.infectionLengthRef.current.value = 100;
        this.transmissionRef.current.value = 0.2;

        // force save
        ParamStorage.saveParamsInputsDict(this.getInputsDictionary());
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
            preset =                this.presetRef.current.value,
            error_correction =      Simulator.isErrCorrecting

        // make sure infected <= population
        initial_infected = Math.min(initial_infected, initial_population);

        // make sure immune percent is <= healthy population
        let healthy = (initial_population - initial_infected) / initial_population;
        immune_percent = Math.min(immune_percent, healthy);

        // MUST match API expectations! 
        return {immune_percent, transmission_rate, virulence, initial_infected, initial_population, infection_length, simulation_length, preset, error_correction};
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

    toggleExportModal(){
        this.setState(prev => ({exportModalOpen: !prev.exportModalOpen}));
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

        if("errorCorrection" in params){
            Simulator.isErrCorrecting = params.errorCorrection; 
        }
    }

    render(){
        return (
            <div className="input-container">
                <div id="inputs-header-container" className="text-center">
                    <button onClick={() => this.switchParamSet("backwards")} disabled={!ParamStorage.hasPrevDay}>
                        <FontAwesomeIcon icon="angle-double-left" />
                    </button>
                    <h5 className="text-center">Experimental Variables</h5>
                    <button onClick={() => this.switchParamSet("forwards")} disabled={!ParamStorage.hasNextDay}>
                        <FontAwesomeIcon icon="angle-double-right" />
                    </button>
                </div>
                <br/>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="row">
                        <div className="form-group col-lg-6">
                            <NumSlider
                                label={"Length of Infection (Days)"}
                                showRange={true}
                                min={INPUT_RANGES.INFECTION_LENGTH[0]}
                                max={INPUT_RANGES.INFECTION_LENGTH[1]}
                                step={INPUT_RANGES.INFECTION_LENGTH[2]}
                                required={true}
                                ref={this.infectionLengthRef}
                                disabled={this.state.isDisabled}
                            />
                        </div>
                        <div className="form-group col-lg-6">
                            <NumSlider
                                label={"Transmission Rate"}
                                showRange={true}
                                min={INPUT_RANGES.TRANSMISSION_RATE[0]}
                                max={INPUT_RANGES.TRANSMISSION_RATE[1]}
                                step={INPUT_RANGES.TRANSMISSION_RATE[2]}
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
                                min={INPUT_RANGES.VIRULENCE[0]}
                                max={INPUT_RANGES.VIRULENCE[1]}
                                step={INPUT_RANGES.VIRULENCE[2]}
                                required={true}
                                ref={this.virulenceRef}
                                disabled={this.state.isDisabled}
                            />
                        </div>
                        <div className="form-group col-lg-6">
                            <NumSlider
                                label={"Initial Population"}
                                showRange={true}
                                min={INPUT_RANGES.INITIAL_POPULATION[0]}
                                max={INPUT_RANGES.INITIAL_POPULATION[1]}
                                step={INPUT_RANGES.INITIAL_POPULATION[2]}
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
                                min={INPUT_RANGES.IMMUNE_PERCENT[0]}
                                max={INPUT_RANGES.IMMUNE_PERCENT[1]}
                                step={INPUT_RANGES.IMMUNE_PERCENT[2]}
                                required={true}
                                ref={this.intialImmunityRef}
                            />
                        </div>
                        <div className="form-group col-lg-6">
                            <NumSlider
                                label={"Initial Infected"}
                                showRange={true}
                                min={INPUT_RANGES.INITIAL_INFECTED[0]}
                                max={INPUT_RANGES.INITIAL_INFECTED[1]}
                                step={INPUT_RANGES.INITIAL_INFECTED[2]}
                                maxText={"Population"}
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
                                min={INPUT_RANGES.SIMULATION_LENGTH[0]}
                                max={INPUT_RANGES.SIMULATION_LENGTH[1]}
                                step={INPUT_RANGES.SIMULATION_LENGTH[2]}
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
                        <button className="input-btn" disabled={this.state.pending}>Run</button>&nbsp;
                        <button onClick={this.onReset.bind(this)} className="input-btn" disabled={this.state.pending} type="button">Reset</button>&nbsp;
                        <button onClick={this.toggleExportModal.bind(this)} className="input-btn" disabled={this.state.pending} type="button">Export</button>
                    </div>
                </form>
                <div>{this.state.message}</div>
                <ExportsModal
                    isOpen={this.state.exportModalOpen}
                    toggle={this.toggleExportModal.bind(this)}
                    getInputsDictionary={this.getInputsDictionary.bind(this)}
                />
            </div>
        );
    }
}