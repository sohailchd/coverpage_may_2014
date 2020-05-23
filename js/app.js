
/*
   Bouncing Ball animation
*/

var maxBall = 200;

var game =  { 
	               ballList:[] ,
	               fireBallList:[]
            };


var KEY = {
               I : 73,
               G : 71,
               B : 66
          };

var DONE = {
              I : 0,
              G : 0,
              B : 0
           };

function ball(x,y,r,dx,dy,color,blur) 
{
    this.x = x;
    this.y = y;
    this.r = r;
    this.dirX = dx;
    this.dirY = dy;
    this.color = color;
    this.blur = blur;
}
var speed = 3;
ball.prototype.bounce = function(){
	
	
	//left
	if (this.x-this.r <10) {
		//this.dirY *= -1;
		this.dirX *= -1;
	}
    
    //right
    if(this.x+this.r>w){
        this.dirX *= -1;
        //this.dirY *= -1;
    }
    //top
    if (this.y > 10) {
		this.dirY *= -1;
		//this.dirX *=  1;
	}
	//bottom
    if(this.y < h){
        //this.dirX *= 1;
        this.dirY *= -1;
    }
    this.x += (speed*(2/this.r))*this.dirX;
    this.y += (speed*(2/this.r))*this.dirY;



}

console.log(game.ball);

var canvas = document.getElementById("canvas");
var ctx    = canvas.getContext("2d");
canvas.width = document.body.clientWidth - 50;
canvas.height = document.body.clientHeight - 50;
var w      = canvas.width;
var h      = canvas.height;
var redirectVal = 0;
var audio = document.getElementById("my-audio");

function resize()
{
	w = canvas.width;
	h = canvas.height;
    console.log(w);

}



function targetBall(x,y,r,c){
      this.x = x;
      this.y = y;
      this.r = r;
      this.c = c;
    
}

function fireBall(x,y,r,c){
      this.x = x;
      this.y = y;
      this.r = r;
      this.c = c;
}

     // fireballs
   var fb =  new fireBall((w-w/6*5),h-h/2,50,"#ffffff");
	 var fb2 = new fireBall(fb.x,fb.y,20,"#326498");
	 var fb3 = new fireBall((w-w/6*3),h-h/2,50,"#ffffff");
	 var fb4 = new fireBall(fb3.x,fb3.y,20,"#dd4030");
	 var fb5 = new fireBall((w-w/6*1),h-h/2,50,"#ffffff");
	 var fb6 = new fireBall(fb5.x,fb5.y,20,"#20ffaa");
	
function gameInit(){

    for(var i=0;i<maxBall/3;++i){
         game.ballList.push(new ball(w-(w/6*1),Math.random()*h,Math.random()*5,1,1,getColor(),0));
    }
    for(var i=0;i<maxBall/3;++i){
         game.ballList.push(new ball(w-(w/6*3),Math.random()*h,Math.random()*5,1,1,getColor(),0));
    }
    for(var i=0;i<maxBall/3;++i){
         game.ballList.push(new ball(w-(w/6*5),Math.random()*h,Math.random()*5,1,1,getColor(),0));
    }


}


function drawrect(){
	var ap = Math.random()*10;
	ctx.fillStyle = "rgba(00,00,00,0.2)";
	ctx.shadowColor = getColor();
	ctx.shadowBlur = ap;
	ctx.fillRect(30,h-50,320,30);
}


var wb_var = 0;
var sp_x = 0;
function update(){
	 ctx.clearRect(0,0,w,h);
	 resize();
	      
     game.fireBallList.push(fb);
     game.fireBallList.push(fb2);
     game.fireBallList.push(fb3);
     game.fireBallList.push(fb4);
     game.fireBallList.push(fb5);
     game.fireBallList.push(fb6);
     
     wb_var += 0.1 ;

	 var tb = new fireBall(w-(w/6*2)+Math.sin(wb_var)*50+Math.cos(wb_var)*50,h/2,Math.random()*30,getColor());
	 var tb2 = new fireBall(w-(w/6*4)-Math.sin(wb_var)*50-Math.cos(wb_var)*50,h/2,Math.random()*30,getColor());
     for(var i=0;i<maxBall;++i)
     { 
            game.ballList[i].bounce();
            drawBall(ctx,game.ballList[i].x,game.ballList[i].y,game.ballList[i].r,game.ballList[i].color,0);
            //console.log(getColor());
     }
    
     game.fireBallList[0].r += Math.sin(wb_var)*1;
     game.fireBallList[1].r -= Math.sin(wb_var)*1;
     
     game.fireBallList[2].r += Math.sin(wb_var)*1;
     game.fireBallList[3].r += Math.sin(wb_var)*1;
     
     game.fireBallList[4].r += Math.sin(wb_var)*1;
     game.fireBallList[5].r -= Math.sin(wb_var)*1;
     

     fb.blogRedirect("#ffffff");
     fb2.blogRedirect("#326498");
     fb3.blogRedirect("#ffffff");
     fb4.blogRedirect("#dd4030");
     fb5.blogRedirect("#ffffff");
     fb6.blogRedirect("#aaaa00");
     
     tb.blogRedirect(getColor());
     tb2.blogRedirect(getColor());
     //keyLogger();  
     handleKey(); 
     drawrect();
     drawFinalText();
     //drawLines(ctx,game.fireBallList[1].x,game.fireBallList[1].y,game.fireBallList[3].x,game.fireBallList[3].y,10);
    
    
}


function drawLines(ctx,x1,y1,x2,y2,tk){
	  var ap = Math.random()*10;
	  ctx.beginPath();
      ctx.strokeStyle = "#000000";
      ctx.shadowColor = "#aaee00";
      ctx.shadowBlur = 10;
      ctx.moveTo(x1,y1);
      ctx.lineTo(x2,y2);
      ctx.lineWidth = tk;
      ctx.stroke();
}


function drawFinalText()
{
	 if(DONE.I){
          drawtext(game.fireBallList[1].x-30,game.fireBallList[1].y,"#ffffff","Indie","30px Courier New");
     }  else {drawtext(game.fireBallList[1].x-50,game.fireBallList[1].y,"#000000","Press I","30px Courier New");}
     if(DONE.G){
          drawtext(game.fireBallList[3].x-30,game.fireBallList[3].y,"#fffffff","Games","30px Courier New");
     }  else {drawtext(game.fireBallList[3].x-50,game.fireBallList[3].y,"#000000","Press G","30px Courier New");}
     if(DONE.B){
          drawtext(game.fireBallList[5].x-30,game.fireBallList[5].y,"#fffffff","Blog","30px Courier New");
     }   else {drawtext(game.fireBallList[5].x-50,game.fireBallList[5].y,"#000000","Press B","30px Courier New");}

    drawtext(50,h-30,"#eeaa00","INSTANT CRUSH :by &ohail","20px Courier New");

}


function handleKey(){
	$(document).keydown(function(e){
          switch(e.which){
             case KEY.I:
             {
             	if(game.fireBallList[1].r<50){game.fireBallList[1].r += 0.01;}else{DONE.I = 1;}
             	break;
             }    
             case KEY.G:
             {
             	if(game.fireBallList[3].r<50){game.fireBallList[3].r += 0.01;}else{DONE.G = 1}
             	break;
             }
             case KEY.B:
             {
             	if(game.fireBallList[5].r<50){game.fireBallList[5].r += 0.01;}else{DONE.B=1}
             	break;
             }
             
          }
	});
}


function drawBall(ctx , x , y , r , c,b){
     ctx.fillStyle = c;
     ctx.beginPath();
     ctx.shadowColor = c;
     ctx.shadowBlur = b;
     ctx.arc(x,y,r,0,Math.PI*2,true);
     ctx.closePath();
     ctx.fill();
}



function getColor()
{
	var c ;
    var r = Math.floor(Math.random()*250);
    var g = Math.floor(Math.random()*250);
    var b = Math.floor(Math.random()*250);
    var chex = r.toString(16)+g.toString(16)+b.toString(16);
    c = "#"+chex;
	return c;
}

function redirect()
{
	if(DONE.I && DONE.G && DONE.B){
	   window.location.assign("https://sohailchd.github.io");
    }
}

function mainLoop(){
      gameInit();
      
      setInterval(update,1000/40);
      //window.requestAnimationFrame(update);
      //console.log(game.fireBallList.length);
      setInterval(redirect,1000);
}


fireBall.prototype.blogRedirect = function(c)
{
	var rx = Math.random()*10 || 1;
	var ry = Math.random()*5 || 2;
	setInterval(drawBall(ctx,this.x+rx*0.2,this.y+ry*0.1,this.r,c,100),2000);
}


function keyLogger(){
	$(document).keydown(function(e){
		console.log(e.which)
	});

	
}


function drawtext(x,y,c,txt,sz){
	ctx.fillStyle = c;
	ctx.font = sz;
	ctx.fillText(txt,x,y);
}


$( function() {
    
});

$(function main(){
	     mainLoop();          
         console.log(audio.duration);
         $( "#slider" ).slider();
});