class MousePlugin extends devicePlugin{
    actions = {};
    DEVICE_NAME = 'mouse';

    bindHandlers(){
        this.onMouseDown = this.mouseDown.bind(this);
        this.onMouseUp =  this.mouseUp.bind(this);
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
        let code = formatKeyName(this.DEVICE_NAME, e.which);
        this.handleStartEvent(code);
    }

    mouseUp(e){
        let code = formatKeyName(this.DEVICE_NAME, e.which);
        this.handleEndEvent(code);
    }

}