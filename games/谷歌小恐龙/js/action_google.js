var run_L=true,isJump=false,isAddObs=0,isGameover=false,isBegin=false;
var can1,can2,can3,ctx1,ctx2,ctx3;
var t1,t2,t3;
var speed=15,distance=6;
var addObsCount=0;
var dots_G,dots_Ob;
var scores=0,scs;
var pox1,pox2;
window.onload=function(){
	scs=document.getElementById("score");
	can1=document.getElementById("canvas1");
	can2=document.getElementById("canvas2");
	can3=document.getElementById("canvas3");
	ctx1=can1.getContext('2d');
	ctx2=can2.getContext('2d');
	ctx3=can3.getContext('2d');
	for (var i=0;i<10;i++) {
		drawIMG(ctx3,img_04,i*100,20);
	}
	dots_G=getDots(can3,0,0,can3.width,can3.height);
	addObstacles();
	drawIMG(ctx1,img_03,5,100);
}
function runs () {
	if (run_L) {
		ctx1.clearRect(0,0,can1.width,can1.height);
		drawIMG(ctx1,img_01,5,100);
	} else{
		ctx1.clearRect(0,0,can1.width,can1.height);
		drawIMG(ctx1,img_02,5,100);
	}
	run_L=!run_L;
}
document.onkeypress=function (event) {
	if (event.keyCode==32) {
		if (!isBegin) {
			isBegin=true;
			clearInterval(t1);
			clearInterval(t2);
			t1=setInterval(runs,100);
			t3=setInterval(function () {
				run_ground();
				run_Obs();
				checkIsOver();
				updateSc();
			},speed);
			return ;
		}
		if (isJump) {
			return ;
		}
		isJump=true;
		clearInterval(t1);
		var h=100,v=-24,g=3;
		t2=setInterval(function () {
			if (v>24) {
				clearInterval(t2);
				isJump=false;
				t1=setInterval(runs,100);
			} else{
				h+=v;
				v+=g;
				ctx1.clearRect(0,0,can1.width,can1.height);
				drawIMG(ctx1,img_03,5,h);
			}
		},40);
	}
}
function run_ground () {
	if (isGameover) {
		clearInterval(t1);
    	clearInterval(t2);
    	clearInterval(t3);
    	alert("over")
    	window.location.href="index.html"
    	return ;
	}
	ctx3.clearRect(0,0,can3.width,can3.height);
	ctx3.fillStyle='#3c3c3c'
	for (var i=0;i<dots_G.length;i++) {
		if (dots_G[i].x-distance<0) {
			dots_G[i].x=dots_G[i].x-distance+can3.width;
		} else{
			dots_G[i].x-=distance;
		}
	}
	for (var i=0;i<dots_G.length;i++) {
		ctx3.fillRect(dots_G[i].x,dots_G[i].y,1,1)
	}
}
function getDots (can,a,b,w,h) {
	var ctx=can.getContext('2d');
	var pox=ctx.getImageData(a,b,w,h).data;
	var dots=[];
	for(var x=0;x<w;x++){
        for(var y=0;y<h;y++){
            var i = (y*w + x)*4;
            if(pox[i+3] > 0){
                var dot = {
                	x:x,
                	y:y
                }
                dots.push(dot);
            }
        }
	}
	return dots;
}
function addObstacles () {
	var xx=1100+Math.floor(Math.random()*50);
	drawIMG(ctx2,img_05,xx,131)
	if (Math.random()<=0.3) {
		drawIMG(ctx2,img_05,xx+30,131)
	}
	if (Math.random()<=0.05) {
		drawIMG(ctx2,img_05,xx-30,131)
	} 
	dots_Ob=getDots(can2,0,0,can2.width,can2.height);
}
function run_Obs () {
	addObsCount++;
	if (addObsCount>=80) {
		addObsCount=0;
		if (Math.random()>0.5||isAddObs==3) {
			addObstacles();
			isAddObs=0;
		} else {
			isAddObs++;
		}
	}
	ctx2.clearRect(0,0,can2.width,can2.height);
	ctx2.fillStyle='#000000'
	for (var i=0;i<dots_Ob.length;i++) {
		dots_Ob[i].x-=distance;
	}
	for (var i=0;i<dots_Ob.length;i++) {
		ctx2.fillRect(dots_Ob[i].x,dots_Ob[i].y,1,1)
	}
}
function checkIsOver () {
	pox1=ctx1.getImageData(5,0,can1.width-5,can1.height);
	pox2=ctx2.getImageData(5,0,can1.width-5,can1.height);
	for(var x=0;x<(can1.width-5);x++){
        for(var y=0;y<(can1.height);y++){
            var i = (y*(can1.width-5) + x)*4;
            if(pox1.data[i+3] > 150&&pox2.data[i+3] > 150){
            	isGameover=true;
            	return 0;
            }
        }
	}
}
function updateSc () {
	scores+=distance;
	scs.innerHTML="得分："+Math.floor(scores/100);
}
function drawIMG (ctx,img,x,y) {
	ctx.fillStyle="#3c3c3c"
	for (var i=0;i<img.length;i++) {
		for (var j=0;j<img[i].length;j++) {
			if (img[i][j]==1) {
				ctx.fillRect(i+x,j+y,1,1);
			}
		}
	}
}
