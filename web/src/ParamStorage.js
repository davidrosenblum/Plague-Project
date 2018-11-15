// class for managing parameter data history using session storage
const PARAM_STORAGE_LIMIT = 100;

class ParamStorage{
    constructor(){
        this._numParamSets = 0;
        this._lastParamSet = null;
        this._currDay = 0;

        window.sessionStorage.clear();
    }
    
    // saves parameters to session storage - expects query string format (as provided by inputs.jsx)
    saveParamsInputsDict(dict){
        let params = this.convertToTitleCase(dict);

        // prevent saving multiple set same time in a row
        if(this.paramsNotLastSave(params)){
            window.sessionStorage.setItem(++this._numParamSets, JSON.stringify(params))
            this._currDay = this.numParamSets;
            this._lastParamSet = params;

            // enforce storage capacity - begin deleting from the left bound
            if(this.numParamSets > PARAM_STORAGE_LIMIT){
                window.sessionStorage.removeItem(this.numParamSets - PARAM_STORAGE_LIMIT);
            }

            return true;
        }
        return false;
    }

    // saves parameters to session storage
    saveParams(infectionLength, transmissionRate, virulence, initialPopulation, immunePercent, initialInfected, simulationLength, preset){
        return this.saveParamsInputsDict({
            infection_length:   infectionLength,
            transmission_rate:  transmissionRate,
            virulence,
            initial_population: initialPopulation,
            immune_percent:     immunePercent,
            initial_infected:   initialInfected,
            simulation_length:  simulationLength,
            preset
        });
    }

    // converts underscore format dict to title case (ex: initial_population to InitialPopulation)
    convertToTitleCase(dict){
        return {
            infectionLength:    dict.infection_length,
            transmissionRate:   dict.transmission_rate,
            virulence:          dict.virulence,
            initialPopulation:  dict.initial_population,
            immunePercent:      dict.immune_percent,
            initialInfected:    dict.initial_infected,
            simulationLength:   dict.simulation_length,
            preset:             dict.preset
        };
    }

    // checks if 'newParams' is content different from the last save param set
    paramsNotLastSave(newParams){
        if(!this._lastParamSet) return true;

        for(let param in this._lastParamSet){
            if(this._lastParamSet[param] !== newParams[param]){
                return true;
            }
        }
        return false;
    }

    // gets saved parameters
    getSavedParams(paramId){
        let json = window.sessionStorage.getItem(paramId) || null;
        return json ? JSON.parse(json) : null;
    }

    // moves current day one into the backwards
    stepBackwards(){
        if(this._currDay - 1 >= this.firstStoredDay){
            this._lastParamSet = this.getSavedParams(--this._currDay);
        }
    }

    // move sthe current day one day forwards
    stepForwards(){
        if(this._currDay + 1 <= this.numParamSets){
            this._lastParamSet = this.getSavedParams(++this._currDay);
        }
    }

    get firstStoredDay(){
        if(this.numParamSets > PARAM_STORAGE_LIMIT){
            return this.numParamSets - PARAM_STORAGE_LIMIT;
        }
        return 0;
    }

    get currentParams(){
        return this.getSavedParams(this._currDay);
    }

    get currentDay(){
        return this._currDay;
    }

    get numParamSets(){
        return this._numParamSets;
    }
}

export default new ParamStorage();