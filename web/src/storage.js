// Session Storage class for storing
//  parameter values that were rendered
class ParameterStorage extends EventEmitter {
    constructor(
        infectionLength,
        transmissionRate,
        virulence,
        initialPop,
        immunePercent,
        initialInfected,
        simLength
    ) {
        this._paramCount = 0;
        
        this._paramSet = this.createParamDict(
            infectionLength,
            transmissionRate,
            virulence,
            initialPop,
            immunePercent,
            initialInfected,
            simLength
        )

        sessionStorage.setItem(this._paramCount, this._paramSet);
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
        this._paramCount++;
        this._paramSet = this.createParamDict(
            infectionLength,
            transmissionRate,
            virulence,
            initialPop,
            immunePercent,
            initialInfected,
            simLength
        )
        sessionStorage.setItem(this._paramCount, this._paramSet);
    }
    
    saveParamsDict(paramsDict) {
        this._paramCount++;
        this._paramSet = this.convertInputsDict(paramsDict);
        sessionStorage.setItem(this._paramCount, this._paramSet);
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
            paramDict = {
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

    getMostRecentDay() {
        return sessionStorage.getItem(this._paramCount);
    }

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
        newParams = this.convertInputsDict(paramDict);

        if (JSON.stringify(newParams) == JSON.stringify(this._paramSet)) { return true; }
        return false;
    }
}

export default new ParameterStorage();