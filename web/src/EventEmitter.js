// simple event emitter class
export class EventEmitter{
    constructor(){
        this._listeners = {};   // 'private' dictionary of {eventType: listenerFunction}
    }

    // triggers all listening functions
    emit(event){
        if(this.willTrigger(event.type)){
            this._listeners[event.type].forEach(listener => listener(event));
        }
    }

    // adds a listener
    on(eventType, listener){
        if(this.willTrigger(eventType)){
            this._listeners[eventType].push(listener);
        }
        else{
            this._listeners[eventType] = [listener];
        }
    }

    // removes a listener
    off(eventType, listener){
        if(this.willTrigger(eventType)){
            let listeners = this._listeners[eventType];

            for(let i = 0; i < listeners.length; i++){
                if(listeners[i] === listener){
                    listeners.splice(i, 1);
                    return true;
                }
            }
        }
        return false;
    }

    // checks if there are any listeners for a given type
    willTrigger(eventType){
        return eventType in this._listeners;
    }
}