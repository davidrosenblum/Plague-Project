// Session Storage class for storing
//  parameter values that were rendered
class ParameterStorage {
    constructor() {
        this._paramCount = 0;
        this._storageIter = 0;        
        this._paramSet = {};
        sessionStorage.clear();
    }

    saveParams(
        infectionLength,
        transmissionRate,
        virulence,
        initialPop,
        immunePercent,
        initialInfected,
        simLength
    ) {
        let newParams = this.createParamDict(
            infectionLength,
            transmissionRate,
            virulence,
            initialPop,
            immunePercent,
            initialInfected,
            simLength
        )

        if (!(JSON.stringify(newParams) == JSON.stringify(this._paramSet))) {
            this._paramSet = newParams;
            sessionStorage.setItem(this._paramCount, JSON.stringify(this._paramSet));
            this._paramCount++;
        }
    }
    
    saveParamsDict(paramsDict) {
        if (!this.checkDuplicateLastSave(paramsDict)) {
            this._paramSet = this.convertInputsDict(paramsDict);
            sessionStorage.setItem(this._paramCount, JSON.stringify(this._paramSet));
            this._paramCount++;
        }
    }

    createParamDict(
        infectionLength,
        transmissionRate,
        virulence,
        initialPop,
        immunePercent,
        initialInfected,
        simLength
        ) {
            let paramDict = {
                "InfectionLength" : infectionLength,
                "TransmissionRate": transmissionRate,
                "Virulence"       : virulence,
                "InitialPop"      : initialPop,
                "ImmunePercent"   : immunePercent,
                "InitialInfected" : initialInfected,
                "SimLength"       : simLength,
            };
            return paramDict;
        }

    // getMostRecentDay() {
    //     return sessionStorage.getItem(this._paramCount);
    // }

    convertInputsDict(inputsDict) {
        return this.createParamDict(
            inputsDict["infection_length"],
            inputsDict["transmission_rate"],
            inputsDict["virulence"],
            inputsDict["initial_population"],
            inputsDict["immune_percent"],
            inputsDict["initial_infected"],
            inputsDict["simulation_length"]
        );
    }

    checkDuplicateLastSave(paramDict) {
        let newParams = this.convertInputsDict(paramDict);

        if (JSON.stringify(newParams) == JSON.stringify(this._paramSet)) { return true; }
        return false;
    }
}

export default new ParameterStorage();