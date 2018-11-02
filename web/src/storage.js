// Session Storage class for storing
//  parameter values that were rendered
class ParameterStorage {
    constructor() {
        this._paramCount = 0;
        this._paramSet = {};
        sessionStorage.setItem(this._paramCount, this._paramSet);
    }

    addStorage(infectionLength, transmissionRate, virulence,
        initPop, initImmune, initInfected, simLength)
    {
        this._paramCount++;
        this._paramSet = {
            "InfectionLength" : "",
            "TransmissionRate": "",
            "Virulence"       : "",
            "InitialPop"      : "",
            "InitialImmune"   : "",
            "InitialInfected" : "",
            "SimLength"       : "",
        };
        sessionStorage.setItem(this._paramCount, this._paramSet);
    }
}

export default new ParameterStorage();