import "../lib/bootstrap.min.css";
import "./App.css";
import React from "react";
import { Inputs } from "./Inputs";
import { Navbar } from "./Navbar";
import { Table } from "./Table";
import { Graph } from "./Graph";

export class App extends React.Component{
    render(){
        return (
            <div>
                <Navbar/>
                <br/>
                <span className="Version">V0.2</span>
                <main className="container card card-body bg-light">
                    <div className="row">
                        <div className="col-lg-6">
                            <Inputs/>
                        </div>
                        <div className="col-lg-6 graph">
                            <Graph/>
                        </div>
                    </div>
                    <br/>
                    <div>
                        <Table/>
                    </div>
                </main>
                <footer className="container text-center">
                    <hr/>
                    <div className="row">
                        <div className="col-lg-6">
                            Juall | Rosenblum | Pojero | Erry 
                        </div>
                        <div className="col-lg-6">
                            <a href="https://opensource.org/licenses/MIT" target="_blank">MIT License</a>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}