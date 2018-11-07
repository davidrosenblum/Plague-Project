// Session Storage class for storing
//  parameter values that were rendered
class ParameterStorage extends EventEmitter {
    constructor() {
        this._paramCount = 0;
        
        this._paramSet = {
            "InfectionLength"  : 0,
            "TransmissionRate" : 0,
            "Virulence"        : 0,
            "InitialPop"       : 0,
            "InitialImmune"    : 0,
            "InitialInfected"  : 0,
            "SimLength"        : 0,
        };
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