// Session Storage class for storing
//  parameter values that were rendered
class ParameterStorage extends EventEmitter {
    constructor(
        infectionLength,
        transmissionRate,
        virulence,
        initialPop,
        initialImmune,
        initialInfected,
        simLength
    ) {
        this._paramCount = 0;
        
        this._paramSet = this.createParamDict(
            infectionLength,
            transmissionRate,
            virulence,
            initialPop,
            initialImmune,
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
        initialImmune,
        initialInfected,
        simLength
    ) {
        this._paramCount++;
        this._paramSet = this.createParamDict(
            infectionLength,
            transmissionRate,
            virulence,
            initialPop,
            initialImmune,
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
        initialImmune,
        initialInfected,
        simLength
        ) {
            paramDict = {
                "InfectionLength" : infectionLength,
                "TransmissionRate": transmissionRate,
                "Virulence"       : virulence,
                "InitialPop"      : initialPop,
                "InitialImmune"   : initialImmune,
                "InitialInfected" : initialInfected,
                "SimLength"       : simLength,
            };
            return paramDict;
        }

    getMostRecentDay() {
        return sessionStorage.getItem(this._paramCount);
    }

    checkDuplicate(paramDict) {

    }
}

export default new ParameterStorage();