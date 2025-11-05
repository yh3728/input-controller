btnsDiv = document.getElementById("input-test");
btns = btnsDiv.querrySelectorAll('*');
canvas = document.getElementById("test-canvas");
ctx = canvas.getContext("2d");
document.addEventListener('input-controller:activate');
document.addEventListener('input-controller:deactivate');


let actionsToBind = [
    {
        "left":
        {
            keys: [37,65]
        },
        "right":
        {
            keys: [39,68]
        }
    }
];

function init(){
    let controller = InputController(actionsToBind, canvas);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    requestAnimationFrame(animate);
}



init();
animate();