import { Ajax } from "./Ajax";
import { EventEmitter } from "./EventEmitter";
import { SimulationUpdateEvent } from "./SimulationUpdateEvent";

// singleton for holding simulation data
// event-driven to keep chart + graph updated
let Simulator = class Simulator extends EventEmitter{
    constructor(){
        super();

        this.data = null;           // simulation data array
        this._currentDay = 0;       // 'private' current simulation day
        this._firstInvalidDay = -1; // first invalid day (-1 = no invalid days)
    }

    // hits the API for data, signals progress
    // query should be a dictionary of the inputs, will be converted into a query string
    load(query){
        return new Promise((resolve, reject) => {
            // figure out endpoint
            let url = window.location.href.includes("localhost") ? "http://localhost:8080/plague" : `${window.location.origin}/plague`;
            
            // CORS headers (use foreign domain)
            let headers = {
                "Access-Control-Allow-Origin": window.location.origin
            };

            // ajax call with query string
            // (null headers)
            Ajax.get(url, headers, query)
                .then(xhr => {    
                    // ajax resolved (could be bad/good request, but server responded)
                    if(xhr.status === 200){
                        // good request - attempt to parse results json
                        try{
                            // parse json
                            this.data = JSON.parse(xhr.response);

                            // extract first invalid day
                            this._firstInvalidDay = parseInt(xhr.getResponseHeader("First-Invalid-Day")) || -1;
                        }
                        catch(err){
                            // json parse error (should never happen)
                            reject(err);
                            this.emit(new Event("error"));  // server responded with bad request signal
                        }

                        // done, resolve promise and emit load + data
                        resolve();
                        this.emit(new Event("load"));   // server responded with good request signal

                        this.emit(new Event("data"));   // parsed data signal
                    }
                    else{
                        // bad request
                        reject(new Error(xhr.response || "Bad request"));
                        this.emit(new Event("error"));  // server responded with bad request signal
                    }
                })
                .catch(err => {
                    // ajax request died (really bad NOT a 400 error!)
                    reject(err);
                    this.emit(new Event("error"));  // request died signal
                });
        });
    }

    // asychronously downloads a csv file using ajax
    downloadCSVFile(query){
        return new Promise((resolve, reject) => {
            // figure out endpoint origin
            let origin = window.location.origin.includes("localhost") ? "http://localhost:8080" : window.location.origin;

            // figure out endpoint using origin
            let url = `${origin}/plague`;

            // http request headers
            let headers = {
                "Access-Control-Allow-Origin": window.location.origin,
                "Content-Type": "text/csv"
            };

            // get csv file via Ajax
            Ajax.get(url, headers, query)
                .then(xhr => {
                    // server responded
                    if(xhr.status === 200){
                        // good http status - download
                        // xhr.response = csv text
                        // convert to blob
                        let csvDataBlob = new Blob([xhr.response], {type: "octet/stream"});

                        // create a 'secret' link using the blob
                        let a = document.createElement("a");
                        let url = window.URL.createObjectURL(csvDataBlob);

                        // setup the link to download blob data
                        a.setAttribute("download", "data.csv");
                        a.setAttribute("href", url);

                        // click the link to download the file
                        a.click();
                        window.URL.revokeObjectURL(url);

                        // trigger any listeners
                        resolve("File downloaded.");
                    }
                    else{
                        // bad http status - trigger listeners with error
                        reject(new Error(xhr.response || "Error downloading CSV file."));
                    }
                })
                .catch(err => {
                    // server did not responed - trigger listeners with error
                    reject(new Error(err.message || "Unable to download CSV file."))
                });
        });
    }

    // simulation moves to the last day
    // (triggers listeners)
    autoRun(){
        this.currentDay = this.data.length - 1; // auto emits update
    }

    // steps the simulation forward one day
    // (triggers listeners)
    nextDay(){
        if(this.currentDay < this.data.length){
            this.currentDay++;  // auto emits update
        }
    }

    // resets simulation to day 0 and clears all stored data
    // (triggers listeners)
    reset(){
        this.data = null;
        this.currentDay = 0;
        this.emit(new Event("reset"));
    }

    // updates the graph day 
    setGraphDay(day){
        this.emit(new SimulationUpdateEvent("update-graph", day));
    }

    // always emit update
    set currentDay(day){
        let maxDays = this.hasData ? (this.data.length - 1) : 0;
        this._currentDay = Math.min(day, maxDays); 
        this.emit(new SimulationUpdateEvent("update", this.currentDay));
    }

    get hasData(){
        return this.data !== null;
    }

    get currentDay(){
        return this._currentDay;
    }

    get firstInvalidDay(){
        return this._firstInvalidDay;
    }
}

// singleton
export default new Simulator();