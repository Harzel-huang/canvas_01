var cav=document.createElement("canvas");
cav.width=510;
cav.height=475;
var ctx=cav.getContext("2d");
document.body.appendChild(cav);

var bgload=false;
var herostatus=false;
var monsterstatus=false;

var backgroundimg=new Image();
backgroundimg.src = "images/background.png";
backgroundimg.onload=function(){
    bgload=true;
}
var heroimg=new Image();
heroimg.src = "images/hero.png";
heroimg.onload=function(){
    herostatus=true;
}
var monsterimg=new Image();
monsterimg.src = "images/monster.png";
monsterimg.onload=function(){
    monsterstatus=true;
}
// 做一个对象，来包裹相对应的坐标
var monster = {};
var monstersCaught = 0;
var hero = {
	speed: 5 // movement in pixels per second
};
// 初始化位置
var reset=function(){
    hero.x=cav.width/2;
    hero.y=cav.height/2;
    monster.x=Math.floor(Math.random()*(477-35+1)+35);
    monster.y=Math.floor(Math.random()*(440-35+1)+35);
}
// 反复渲染
var render = function () {
    if(bgload){
        ctx.drawImage(backgroundimg, 0, 0);   
    }
    if(herostatus){
        ctx.drawImage(heroimg, hero.x, hero.y);
    }
    if(monsterstatus){
        ctx.drawImage(monsterimg,monster.x, monster.y);
    }
    	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
}
// 定义键盘事件上下左右
var keysDown = {};
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);
var update = function () {
    if(hero.x<0||hero.x>510|| hero.y<0||hero.y>475){hero.x=cav.width/2;hero.y=cav.width/2;return}
    if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed ;
	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed ;
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed ;
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed;
	}
    if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}
}
var main = function () {
	update();
	render();
	requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

reset();
main();

