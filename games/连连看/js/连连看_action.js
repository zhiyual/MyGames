var can1=document.getElementById("canvas");
var ctx1=can1.getContext('2d');
var squSize=60;//方块大小
var cols=10,rows=10;//行列数
can1.width=cols*squSize;
can1.height=rows*squSize;
var isCheck=false;checks=[];//需要检查的方块
var imgbox=document.getElementById("box");
var boximgs=imgbox.getElementsByTagName("img");
var maps=[];
for (var i=0;i<cols;i++) {
	maps[i]=[];
	for (var j=0;j<rows;j++) {
		maps[i][j]=0;
	}
}
function loadImg () {
	var arr=[];
	for (var i=1;i<cols-1;i++) {
		for (var j=1;j<rows-1;j++) {
			arr.push({x:i,y:j});
		}
	}
	for (var j=arr.length,i=0;i<j/2;i++) {
		var a=Math.floor(Math.random()*arr.length);
		var ax=arr[a].x,ay=arr[a].y;
		arr.splice(a,1);
		var b=Math.floor(Math.random()*arr.length);
		var bx=arr[b].x,by=arr[b].y;
		arr.splice(b,1);
		var n=Math.floor(Math.random()*12)+1;
		maps[ax][ay]=n;
		maps[bx][by]=n;
	}
	drawImgs();
}
function drawImgs () {
	ctx1.clearRect(0,0,can1.width,can1.height);
	for (var i=1;i<cols-1;i++) {
		for (var j=1;j<rows-1;j++) {
			var k=maps[i][j];
			if (k>0) {
				var ddimg=boximgs[k-1];
				ctx1.drawImage(ddimg,i*squSize,j*squSize,squSize,squSize);
			}
		}
	}
}
can1.onclick=function (eve) {
	var e=eve||window.event;
	var ex=Math.floor(e.offsetX/squSize);
	var ey=Math.floor(e.offsetY/squSize);
	if (isCheck) {
		if (maps[ex][ey]==0) {
			return false;
		}
		if (maps[ex][ey]!=maps[checks[0]][checks[1]]) {
			alert("请选择相同图案!");
			return false;
		}
		if (ex!=checks[0]||ey!=checks[1]) {
			checkSqu(ex,ey);
		} else{
			alert("不能选择同一个方块！");
			return false;
		}
	} else{
		if (maps[ex][ey]==0) {
			return false;
		} else{
			checks=[ex,ey];
			drawImgs();
			select(ex,ey);
		}
	}
	isCheck=!isCheck;
}
function select (x,y) {
	ctx1.lineWidth=4;
	ctx1.strokeStyle="red";
	ctx1.strokeRect(x*squSize,y*squSize,squSize,squSize);
}
function checkSqu (x,y) {
	var x1=checks[0],y1=checks[1];
//	if (maps[x][y]!=maps[x1][y1] || maps[x][y]==0 || maps[x1][y1]==0) {
//		return false;
//	}
	if (checkX(x,y,x1,y1) || checkY(x,y,x1,y1)) {
		clearSqu(x,y);
		clearSqu(x1,y1);
	} else {
		alert("can't!");
	}
	drawImgs();
	isWin();
}
function checkX (x1,y1,x2,y2) {
	if (y1==y2) {
		return false;
	}
	if (y1>y2) {
		var xct=x1,yct=y1;
		x1=x2;
		y1=y2;
		x2=xct;
		y2=yct;
	}
	var chk1=[{x:x1,y:y1}],chk2=[{x:x2,y:y2}];
	for (var i=x1+1;i<cols;i++) {
		if (maps[i][y1]==0) {
			chk1.push({x:i,y:y1});
		} else{
			break;
		}
	}
	for (var i=x2+1;i<cols;i++) {
		if (maps[i][y2]==0) {
			chk2.push({x:i,y:y2});
		} else{
			break;
		}
	}
	for (var i=x1-1;i>0;i--) {
		if (maps[i][y1]==0) {
			chk1.unshift({x:i,y:y1});
		} else{
			break;
		}
	}
	for (var i=x2-1;i>0;i--) {
		if (maps[i][y2]==0) {
			chk2.unshift({x:i,y:y2});
		} else{
			break;
		}
	}
	for (var i=0;i<chk1.length;i++) {
		for (var j=0;j<chk2.length;j++) {
			if (chk1[i].x==chk2[j].x) {
				if (y1+1==y2) {
					return true;
				} else{
					var xxx=chk1[i].x;
					var counts=y2-y1-1;
					for (var k=y1+1;k<y2;k++) {
						if (maps[xxx][k]==0) {
							counts--;
						}
					}
					if (counts==0) {
						return true;
					}
				}
			}
		}
	}
	return false;
}
function checkY (x1,y1,x2,y2) {
	if (x1==x2) {
		return false;
	}
	if (x1>x2) {
		var xct=x1,yct=y1;
		x1=x2;
		y1=y2;
		x2=xct;
		y2=yct;
	}
	var chk1=[{x:x1,y:y1}],chk2=[{x:x2,y:y2}];
	for (var i=y1+1;i<cols;i++) {
		if (maps[x1][i]==0) {
			chk1.push({x:x1,y:i});
		} else{
			break;
		}
	}
	for (var i=y2+1;i<cols;i++) {
		if (maps[x2][i]==0) {
			chk2.push({x:x2,y:i});
		} else{
			break;
		}
	}
	for (var i=y1-1;i>0;i--) {
		if (maps[x1][i]==0) {
			chk1.unshift({x:x1,y:i});
		} else{
			break;
		}
	}
	for (var i=y2-1;i>0;i--) {
		if (maps[x2][i]==0) {
			chk2.unshift({x:x2,y:i});
		} else{
			break;
		}
	}
	for (var i=0;i<chk1.length;i++) {
		for (var j=0;j<chk2.length;j++) {
			if (chk1[i].y==chk2[j].y) {
				if (x1+1==x2) {
					return true;
				} else{
					var yyy=chk1[i].y;
					var counts=x2-x1-1;
					for (var k=x1+1;k<x2;k++) {
						if (maps[k][yyy]==0) {
							counts--;
						}
					}
					if (counts==0) {
						return true;
					}
				}
			}
		}
	}
	return false;
}
function isWin () {
	for (var i=0;i<cols;i++) {
		for (var j=0;j<rows;j++) {
			if (maps[i][j]!=0) {
				return false;
			}
		}
	}
	alert("You Win!");
	window.location.reload();
}
function clearSqu (x,y) {
	ctx1.clearRect(x*squSize,y*squSize,squSize,squSize);
	maps[x][y]=0;
}
window.onload=function () {
	loadImg();
}
