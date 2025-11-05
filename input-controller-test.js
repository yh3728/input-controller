
// btnsDiv = document.getElementById("input-test");
// btns = btnsDiv.querrySelectorAll('*');

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

canvas.addEventListener(
    controller.ACTION_ACTIVATED,
    (e) => {
        console.log("activate" + e.detail.action)
    }
)

canvas.addEventListener(
    controller.ACTION_DEACTIVATED,
    (e) => {
        console.log("deactivate" + e.detail.action)
    }
)

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    controller.focused = (document.activeElement === canvas)
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, WIDTH, HEIGHT)
    requestAnimationFrame(animate);
}

init();
animate();