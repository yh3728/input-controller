class InputController {
    actions = {};
    pressedKeys = [];
    target = document;
    enabled = true;
    focused = true;
    static ACTION_ACTIVATED = "input-controller:action-activated";
    static ACTION_DEACTIVATED = "input-controller:action-deactivated";

    constructor(actionsToBind, target){
        this.bindActions(actionsToBind);
        this.attach(target);
        //сохраняю обработчики
        this.onKeyDown = (e) => this.keyDown(e);  
        this.onKeyUp = (e) =>this.keyUp(e);
    }

    /*
    Добавляет в контроллер переданные активности.
    actionsToBind <object> : Объект со списком активностей и, соответствующих им, кодов клавиш 
    клавиатуры.
    */

    bindActions(actionsToBind){
        for (const key of Object.keys(actionsToBind)){
            //если второй раз биндим одно действие (по ключу то есть), то оно просто перезапишется
            this.actions[key] = actionsToBind[key];
            if (!this.actions[key].hasOwnProperty("enabled")){
                this.actions[key].enabled = false;
            }
        }
    }


    addListeners(){
        document.addEventListener('keydown', this.onKeyDown)
        document.addEventListener('keyup', this.onKeyUp)
    }

    removeListeners(){
        document.removeEventListener('keydown', this.onKeyDown)
        document.removeEventListener('keyup', this.onKeyUp)
    }

    keyDown(e) {
        console.log("key down");
        let code = e.keyCode;
        for (const [key, value] of Object.entries(this.actions)){
            let actCode = value.keys;
            if (actCode.includes(code)){
                this.enableAction(key);
                this.pressedKeys.push(code);
                return;
            } 
        }
    }

    keyUp(e) {
        console.log("key up");
        let code = e.keyCode;
        for (const [key, value] of Object.entries(this.actions)){
            let actCode = value.keys;
            if (actCode.includes(code)){
                this.disableAction(key)
                this.pressedKeys = this.pressedKeys.filter((item)=> item !== code);
                return;
            } 
        }
    }

    /*
    Включает объявленную активность - включает генерацию событий для этой активности при изменении 
    её статуса. Если включено:
    при проверке активности через isActionActive 
    возвращает актуальное состояние активности (напр. для клавиатуры нажата кнопка или нет), 
    иначе всегда возвращает false
    может генерировать событие при изменении состояния действия, иначе событие не генерируется
    actionName <string> : название активности
    */

    enableAction(actionName){
        if (this.enabled && this.focused){
            if (!this.actions.hasOwnProperty(actionName)){
                return;
            }
            if (!this.actions[actionName].enabled)
                this.actions[actionName].enabled = true;

                this.dispatchEvent(actionName, "activate")
        }
    }

    /*
        Деактивирует объявленную активность - выключает генерацию событий для этой активности. 
        После чего при проверке доступности этой активности через isActionActive всегда возвращает 
        false. А также при изменении состояния активности, события не генерируются.
        actionName <string> : название активности
    */

    disableAction(actionName){
        if (this.enabled && this.focused){
            if (!this.actions.hasOwnProperty(actionName)){
                return;
            }
            if (this.actions[actionName].enabled)
                this.actions[actionName].enabled = false;
                this.dispatchEvent(actionName, "deactivate")
        }
    }

    
    /*
    диспатчит событие нужного типа
    */
    dispatchEvent(action, type) {
        let eventName;
        if (type === "activate"){
            eventName = InputController.ACTION_ACTIVATED;
        } 
        else if (type === "deactivate"){
            eventName= InputController.ACTION_DEACTIVATED;
        } else {
            return;
        }
        const event = new CustomEvent(
            eventName,
            {
                detail: {
                    action: action,
                }
            }
        );
        this.target.dispatchEvent(event);
    }

    /*
    Нацеливает контроллер на переданный DOM-элемент (вешает слушатели).
    target <element> :  DOM-элемент на котором слушает события клавиатуры и диспачит свои события
    dontEnable <bool> (опционально): Если передано true - не активирует контроллер.
    */

    attach(target, dontEnable){
        this.addListeners();
        this.target = target;
        this.enabled = !dontEnable;
    }

    /*
    Отцепляет контроллер от активного DOM-элемента и деактивирует контроллер.
    */

    detach(){
        this.removeListeners();
        this.target = null;
        this.enabled = false;
    }

    /*
    Проверяет активирована ли переданная активность в контроллере 
    ( напр. для клавиатуры: зажата ли одна из соответствующих этой активности кнопок)
    */

    isActionActive(action){
        if (this.actions.hasOwnProperty(action))
            return this.actions[action].enabled;
        else 
            return false;
    }

    /*
    Метод для источника ввода клавиатура. Проверяет нажата ли переданная кнопка в контроллере
    keyCode <int> : Код кнопки для проверки
    */

    isKeyPressed(keyCode){
        return keyCode in this.pressedKeys;
    }

}

