import React from "react";
import { ajax } from "../ajax";

export class Inputs extends React.Component{
    constructor(props){
        super(props);

        this.initPopRef = React.createRef();
        this.initInfectedRef = React.createRef();
        this.infectionLengthRef = React.createRef();
        this.virilityRef = React.createRef();
        this.fatalPercentRef = React.createRef();
        this.immunePercentRef = React.createRef();
        this.modelLengthRef = React.createRef();

        this.state = {
            message: null
        };
    }

    onSubmit(evt){
        evt.preventDefault();

        let params = {
            infection_length:   this.infectionLengthRef.current.value,
            virility:           this.virilityRef.current.value,
            percent_fatal:      this.fatalPercentRef.current.value,
            initial_population: this.initPopRef.current.value,
            immune_percent:     this.immunePercentRef.current.value,
            initial_infected:   this.initInfectedRef.current.value,
            model_length:       this.modelLengthRef.current.value
        };

        let qs = ""
        for(let p in params){
            qs += `${p}=${params[p]}&`;
        }
        qs = qs.substring(0, qs.length - 1);

        let url = `http://localhost:9999/plague?${qs}`;

        let headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Access-Control-Allow-Origin"
        };

        ajax("GET", url, headers)
            .then(xhr => {
                if(xhr.status === 200){
                    this.setState({message: xhr.response});
                }
                else{
                    this.setState({message: "Error."});
                }
            })
            .catch(err => this.setState({message: err.message}))
    }

    render(){
        return (
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">
                        <label>Initial Population</label>
                        <input ref={this.initPopRef} className="form-control" type="number" required/>
                    </div>
                    <div className="form-group">
                        <label>Initial Infected</label>
                        <input ref={this.initInfectedRef} className="form-control" type="number" required/>
                    </div>
                    <div className="form-group">
                        <label>Infection Length</label>
                        <input ref={this.infectionLengthRef} className="form-control" type="number" required/>
                    </div>
                    <div className="form-group">
                        <label>Virility</label>
                        <input ref={this.virilityRef} className="form-control" type="number" required/>
                    </div>
                    <div className="form-group">
                        <label>Fatal %</label>
                        <input ref={this.fatalPercentRef} className="form-control" type="number" required/>
                    </div>
                    <div className="form-group">
                        <label>Immune %</label>
                        <input ref={this.immunePercentRef} className="form-control" type="number" required/>
                    </div>
                    <div className="form-group">
                        <label>Model Length</label>
                        <input ref={this.modelLengthRef} className="form-control" type="number" required/>
                    </div>
                    <div className="form-group text-center">
                        <input type="submit"/>
                    </div>
                </form>
                <div>{this.state.message}</div>
            </div>
        );
    }
}

/*
self.infection_length = infection_length
        self.virility = virility
        self.percent_fatal = percent_fatal
        self.initial_population = init_pop
        self.immune_percent = immune_percent
        self.initial_infected = init_infected
        self.model_length = model_length
*/