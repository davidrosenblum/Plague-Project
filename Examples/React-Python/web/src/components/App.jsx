import "./App.css";
import "../lib/bootstrap.min.css";
import React from "react";
import { Inputs } from "./Inputs";
import { ResultsTable } from "./ResultsTable";

export class App extends React.Component{
    render(){
        return (
            <div className="container card card-body bg-light">
                <div className="row">
                    <div className="col-lg-6">
                        <Inputs/>
                        <ResultsTable/>
                    </div>
                    <div className="col-lg-6">

                    </div>
                </div>
            </div>
        );
    }
}