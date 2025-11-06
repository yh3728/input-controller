
class GyroscopePlugin{
    DEVICE_NAME = 'gyroscope'

    bindHandlers(){
        this.onTilt = this.tilt.bind(this);
    }

    addListeners(){
        document.addEventListener('deviceorientation ', this.onTilt);
    }

    removeListeners(){
        document.removeEventListener('deviceorientation ', this.onTilt);
    }

    tilt(e) {
        // Код, который даю событию
        let xTilt = e.gamma;
        console.out(xTilt)
        // let code = formatKeyName(this.DEVICE_NAME, e.keyCode);
        // this.handleStartEvent(code);
    }

}