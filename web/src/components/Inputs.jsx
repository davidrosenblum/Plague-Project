import "../lib/bootstrap.min.css";
import React from "react";

export class Inputs extends React.Component{
    constructor(props){
        super(props);

        this.state = {
    
        };
    }



    render(){
        return (
            <form>
                <div className="form-group">
                    Initial Immunity: <input type="text" name="Immunity" required/>
                    <br/> <br/>
                    Virulance: <input type="text" name="Virulance" required/>
                    <br/><br/>
                    Duration: <input type="text" name="Duration" required/>
                    <br/><br/>
                    Transmission Rate: <input type="text" name="TransmissionRate" required/>
                    <br/><br/>
                    Initial Population: <input type="text" name="InitialPop" required/>
                    <br/><br/>
                    # of Days: <input type="text" name="#OfDays" required/>
                </div>
            </form>
        );
    }
}