var canv
var ctx,ctx2
var t
var turnto=1
var isdown=false
var kindSqu
var nextSqu=Math.floor((Math.random())*7)
var changeNum=1
var clear_count=0
var speed=400
var isQuick=false
var isStopGame=false
var squ=new Array(10)
for (var i=0;i<10;i++) {
	squ[i]=new Array(30)
	for (var j=0;j<30;j++) {
		squ[i][j]=0
	}
}
var res_squ=new Array(10)
for (var i=0;i<10;i++) {
	res_squ[i]=new Array(30)
	for (var j=0;j<30;j++) {
		res_squ[i][j]=0
	}
}
function drawMap () {
	canv=document.getElementById("canvas")
	ctx=canv.getContext("2d")
	ctx2=document.getElementById("canvas2").getContext("2d")
	for (var i=0;i<=200;i+=20) {
		ctx.beginPath()
		ctx.moveTo(i,0)
		ctx.lineTo(i,600)
		ctx.stroke()
		ctx.closePath()
	}
	for (var i=0;i<=600;i+=20) {
		ctx.beginPath()
		ctx.moveTo(0,i)
		ctx.lineTo(200,i)
		ctx.stroke()
		ctx.closePath()
	}
	getScore(clear_count)
}
function drawSqu (x,y) {
	ctx2.fillStyle="#32CD32"
	ctx2.fillRect(x*20,y*20,20,20)
}
function clearSqu (x,y) {
	ctx2.clearRect(x*20,y*20,20,20)
}
function isDown () {
	for (var j=29;j>=0;j--) {
		for (var i=0;i<10;i++) {
			if (squ[i][j]==1) {
				if (j==29||res_squ[i][j+1]==1) {
					return false;
					break;
				}
			}
		}
	}
	return true;
}
function down () {
	if (isDown()) {
		for (var i=0;i<10;i++) {
			for (var j=29;j>=0;j--) {
				if (squ[i][j]==1) {
					squ[i][j]=0
					squ[i][j+1]=1		
				}
			}
		}
	} else{
		stop_down()
	}
}
function stop_down () {
	isdown=false
	for (var i=0;i<10;i++) {
		for (var j=0;j<30;j++) {
			if (squ[i][j]==1) {
				res_squ[i][j]=1
				squ[i][j]=0
			}
		}
	}
	isQuick=false
	clearInterval(t);
	t=setInterval(refresh,speed);
}
function drawSqu_black () {
	for (var i=0;i<10;i++) {
		for (var j=0;j<30;j++) {
			if (squ[i][j]==0&&res_squ[i][j]==0) {
				clearSqu(i,j)
			} else{
				drawSqu(i,j)
			}
		}
	}
}
document.onkeydown=function (event){
	switch (event.keyCode){
		case 38:
			changeSqu();
			drawSqu_black();
			break;
		case 37:
			turn_l();
			drawSqu_black();
			break;
		case 39:
			turn_r();
			drawSqu_black();
			break;
		case 40:
			Quick_Down();
			break;
		case 32:
			stopGame();
			break;
		default:
			break;
	}
}
function stopGame () {
	if (isStopGame) {
		isQuick=false
		isStopGame=false
		t=setInterval(refresh,speed)
	} else{
		isStopGame=true
		clearInterval(t)
	}
}
function Quick_Down () {
	if (isQuick) {
		isQuick=false
		clearInterval(t);
		t=setInterval(refresh,speed);
	} else{
		isQuick=true
		clearInterval(t);
		t=setInterval(refresh,40);
	}
}

function turn_l () {
	var isL=true
	for (var i=0;i<10;i++) {
		for (var j=0;j<30;j++) {
			if (squ[0][j]==1) {
				isL=false
				break
			}
			if (squ[i][j]==1) {
				if (res_squ[i-1][j]==1) {
					isL=false
					break
				}
			}
		}
	}
	if (isL) {
		for (var i=0;i<10;i++) {
			for (var j=0;j<30;j++) {
				if (squ[i][j]==1) {				
					squ[i][j]=0
					squ[i-1][j]=1
				}
			}
		}
	}
}
function turn_r () {
	var isR=true
	for (var i=0;i<10;i++) {
		for (var j=0;j<30;j++) {
			if (squ[9][j]==1) {
				isR=false
				break
			}
			if (squ[i][j]==1) {
				if (res_squ[i+1][j]==1) {
					isR=false
					break
				}
			}
		}
	}
	if (isR){
		for (var i=9;i>=0;i--) {
			for (var j=0;j<30;j++) {
				if (squ[i][j]==1) {					
					squ[i][j]=0
					squ[i+1][j]=1					
				}
			}
		}
	}
}
function isOver () {
	for (var i=0;i<10;i++) {
		if (res_squ[i][0]==1) {
			alert("Game Over!")
			window.location.href="index.html"
		}
	}
}
function clear_row () {
	for (var j=29;j>=0;j--) {
		var isFR=isFullRow(j)
		if (isFR) {
			clearing(j)
			clear_count++
			getScore(clear_count)
			j++
		}
	}
}
function clearing (y) {
	for (var i=0;i<10;i++) {
		res_squ[i][y]=0
	}
	for (var j=y-1;j>=0;j--) {
		for (var i=0;i<10;i++) {
			if (res_squ[i][j]==1) {
				res_squ[i][j]=0
				res_squ[i][j+1]=1
			}
		}
	}
}
function isFullRow (j) {
	var count=0
	for (var i=0;i<10;i++) {
		if (res_squ[i][j]==1) {
			count++
		}
	}
	if (count==10) {
		return true;
	} else{
		return false;
	}
}
window.onload=function () {
	drawMap()
	t=setInterval(refresh,speed)
}
function refresh () {
	isOver()
	if (isdown) {
		down()
	} else{
		clear_row()
		add_squ()
	}
	drawSqu_black()
}
function add_squ () {
	isdown=true
	changeNum=1
	kindSqu=nextSqu
	nextSqu=Math.floor((Math.random())*7)
	document.getElementById('nextimg').src="img/"+nextSqu+".png"
	switch (kindSqu){
		case 0:
			squ[4][0]=1
			squ[5][0]=1
			squ[4][1]=1
			squ[5][1]=1
			break;
		case 1:
			squ[3][1]=1
			squ[6][1]=1
			squ[4][1]=1
			squ[5][1]=1
			break;
		case 2:
			squ[4][0]=1
			squ[5][2]=1
			squ[4][1]=1
			squ[5][1]=1
			break;
		case 3:
			squ[4][2]=1
			squ[5][0]=1
			squ[4][1]=1
			squ[5][1]=1
			break;
		case 4:
			squ[4][0]=1
			squ[3][1]=1
			squ[4][1]=1
			squ[5][1]=1
			break;
		case 5:
			squ[4][0]=1
			squ[6][1]=1
			squ[4][1]=1
			squ[5][1]=1
			break;
		case 6:
			squ[3][1]=1
			squ[5][0]=1
			squ[4][1]=1
			squ[5][1]=1
			break;
		default:
			break;
	}
}
function changeSqu () {
	switch (kindSqu){
		case 0:
			break;
		case 1:
			change1()
			break;
		case 2:
			change2()
			break;
		case 3:
			change3()
			break;
		case 4:
			change4()
			break;
		case 5:
			change5()
			break;
		case 6:
			change6()
			break;
		default:
			break;
	}
}
function getXY () {
	for (var i=0;i<10;i++) {
		for (var j=0;j<30;j++){
			if (squ[i][j]==1) {
				var arr=[i,j];
				return arr;
				break;
			}
		}
	}
}
function clearAll () {
	for (var i=0;i<10;i++) {
		for (var j=0;j<30;j++){
			squ[i][j]=0
		}
	}
}
function change1 () {
	var arr=getXY();
	var x=arr[0];
	var y=arr[1];
	clearAll()
	if (changeNum==1) {
		changeNum=2
		squ[x+1][y-1]=1
		squ[x+1][y]=1
		squ[x+1][y+1]=1
		squ[x+1][y+2]=1
	} else{
		changeNum=1
		squ[x-1][y+1]=1
		squ[x][y+1]=1
		squ[x+1][y+1]=1
		squ[x+2][y+1]=1
	}
}
function change2 () {
	var arr=getXY();
	var x=arr[0];
	var y=arr[1];
	clearAll()
	if (changeNum==1) {
		changeNum=2
		squ[x][y+1]=1
		squ[x+1][y]=1
		squ[x+1][y+1]=1
		squ[x+2][y]=1
	} else{
		changeNum=1
		squ[x][y-1]=1
		squ[x][y]=1
		squ[x+1][y]=1
		squ[x+1][y+1]=1
	}
}
function change3 () {
	var arr=getXY();
	var x=arr[0];
	var y=arr[1];
	clearAll()
	if (changeNum==1) {
		changeNum=2
		squ[x][y]=1
		squ[x+1][y]=1
		squ[x][y-1]=1
		squ[x-1][y-1]=1
	} else{
		changeNum=1
		squ[x+1][y+1]=1
		squ[x+2][y+1]=1
		squ[x+1][y+2]=1
		squ[x+2][y]=1
	}
}
function change4 () {
	var arr=getXY();
	var x=arr[0];
	var y=arr[1];
	clearAll()
	switch (changeNum){
		case 1:
			changeNum=2;
			squ[x+1][y]=1
			squ[x+2][y]=1
			squ[x+1][y+1]=1
			squ[x+1][y-1]=1
			break;
		case 2:
			changeNum=3;
			squ[x][y+1]=1
			squ[x][y+2]=1
			squ[x-1][y+1]=1
			squ[x+1][y+1]=1
			break;
		case 3:
			changeNum=4;
			squ[x][y]=1
			squ[x+1][y]=1
			squ[x+1][y-1]=1
			squ[x+1][y+1]=1
			break;
		case 4:
			changeNum=1;
			squ[x][y]=1
			squ[x+1][y]=1
			squ[x+2][y]=1
			squ[x+1][y-1]=1
			break;
		default:
			break;
	}
}
function change5 () {
	var arr=getXY();
	var x=arr[0];
	var y=arr[1];
	clearAll()
	switch (changeNum){
		case 1:
			changeNum=2;
			squ[x+1][y]=1
			squ[x+1][y+2]=1
			squ[x+1][y+1]=1
			squ[x+2][y]=1
			break;
		case 2:
			changeNum=3;
			squ[x][y+1]=1
			squ[x-1][y+1]=1
			squ[x+1][y+1]=1
			squ[x+1][y+2]=1
			break;
		case 3:
			changeNum=4;
			squ[x+1][y]=1
			squ[x+1][y-1]=1
			squ[x+1][y+1]=1
			squ[x][y+1]=1
			break;
		case 4:
			changeNum=1;
			squ[x+1][y-1]=1
			squ[x+2][y-1]=1
			squ[x][y-1]=1
			squ[x][y-2]=1
			break;
		default:
			break;
	}
}
function change6 () {
	var arr=getXY();
	var x=arr[0];
	var y=arr[1];
	clearAll()
	switch (changeNum){
		case 1:
			changeNum=2;
			squ[x+1][y]=1
			squ[x+1][y-1]=1
			squ[x+1][y+1]=1
			squ[x+2][y+1]=1
			break;
		case 2:
			changeNum=3;
			squ[x][y+1]=1
			squ[x+1][y+1]=1
			squ[x-1][y+1]=1
			squ[x-1][y+2]=1
			break;
		case 3:
			changeNum=4;
			squ[x+1][y]=1
			squ[x+1][y+1]=1
			squ[x+1][y-1]=1
			squ[x][y-1]=1
			break;
		case 4:
			changeNum=1;
			squ[x+1][y+1]=1
			squ[x+2][y]=1
			squ[x+2][y+1]=1
			squ[x][y+1]=1
			break;
		default:
			break;
	}
}
function getScore (x) {
	document.getElementById('score').innerHTML='<var>得分：</var>'+x
	if (x>0&&x%10==0) {
		if (speed>300) {
			speed-=50
		} else if (speed>200&&speed<=300){
			speed-=20
		} else if (speed>100&&speed<=100){
			speed-=10
		}
		clearInterval(t)
		t=setInterval(refresh,speed)
	}
	document.getElementById('speed').innerHTML='<var>速度：</var>'+speed
}

