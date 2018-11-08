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

    addStorage(
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
        lastSaveParams = this.getMostRecentDay();

        if (JSON.stringify(newParams) == JSON.stringify(lastSaveParams)) { return true; }
        return false;
    }
}

export default new ParameterStorage();