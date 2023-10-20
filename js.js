

const canvas=document.getElementById('game');
const ctx=canvas.getContext('2d');

class SnakePart{

    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}
let speed =7; 

let tileCount =20 ;
let tileSize = canvas.width /tileCount -2 ;  

let headX = 10 ;
let headY =10 ;

let SnakeParts =[];
let taillength=2;

let AppleX=5;
let AppleY=5; 

let xVelocity =0;
let yVelocity =0;

let Score = 0;

const sound =new Audio("./song/snake.mp3")
// game loop  
function drawGame (){
    changeSnakeposition()
    let result =IsGameOver();
    if(result){
        return
    }
    clearScreen();
    // changeSnakeposition()
    checkApplecollision()
    drawApple()
    drawSnake ();
    drawScore();
    setTimeout(drawGame ,1000/speed)
   
}

function IsGameOver(){

    if(yVelocity ===0 && xVelocity===0){
        return false
    }
let gameOver =false;
if(headX<0){
    gameOver=true
}
if(headX>tileCount){
    gameOver=true
}
if(headY<0){
    gameOver=true
}
if(headY>tileCount){
    gameOver=true
}

for(let i=0 ;i<SnakeParts.length;i++){
    let part =SnakeParts[i]
    if(part.x===headX && part.y ===headY){
        gameOver =true;
        break;
    }
}

if(gameOver){
    ctx.fillStyle="white";
    ctx.font="50px Verdana";
   let gradient= ctx.fillText("Game Over" ,canvas.width/6.5 ,canvas.height/2)

   gradient.addColorStop("0","magenta");
   gradient.addColorStop("0.5","blue");
   gradient.addColorStop("1.0","red");

   ctx.fillStyle=gradient
}
return gameOver
}




drawGame(); 

function drawScore(){
    ctx.fillStyle="white";
    ctx.font="10px verdana"
    ctx.fillText("score" + Score ,canvas.width-50,10)
}


function clearScreen(){
    ctx.fillStyle ='black' ;
    ctx.fillRect(0,0,canvas.width ,canvas.height)
    

}

function drawSnake(){
    ctx.fillStyle ='orange'
    ctx.fillRect(headX * tileCount ,headY * tileCount ,tileSize ,tileSize)  
    ctx.fillStyle='green';

    for(let i=0 ; i<SnakeParts.length;i++){
        let part =SnakeParts[i]
        ctx.fillRect(part.x*tileCount,part.y*tileCount,tileSize,tileSize)
    }
SnakeParts.push(new SnakePart(headX,headY))
while(SnakeParts.length>taillength){
    SnakeParts.shift()
}
ctx.fillStyle ='orange'
    ctx.fillRect(headX * tileCount ,headY * tileCount ,tileSize ,tileSize)  
}

function changeSnakeposition(){
    headX = headX + xVelocity ;
    headY=headY+yVelocity ;
}

function drawApple(){
    ctx.fillStyle='red'
    ctx.fillRect(AppleX*tileCount ,AppleY*tileCount ,tileSize ,tileSize)
}

document.body.addEventListener('keydown', keyDown)
 
function keyDown(event){
//up

if(event.keyCode ==38 ){
 if(yVelocity==1)
 return;
    yVelocity=-1 ;
    xVelocity=0;
    
}
//down
if(event.keyCode == 40 ){
    if(yVelocity==-1)
    return;
    yVelocity=1 ;
    xVelocity=0;
    console.log('zoum')
}
//left
if(event.keyCode == 37 ){
    if(xVelocity==1)
    return;
    yVelocity=0 ;
    xVelocity=-1;
    console.log('zoum')
}
//rigth
if(event.keyCode ==39 ){
    if(xVelocity==- 1)
    return;
    yVelocity=0 ;
    xVelocity=1;
    console.log('zoum')
}
}

function checkApplecollision(){
    
    if(AppleX===headX&& AppleY ===headY){
        AppleX=Math.floor(Math.random()*tileCount);
    AppleY=Math.floor(Math.random()*tileCount)
    taillength++;
    Score++
    sound.play()
    }
}
