let attachBtn = document.getElementById("attach");
let detachBtn = document.getElementById("detach");
let activateBtn = document.getElementById("activate-controller");
let deactivateBtn = document.getElementById("deactivate-controller");
let bindJumpBtn = document.getElementById("bind-jump");

canvas = document.getElementById("test-canvas");
ctx = canvas.getContext("2d");
let x = 100;
let y = 100;
const WIDTH = 60;
const HEIGHT = 60;
const SPEED = 15;

let controller;

let actionsToBind = 
    {
        "left":
        {
            keys: [37,65],
        },
        "right":
        {
            keys: [39,68],
        }
    }
;

let actions = ["left", "right"];

// space, W and arrow up
let jumpBind = {
    "jump":{
        keys: [32, 38, 87]
    }
}

function moveLeft() {
    x -= SPEED;
}

function moveRight(){
    x += SPEED;
}

function init(){
    controller = new InputController(actionsToBind, canvas);
    
}

// вешаем слушатели и обработчики 

attachBtn.addEventListener('click', (e) => {
    if (controller !== undefined){
        controller.attach(canvas);
    }
})

detachBtn.addEventListener('click', (e) => {
    if (controller !== undefined){
        controller.detach();
    }
})

activateBtn.addEventListener('click', (e) => {
    controller.enabled = true;
})

deactivateBtn.addEventListener('click', (e) => {
    if (controller !== undefined){
        controller.enabled = false;
    }
})

bindJumpBtn.addEventListener('click', (e) => {
    if (controller !== undefined){
        controller.bindActions(jumpBind);
    }
})


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    if (controller.isActionActive("left"))
        moveLeft();
    if (controller.isActionActive("right"))
        moveRight();
    if (controller.isActionActive("jump")){
        ctx.fillStyle = "blue";
    }
    ctx.fillRect(x, y, WIDTH, HEIGHT)
    requestAnimationFrame(animate);
}

init();
animate();