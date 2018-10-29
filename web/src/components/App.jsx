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
                <div className="version">
                    <span className="versionNumber">0.1</span>
                </div>
                <br/>
                <main className="container card card-body bg-light">
                    <div className="row">
                        <div className="col-lg-6">
                            <Inputs/>
                        </div>
                        <div className="col-lg-6 graph">
                            <Graph rows={this.state.rows}/>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <Chart/>
                    </div>
                </main>
            </div>
        );
    }
}