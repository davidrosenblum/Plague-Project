import Simulator from "./Simulator";
import { EventEmitter } from './EventEmitter';

class GraphData extends EventEmitter{
    constructor(){
        super();

        this._startDay = -1;
        this._endDay = Number.MAX_SAFE_INTEGER;
        this._trendLineY = 0;

        this.extractTrendLine();
    }

    // extracts trend line from query strings
    extractTrendLine(){
        // query strings
        let qs = new URLSearchParams(window.location.search);
        
        // get trend line as float (default 0)
		let trendLineY = parseFloat(qs.get("trend_line")) || 0;
        this._trendLineY = trendLineY;
    }

    getData(keysDict){
        let simData = Simulator.data;   // simulation data array
        let labeledPoints = {};         // stores the points array in a dictionary (key=label)
        let largestY = 0;               // largest y in data set

        if(simData){
            // start & end indeces 
            let start = this.startDay > -1 ? this.startDay : 0;
            let end = this.endDay < simData.length ? this.endDay : (simData.length - 1);

            for(let i = start; i <= end; i++){
                let day = simData[i];

                // label is 'Infected', 'Susceptible', etc (whatever is provided)
                for(let label in keysDict){
                    if(keysDict[label] !== true){
                        continue;
                    }

                    // get y value (x is always the day/index)
                    let y = parseFloat(day[label]);

                    // create x, y point
                    let pt = {x: i, y};

                    // store the point to its associated label
                    if(label in labeledPoints){
                        labeledPoints[label].push(pt);
                    }
                    else{
                        labeledPoints[label] = [pt];
                    }

                    // update largest Y
                    largestY = Math.max(largestY, y);
                }
            }

            // optional trend line points
            if(this.trendLineY > 0){
                // creates an array of [{x, y},...] where x is the day and y is the trend line Y
                labeledPoints["TrendLine"] = new Array(end - start).fill(null).map((val, index) => ({x: index + start, y: this.trendLineY}));
            }
        }

        // convert sorted dictionary into an array
        let values = [];
        Object.keys(labeledPoints).forEach(key => values.push(labeledPoints[key]));

        // gets all the labels that are in the dictionary and true (in order)
        let labels = Object.keys(keysDict).filter(key => keysDict[key] === true);

        return {values, largestY, labels};
    }

    // sets the start/end days
    // (better to use this than setting start & end days individually due to 1 update)
    setDaysRange(start, end){
        this._startDay = start;
        this._endDay = end;
        this.emit(new Event("update"));
    }

    set startDay(value){
        this._startDay = value;
        this.emit(new Event("update"));
    }

    set endDay(value){
        this._endDay = value;
        this.emit(new Event("update"));
    }

    set trendLineY(value){
        this._trendLineY = value;
        this.emit(new Event("update"));
    }

    get startDay(){
        return Math.max(0, this._startDay);
    }

    get endDay(){
        return Math.min(this._endDay, Simulator.data ? Simulator.data.length : 0);
    }

    get trendLineY(){
        return this._trendLineY;
    }
}

export default new GraphData();