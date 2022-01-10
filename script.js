(function () {
    var requestAnimationFrame = 
    window.requestAnimationFrame || 
    window.mozRequestAnimationFrame || 
    window.webkitRequestAnimationFrame || 
    window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementById("canvas"), 
    ctx = canvas.getContext("2d"), 
    width = 1000, 
    height = 500, 
    player = {
        x: 150, 
        y: height / 2, 
        width: 20, 
        height: 20, 
        speed: 6, 
        xVel: 0, 
        yVel: 0, 
        jump: false, 
        ground: false,
    }, 
    gravity = 0.5, 
    friction = 0.7, 
    collide = false;
    keys = [], 
    platforms = [];

function createPlatforms() {
    platforms.push({
        x: 0, y: 0, color: "black",
        width: 15, height: height, 
    });
    platforms.push({
        x: 0, y: height - 15, color: "black",
        width: width, height: 15
    });
    platforms.push({
        x: 150, y: 140, color: "black",
        width: 120, height: 15
    });
    platforms.push({
        x: 150, y: 280, color: "black",
        width: 120, height: 15
    });    
    platforms.push({
        x: 150, y: 420, color: "black",
        width: 120, height: 15
    });
    platforms.push({
        x: 380, y: 210, color: "black",
        width: 120, height: 15
    });
    platforms.push({
        x: 380, y: 350, color: "black",
        width: 120, height: 15
    });    
    platforms.push({
        x: 610, y: 140, color: "black",
        width: 120, height: 15
    });
    platforms.push({
        x: 610, y: 280, color: "black",
        width: 120, height: 15
    });
    platforms.push({
        x: 610, y: 420, color: "black",
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
function renderPlayer() {
    ctx.fillStyle = "#d40000";
    ctx.fillRect(
        player.x, 
        player.y, 
        player.width, 
        player.height);
}
function renderCanvas() {
    ctx.fillStyle = "#5CD3FF"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function keyCheck() {
    if (keys[38] || keys[87]) {
        if (!player.jump && player.ground) {
            player.jump = true;
            player.ground = false;
            player.yVel = player.speed * -1.5;
        }
    }
    if (keys[39] || keys[68]) {
        if (player.xVel < player.speed) {
            player.xVel = player.speed;
        }
    }
    if (keys[37] || keys[65]) {
        if (player.xVel > -player.speed) {
            player.xVel = -player.speed;
        }
    }
}


function engine(){    
    keyCheck();    
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath(); 
    renderCanvas();   
    player.xVel *= friction;
    player.yVel += gravity;
    player.ground = false;
    for (var i = 0; i < platforms.length; i++) {
        renderPlatform(i);
        collide = collision(platforms[i]);
        if (collide) {
            player.ground = true;
            player.jump = false;
            player.y = platforms[i].y - player.height;
        }
    }   
    if (player.ground) {
        player.yVel = 0;
    }    
    player.x += player.xVel;
    player.y += player.yVel;
    ctx.fill();
    renderPlayer();    
    requestAnimationFrame(engine);
}
function collision(input) {
    if (player.x + player.width > input.width &&
        input.x + input.width > player.x && 
        player.y + player.height > input.y) {
        return true;
    } else return false;
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