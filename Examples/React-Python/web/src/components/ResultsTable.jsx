import React from "react";

export class ResultsTable extends React.Component{
    render(){
        return this.props.data ? (
            <div>
                <table className="table">
                    <thead>

                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
        ) : null;
    }
}