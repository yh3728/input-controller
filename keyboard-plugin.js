class KeyboardPlugin{
    actions = {};
    static DEVICE_NAME = 'keyboard';
    constructor(controller){
        this.controller = controller;
        this.onKeyDown = this.keyDown.bind(this);
        this.onKeyUp =  this.keyUp.bind(this);
        this.addListeners();
    }

    bindActions(actionsToBind){
        for (const key of Object.keys(actionsToBind)){
            this.actions[key] = 
                {
                    key: actionsToBind[key].device[KeyboardPlugin.DEVICE_NAME],
                };
        }
    }

    unbindActions(){
        this.actions = {};
        this.removeListeners();
    }

    addListeners(){
        document.addEventListener('keydown', this.onKeyDown);
        document.addEventListener('keyup', this.onKeyUp);
    }

    removeListeners(){
        document.removeEventListener('keydown', this.onKeyDown);
        document.removeEventListener('keyup', this.onKeyUp);
    }

    keyDown(e) {
        if (!this.actions){
            return;
        }
        let code = formatKeyName(KeyboardPlugin.DEVICE_NAME, e.keyCode);
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

    keyUp(e) {
        let code = formatKeyName(KeyboardPlugin.DEVICE_NAME, e.keyCode);
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