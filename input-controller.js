
// actionsToBind <object> : Объект со списком активностей и, соответствующих им, кодов клавиш клавиатуры.
// 	Пример:
// {
// 	"left": { // название активности
// 		keys: [37,65], // список кодов кнопок соответствующих активности
// enabled: false // отключенная активность
// 	},
// 	"right": {
// 		keys: [39,68]
// 	},
// 	...
// 	}


class InputController {

    target;
    enabled;
    focused;
    ACTION_ACTIVATED;
    ACTION_DEACTIVATED;

    constructor(actionsToBind, target){
        this.bindActions(actionsToBind);
        this.target = target;
    }

    bindActions(actionsToBind){
        
    }

    enableAction(actionName){

    }

    disableAction(actionName){

    }

    attach(target, dontEnable){

    }

    detach(){
        this.target = null;
        this.enabled = false;

    }

    isActionActive(action){
        
    }

    isKeyPressed(keyCode){
        
    }

}