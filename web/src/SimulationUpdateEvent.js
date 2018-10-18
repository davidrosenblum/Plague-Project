// simple event object for simulation updates 
export class SimulationUpdateEvent{
    constructor(type, day=null){
        this._type = type;
        this._day = day;
    }

    get type(){
        return this._type;
    }

    get day(){
        return this._day;
    }
}