class KeyboardPlugin extends DevicePlugin {
    DEVICE_NAME = 'keyboard';

    bindHandlers(){
        this.onKeyDown = this.keyDown.bind(this);
        this.onKeyUp =  this.keyUp.bind(this);
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
        let code = formatKeyName(this.DEVICE_NAME, e.keyCode);
        this.handleStartEvent(code);
    }

    keyUp(e) {
        let code = formatKeyName(this.DEVICE_NAME, e.keyCode);
        this.handleEndEvent(code);
    }
}