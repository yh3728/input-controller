class MousePlugin{
    actions = {}
    static DEVICE_NAME = 'mouse';
    constructor(controller){
        this.controller = controller;
        this.onMouseDown = this.mouseDown.bind(this);
        this.onMouseUp =  this.mouseUp.bind(this);
        this.addListeners();
    }

    bindActions(actionsToBind){
        for (const key of Object.keys(actionsToBind)){
            if (!actionsToBind[key].device['mouse']){
                continue;
            }
            this.actions[key] = 
                {
                    key: actionsToBind[key].device[MousePlugin.DEVICE_NAME],
                };
        }
        
    }

    unbindActions(){
        this.actions = {};
        this.removeListeners();
    }

    addListeners(){
        document.addEventListener('mousedown', this.onMouseDown);
        document.addEventListener('mouseup', this.onMouseUp);
    }

    removeListeners(){
        document.removeEventListener('mousedown', this.onMouseDown);
        document.removeEventListener('mouseup', this.onMouseUp);
    }

    mouseDown(e){
        if (!this.actions){
            return;
        }
        let code = formatKeyName(MousePlugin.DEVICE_NAME, e.which);
        for (const key of Object.keys(this.actions)){
            let actCode = this.controller.getActionKeys(key);
            if (actCode.includes(code)) {
                if (!this.controller.pressedKeys.includes(code)){
                    this.controller.pressedKeys.push(code);
                    this.controller.pressedKeys = [...(new Set(this.controller.pressedKeys))];
                    console.log(this.controller.pressedKeys)
                }
                if (!this.controller.actions[key].active){
                    this.controller.enableAction(key);
                    return;
                }
            } 
        }
    }

    mouseUp(e){
        let code = formatKeyName(MousePlugin.DEVICE_NAME, e.which);
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