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
    ctx.fillStyle = "#5d6d7e";
    ctx.rect(
        platforms[input].x, 
        platforms[input].y, 
        platforms[input].width, 
        platforms[input].height
    );
}
function renderPlayer() {
    ctx.fillStyle = "black";
    ctx.fillRect(
        player.x, 
        player.y, 
        player.width, 
        player.height
    );
    ctx.fillStyle = " #abebc6 ";
    ctx.fillRect(
        player.x + 2, 
        player.y + 2, 
        player.width - 4, 
        player.height - 4
    );
}
function renderCanvas() {
    ctx.fillStyle = "#60d6ff"; 
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
        if (collide == "down") {
            player.ground = true;
            player.jump = false;
        } else if (collide == "up") {
            player.yVel = 0;
        } else if (collide == "side") {
            player.xVel = 0;
            player.jump = false;
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
function collision(object) {
    var minX = (player.width / 2) + (object.width / 2),
        minY = (player.height / 2) + (object.height / 2),
        spaceX = player.x + (player.width / 2) - 
            object.x - (object.width / 2), 
        spaceY = player.y + (player.height / 2) - 
            object.y - (object.height / 2);
    if (Math.abs(spaceX) < minX && Math.abs(spaceY) < minY) {
        if (minX - Math.abs(spaceX) > minY - Math.abs(spaceY)) {
            if (spaceY > 0) {
                player.y += (minY - Math.abs(spaceY));
                return "up";
            } else {
                player.y -= (minY - Math.abs(spaceY));
                return "down";
            }
        } else {
            if (spaceX > 0) {
                player.x += (minX - Math.abs(spaceX));
            } else {
                player.x -= (minX - Math.abs(spaceX));
            }
            return "side";
        }
    } else {
        return null;
    }
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