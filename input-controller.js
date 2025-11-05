class InputController {
    actions = {};
    target = document;
    enabled = true;
    focused = true;
    ACTION_ACTIVATED = "input-controller:action-activated";
    ACTION_DEACTIVATED = "input-controller:action-deactivated";

    constructor(actionsToBind, target){
        this.bindActions(actionsToBind);
        this.target = target;
    }

    /*
    Добавляет в контроллер переданные активности.
    actionsToBind <object> : Объект со списком активностей и, соответствующих им, кодов клавиш 
    клавиатуры.
    */

    bindActions(actionsToBind){
        for (const key of Object.keys(actionsToBind)){
            if (!this.actions.hasOwnProperty(key)){
                this.actions[key] = actionsToBind[key];
                if (!this.actions[key].hasOwnProperty("enabled")){
                    this.actions[key].enabled = false;
                }
            }
            else {
                //TODO добавить в keys коды которых тут нет 
            }
        }
    }

    addListeners(){
        for (let action in this.actions){
            
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
        eventName = (type === "activate")? this.ACTION_ACTIVATED : this.ACTION_DEACTIVATED;
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
        this.target = target;
        this.enabled = !dontEnable;
    }

    /*
    Отцепляет контроллер от активного DOM-элемента и деактивирует контроллер.
    */

    detach(){
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
        
    }

}

