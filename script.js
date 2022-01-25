(function () {
    var requestAnimationFrame = 
    window.requestAnimationFrame || 
    window.mozRequestAnimationFrame || 
    window.webkitRequestAnimationFrame || 
    window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

const refresh = document.querySelector('.refresh');
const refreshPage = () => {
  location.reload();
}
refresh.addEventListener('click', refreshPage);

var canvas = document.getElementById("canvas"), 
    ctx = canvas.getContext("2d"), 
    width = 800, 
    height = 500, 
    player = {
        x: 150, 
        y: height - 100, 
        width: 24, 
        height: 36, 
        speed: 6, 
        xVel: 0, 
        yVel: 0, 
        jump: false, 
        ground: false,
        face: 'right',
    }, 
    gravity = 0.5, 
    friction = 0.7, 
    collide = false;
    keys = [], 
    platforms = [];
    breakable = ['key'];

function pushPlat1() {
    platforms.length = 0;
    platforms.push({
        x: 0, y: height - 15, color: "black",
        width: width, height: 15, id: "floor"
    });
    platforms.push({
        x: 0, y: 0, color: "black",
        width: 15, height: height, id: "left-wall" 
    });
    platforms.push({
        x: width - 15, y: 300, color: "black",
        width: 15, height: 200, id: "right-half-wall" 
    });
    platforms.push({
        x: 480, y: 420, color: "black",
        width: 100, height: 15, id: "none" 
    });
    platforms.push({
        x: 300, y: 360, color: "black",
        width: 100, height: 15, id: "none" 
    });
    platforms.push({
        x: 120, y: 300, color: "black",
        width: 100, height: 15, id: "none" 
    });
    platforms.push({
        x: 300, y: 240, color: "black",
        width: 240, height: 15, id: "none" 
    });
    platforms.push({
        x: 700, y: 300, color: "black",
        width: 100, height: 15, id: "none" 
    });
}
function renderPlatform(input) {
    ctx.fillStyle = " #abb2b9 ";
    ctx.rect(
        platforms[input].x, 
        platforms[input].y, 
        platforms[input].width, 
        platforms[input].height
    );
}
// player shadow: #bfc9ca 
function renderPlayer() {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.fillStyle = "#f7f9f9";
    ctx.fillRect(player.x + 2, player.y, 20, 16);
    ctx.fillRect(player.x, player.y + 16, 24, 20);
    ctx.fillStyle = "#737373";
    ctx.strokeRect(player.x + 2, player.y, 20, 16);
    ctx.strokeRect(player.x, player.y + 16, 24, 20); 
    ctx.fillStyle = "#cc0000";
    ctx.fillRect(player.x + 2, player.y + 16, 20, 4);
    ctx.fillStyle = "black";
    ctx.fillRect(player.x + 10, player.y + 6, 4, 4);
    ctx.fillRect(player.x - 3, player.y - 2, 30, 3);
    ctx.fillRect(player.x + 3, player.y - 6, 18, 4)
    if (player.face == 'right') {
        ctx.fillRect(player.x + 18, player.y + 24, 3, 3);
        ctx.fillRect(player.x + 18, player.y + 30, 3, 3);
    } else {
        ctx.fillRect(player.x + 3, player.y + 24, 3, 3);
        ctx.fillRect(player.x + 3, player.y + 30, 3, 3);
    }

    ctx.lineWidth = 3;
    ctx.strokeStyle = "#cc0000";
    ctx.beginPath();
    if (player.face == 'right') {
        ctx.moveTo(player.x + 2, player.y + 16);
        ctx.lineTo(player.x - 8, player.y + 25);
    } else {
        ctx.moveTo(player.x + 22, player.y + 16);
        ctx.lineTo(player.x + 32, player.y + 25);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.strokeStyle = "#ff9933";
    ctx.beginPath();
    if (player.face == 'right') {
        ctx.moveTo(player.x + 20, player.y + 7);
        ctx.lineTo(player.x + 30, player.y + 8);
        ctx.lineTo(player.x + 20, player.y + 11);
    } else {
        ctx.moveTo(player.x + 4, player.y + 7);
        ctx.lineTo(player.x - 6, player.y + 8);
        ctx.lineTo(player.x + 4, player.y + 11);
    }
    ctx.closePath();
    ctx.stroke();
}
function renderCanvas() {
    ctx.fillStyle = "#d6eaf8"; 
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
        player.face = 'right';
    }
    if (keys[37] || keys[65]) {
        if (player.xVel > -player.speed) {
            player.xVel = -player.speed;
        }
        player.face = 'left';
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
        var collide = collision(platforms[i]);
        if (collide && breakable.includes(platforms[i].id)) {
            if (platforms[i].id == 'key1') {

            }
            platforms.splice(i, 1);
        } else {
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
pushPlat1();
document.body.addEventListener("keydown", function (input) {
    keys[input.keyCode] = true;
});
document.body.addEventListener("keyup", function (input) {
    keys[input.keyCode] = false;
});
window.addEventListener("load", function () {
    engine();
});