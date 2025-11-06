
class DevicePlugin {
    actions = {};
    DEVICE_NAME;
    constructor(){
        this.bindHandlers();
        this.addListeners();
    }

    bindActions(actionsToBind){
        for (const key of Object.keys(actionsToBind)){
            if (!actionsToBind[key].device[this.DEVICE_NAME]){
                continue;
            }
            this.actions[key] = 
                {
                    key: actionsToBind[key].device[this.DEVICE_NAME],
                };
        }
    }

    unbindActions(){
        this.actions = {};
        this.removeListeners();
    }

    addListeners(){
        
    }

    removeListeners(){
        
    }

    bindHandlers(){
        
    }

    handleStartEvent(code){
        if (!this.actions){
            return;
        }
        for (const key of Object.keys(this.actions)){
            let actCode = this.controller.getActionKeys(key);
            if (actCode.includes(code)) {
                if (!this.controller.pressedKeys.includes(code)){
                    this.controller.pressedKeys.push(code);
                    this.controller.pressedKeys = [...(new Set(this.controller.pressedKeys))];
                }
                if (!this.controller.actions[key].active){
                    this.controller.enableAction(key);
                    return;
                }
            } 
        }
    }

    handleEndEvent(code){
        if (!this.actions){
            return;
        }
        for (const key of Object.keys(this.actions)){
            let actCode = this.controller.getActionKeys(key);
            if (actCode.includes(code)){
                this.controller.pressedKeys = this.controller.pressedKeys.filter((item)=> item !== code);
                let otherKeys = actCode.filter((item) => item !== code);
                for (const other of otherKeys){
                    if (this.controller.isKeyPressed(other)){
                        return;
                    }
                }
                if (this.controller.actions[key].active){
                    this.controller.disableAction(key);
                    return;
                } 
            } 
        }
    }
}