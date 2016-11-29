var can1,can2,ctx1,ctx2;
var c_wid=3,c_hig=3;
var c_left,c_top;
var squ=[];
var isWins=false;


window.onload=function () {
	can1=document.getElementById("canvas1");
	can2=document.getElementById("canvas2");
	ctx1=can1.getContext('2d');
	ctx2=can2.getContext('2d');
	drawMap();
	drawSqu();
	can2.onmousedown=function (eve) {
		if (isWins) {
			alert('游戏已结束！')
			reLoad(c_wid+1);
		}
		var e=eve||window.event;
		if (e.button==0||window.event.button==1) {
			var x=Math.floor(e.offsetX/100);
			var y=Math.floor(e.offsetY/100);
			changeColor(x,y);
			drawSqu();
			isWin();
		}
	}
}
function drawMap () {
	can1.width=c_wid*100;
	can1.height=c_hig*100;
	can2.width=c_wid*100;
	can2.height=c_hig*100;
	can1.style.marginLeft=-(c_wid*50)+'px';
	can2.style.marginLeft=-(c_wid*50)+'px';
	var spans=document.getElementById("ctrl").getElementsByTagName("span")[0];
	spans.innerHTML='当前关卡：&nbsp;<var>'+c_wid+'</var>'
	c_left=can1.offsetLeft;
	c_top=can1.offsetTop;
	ctx2.fillStyle="black"
	for (var i=0;i<=c_wid;i++) {
		ctx2.beginPath(); 
		ctx2.moveTo(0, i*100); 
		ctx2.lineTo(c_wid*100, i*100); 
		ctx2.closePath(); 
		ctx2.stroke(); 
		ctx2.beginPath(); 
		ctx2.moveTo(i*100, 0); 
		ctx2.lineTo(i*100, c_wid*100); 
		ctx2.closePath(); 
		ctx2.stroke(); 
	}
	for (var i=0;i<c_wid;i++) {
		squ[i]=[];
		for (var j=0;j<c_hig;j++) {
			squ[i][j]=false;
		}
	}
}

function changeColor (x,y) {
	squ[x][y]=!squ[x][y];
	if (x-1>=0) {
		squ[x-1][y]=!squ[x-1][y];
	}
	if (x+1<c_wid) {
		squ[x+1][y]=!squ[x+1][y];
	}
	if (y-1>=0) {
		squ[x][y-1]=!squ[x][y-1];
	}
	if (y+1<c_hig) {
		squ[x][y+1]=!squ[x][y+1];
	}
}
function drawSqu () {
	ctx1.clearRect(0,0,c_wid*100,c_hig*100);
	for (var i=0;i<c_wid;i++) {
		for (var j=0;j<c_hig;j++) {
			if (squ[i][j]) {
				ctx1.fillStyle="#a7d8dd";
				ctx1.fillRect(i*100,j*100,100,100);
			} else{
				ctx1.fillStyle="#eaebe6";
				ctx1.fillRect(i*100,j*100,100,100);
			}
		}
	}
}
function isWin () {
	for (var i=0;i<c_wid;i++) {
		for (var j=0;j<c_hig;j++) {
			if (!squ[i][j]) {
				return ;
			}
		}
	}
	isWins=true;
	alert("Victory!")
	reLoad(c_wid+1);
}
function reLoad (x) {
	c_wid=x;
	c_hig=x;
	isWins=false;
	drawMap();
	drawSqu();
}
function lastG () {
	if (c_wid>3) {
		reLoad(c_wid-1);
	} else{
		alert('已经是最低关卡！');
	}
}
function nextG () {
	if (c_wid<8) {
		reLoad(c_wid+1);
	} else{
		alert('已经是最高关卡！');
	}
}
function changeG () {
	var x=window.prompt("请输入关卡数(3~8)");
	if (x>=3&&x<=8) {
		reLoad(x);
	} else{
		alert('输入无效！');
	}
}