import "../lib/bootstrap.min.css";
import "./App.css";
import React from "react";
import { Inputs } from "./Inputs";
import { Navbar } from "./Navbar";
import { Chart } from "./Chart";
import { Graph } from "./Graph";

export class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            rows: null
        };
    }

    render(){
        return (
            <div>
                <Navbar/>
                <br/>
                <main className="container card card-body bg-light">
                    <div className="row">
                        <div className="col-lg-6">
                            <div>(ONLY USES TEST VALUES - INPUTS DONT MATTER)</div>
                            <Inputs/>
                            <Chart/>
                        </div>
                        <div className="col-lg-6">
                            <Graph rows={this.state.rows}/>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}