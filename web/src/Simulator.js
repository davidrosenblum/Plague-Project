import { Ajax } from "./Ajax";
import { EventEmitter } from "./EventEmitter";

// singleton for holding simulation data
// event-driven to keep chart + graph updated
let Simulator = class Simulator extends EventEmitter{
    constructor(){
        super();

        this.data = null;       // simulation data array
        this._currentDay = 0;    // 'private' current simulation day
    }

    // hits the API for data, signals progress
    // query should be a dictionary of the inputs, will be converted into a query string
    load(query){
        return new Promise((resolve, reject) => {
            // figure out endpoint
            let url = window.location.href.includes("localhost") ? "http://localhost:8080/plague" : `${window.location.origin}/plague`;
            
            // ajax call with query string
            // (null headers)
            Ajax.get(url, null, query)
                .then(xhr => {    
                    // ajax resolved (could be bad/good request, but server responded)
                    if(xhr.status === 200){
                        // good request - attempt to parse results json
                        try{
                            // parse json
                            this.data = JSON.parse(xhr.response);
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

    // async download
    downloadCSV(query){
        let url = window.location.href.includes("localhost") ? `http://localhost:8080/plague/csv` : `${window.location.origin}plague/csv`;
        return Ajax.get(url, null, query);
    }

    // csv download url
    createCSVDownloadURL(query){
        let qs = Ajax.queryString(query);
        return window.location.href.includes("localhost") ? `http://localhost:8080/plague/csv${qs}` : `${window.location.origin}plague/csv${qs}`;
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

    // always emit update
    set currentDay(day){
        this._currentDay = day; 
        this.emit(new Event("update"));
    }

    get hasData(){
        return this.data !== null;
    }

    get currentDay(){
        return this._currentDay;
    }
}

// singleton
export default new Simulator();