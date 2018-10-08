import "../lib/bootstrap.min.css";
import React from "react";

export class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {

        };
    }

    render(){
        return (
            <div className="container">
                <div className="text-center">
                    This is a React app with Bootstrap CSS.
                </div>
            </div>
        );
    }
}