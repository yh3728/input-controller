
class GyroscopePlugin extends DevicePlugin{
    DEVICE_NAME = 'gyroscope'


    bindHandlers(){
        this.onTilt = this.tilt.bind(this);
    }

    addListeners(){
        window.addEventListener('deviceorientation', this.onTilt);
    }

    removeListeners(){ 
        window.removeEventListener('deviceorientation ', this.onTilt);
    }

    tilt(e) {
        let betaTilt = e.beta;
        
        if (betaTilt < 90){
            let code = formatKeyName(this.DEVICE_NAME, "bTiltLess90");
            this.handleStartEvent(code);
        }
        else if (betaTilt >=90){
            let code = formatKeyName(this.DEVICE_NAME, "bTiltLess90")
            this.handleEndEvent(code);
        }
    }



}