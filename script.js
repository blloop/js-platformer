var canvas = document.getElementById("canvas"), 
    ctx = canvas.getContext("2d"), 
    width = 1000, 
    height = 400, 
    platforms = [];

function createPlatforms() {
    platforms.push({
        x: 0, y: height - 15, color: "black",
        width: width, height: 15
    });
    platforms.push({
        x: 150, y: 180, color: "black",
        width: 120, height: 15
    });    
    platforms.push({
        x: 150, y: 320, color: "black",
        width: 120, height: 15
    });
    platforms.push({
        x: 380, y: 250, color: "black",
        width: 120, height: 15
    });  
    platforms.push({
        x: 610, y: 180, color: "black",
        width: 120, height: 15
    });
    platforms.push({
        x: 610, y: 320, color: "black",
        width: 120, height: 15
    });
}
function renderPlatform(input) {
    ctx.fillStyle = platforms[input].color;
    ctx.rect(
        platforms[input].x, 
        platforms[input].y, 
        platforms[input].width, 
        platforms[input].height
    );
}
function renderCanvas() {
    ctx.fillStyle = "#5CD3FF"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


function engine(){   
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath(); 
    renderCanvas();   
    for (var i = 0; i < platforms.length; i++) {
        renderPlatform(i);
    }
    ctx.fill();
    renderPlayer();    
    requestAnimationFrame(engine);
}

canvas.width = width;
canvas.height = height;
createPlatforms();
document.body.addEventListener("keydown", function (input) {
    keys[input.keyCode] = true;
});
document.body.addEventListener("keyup", function (input) {
    keys[input.keyCode] = false;
});
window.addEventListener("load", function () {
    engine();
});