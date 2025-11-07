class InputController {
    actions = {};
    pressedKeys = [];
    plugins =[];
    devices = [];
    target = document;
    enabled = true;
    focused = true;
    static ACTION_ACTIVATED = "input-controller:action-activated";
    static ACTION_DEACTIVATED = "input-controller:action-deactivated";

    constructor(actionsToBind, target){
        this.onBlur = this.blurHandle.bind(this);
        this.onFocus = this.focuseHandle.bind(this);
        this.bindActions(actionsToBind);
        this.attach(target);
    }

    /*
    Добавляет в контроллер переданные активности.
    actionsToBind <object> : Объект со списком активностей и, соответствующих им, кодов клавиш 
    клавиатуры.
    */

    bindActions(actionsToBind){
        for (const plugin of this.plugins){
            plugin.bindActions(actionsToBind);
        }
        for (const key of Object.keys(actionsToBind)){
            this.actions[key] = actionsToBind[key];
            this.actions[key].active = false;
        }
    }
    
    addListeners(){
        window.addEventListener('blur', this.onBlur);
        window.addEventListener('focus', this.onFocus);
    }

    removeListeners(){
        window.removeEventListener('blur', this.onBlur);
        window.removeEventListener('focus', this.onFocus);
    }

    addPlugin(plugin){
        this.plugins.push(plugin);
        this.devices.push(plugin.DEVICE_NAME)
        plugin.controller = this;
        plugin.bindActions(actionsToBind);
    }

    removePlugin(plugin){
        this.plugins = this.plugins.filter(p => p !== plugin);
        this.devices = this.devices.filter(d => d !== plugin.DEVICE_NAME);
        plugin.controller = null;
        plugin.unbindActions();
    }

    blurHandle(){
        for (const key of Object.keys(this.actions)){
            this.disableAction(key);
        }
        this.focused = false;
    }

    focuseHandle(){
        this.focused = true;
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

    //ДОБАВИТЬ В ПРОВЕРКУ ФОКУС
    enableAction(actionName){
        if (this.enabled){
            if (!this.actions.hasOwnProperty(actionName)){
                return;
            }
            if (this.actions[actionName].enabled === false){
                return;
            }
            if (!this.actions[actionName].active){
                this.actions[actionName].active = true;
                this.dispatchEvent(actionName, "activate")
            }
        }
    }

    /*
        Деактивирует объявленную активность - выключает генерацию событий для этой активности. 
        После чего при проверке доступности этой активности через isActionActive всегда возвращает 
        false. А также при изменении состояния активности, события не генерируются.
        actionName <string> : название активности
    */
   
    //ДОБАВИТЬ В ПРОВЕРКУ ФОКУС
    disableAction(actionName){
        if (this.enabled){
            if (!this.actions.hasOwnProperty(actionName)){
                return;
            }
            if (this.actions[actionName].enabled === false){
                return;
            }
            if (this.actions[actionName].active){
                this.actions[actionName].active = false;
                this.dispatchEvent(actionName, "deactivate")
            }
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
        console.log("dispatched " + type);
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
        {
            if (this.actions[action].enabled === false){
                return false;
            }
            return this.actions[action].active;
        }
        else 
            return false;
    }

    /*
    Метод для источника ввода клавиатура. Проверяет нажата ли переданная кнопка в контроллере
    keyCode <int> : Код кнопки для проверки
    */

    isKeyPressed(keyCode){
        return this.pressedKeys.includes(keyCode);
    }

    getActionKeys(actionName){
        let keys = [];
        if (!Object.keys(this.actions).includes(actionName)){
            return;
        }
        for (const [device, value] of Object.entries(this.actions[actionName].device)){
            keys.push(...(value.map(v => formatKeyName(device, v))));
        }
        return keys;
    }
}
