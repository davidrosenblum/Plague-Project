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
    load(query){
        return new Promise((resolve, reject) => {
            // figure out endpoint
            let url = window.location.href.includes("localhost") ? "http://localhost:8080/test" : `${window.location.href}/test`;

            // ajax call with query string
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
                            this.emit(new Event("error"));
                        }

                        // done, resolve promise and emit load + data
                        resolve();
                        this.emit(new Event("load"));   // server responded with good request signal

                        this.emit(new Event("data"));   // parsed data signal
                    }
                    else{
                        // bad request
                        reject(new Error("Bad request."));
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

    autoRun(){
        this.currentDay = this.data.length - 1; // auto emits update
    }

    nextDay(){
        if(this.currentDay < this.data.length){
            this.currentDay++;  // auto emits update
        }
    }

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