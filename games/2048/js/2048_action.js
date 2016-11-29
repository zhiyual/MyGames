var arr1=[],arr2=[],arr3=[],empty=[];
var boxs;
var isOver=false,isMove=false;
window.onload=function () {
	boxs=document.getElementById("box").getElementsByTagName('div');
	for (var i=0;i<4;i++) {
		arr1[i]=[];
		arr2[i]=[];
		arr3[i]=[];
		for (var j=0;j<4;j++) {
			arr1[i][j]=boxs[4*j+i];
			arr2[i][j]=0;
			arr3[i][j]=0;
		}
	}
	addNum();
	addNum();
}
function addNum () {
	getEmptys();
	var a=Math.floor(Math.random()*empty.length);
	var x=empty[a].x,y=empty[a].y;
	arr2[x][y]= getNewNum ();
	drawNum();
	checkOver();
	updates();
}
function getNewNum () {
	var x;
	if (Math.floor(Math.random()*10)<5) {
		x=2;
	} else{
		x=4;
	}
	return x;
}
function getEmptys () {
	empty=[];
	for (var i=0;i<4;i++) {
		for (var j=0;j<4;j++) {
			if (arr2[i][j]==0) {
				empty.push({x:i,y:j});
			}
		}
	}
}
function drawNum () {
	var max=0;
	for (var i=0;i<4;i++) {
		for (var j=0;j<4;j++) {
			if (max<arr2[i][j]) {
				max=arr2[i][j];
			}
			if (arr2[i][j]!=0) {
				arr1[i][j].innerHTML=arr2[i][j];
				changeClass(arr1[i][j],arr2[i][j]);
			} else {
				arr1[i][j].innerHTML="";
				arr1[i][j].className="";
			}
		}
	}
	showMax(max);
}
function changeClass (obj,x) {
	if (x<=4) {
		obj.className="n1";
	} else if (x>4&&x<=8){
		obj.className="n2";
	} else if (x>8&&x<=16){
		obj.className="n3";
	} else if (x>16&&x<=32){
		obj.className="n4";
	} else if (x>32&&x<=64){
		obj.className="n5";
	} else{
		obj.className="n6";
	}
}
document.onkeyup=function (eve) {
	var e=eve||window.event;
	if (isOver) {
		alert("游戏已结束！");
		window.location.href="index.html";
	}
	switch (e.keyCode){
		case 37:
			moveLeft();
			if (checkMove()) {
				addNum();
			}			
			break;
		case 38:
			moveTop();
			if (checkMove()) {
				addNum();
			}
			break;
		case 39:
			moveRight();
			if (checkMove()) {
				addNum();
			}
			break;
		case 40:
			moveBottom();
			if (checkMove()) {
				addNum();
			}
			break;
		default:
			break;
	}
}
function moveLeft () {
	for (var i=0;i<4;i++) {
		var a=[];
		var isadd=false;
		for (var j=0;j<4;j++) {
			if (arr2[j][i]!=0) {
				var x=arr2[j][i];
				var z=a.length;
				if (isadd||z==0||x!=a[z-1]) {
					a.push(x);
					isadd=false;
				} else{
					a[z-1]=2*x;
					isadd=true;
				}
			}
		}
		for (var k=0;k<4;k++) {
			if (k<a.length) {
				arr2[k][i]=a[k]
			} else{
				arr2[k][i]=0;
			}
		}
	}
}
function moveTop () {
	for (var i=0;i<4;i++) {
		var a=[];
		var isadd=false;
		for (var j=0;j<4;j++) {
			if (arr2[i][j]!=0) {
				var x=arr2[i][j];
				var z=a.length;
				if (isadd||z==0||x!=a[z-1]) {
					a.push(x);
					isadd=false;
				} else{
					a[z-1]=2*x;
					isadd=true;
				}
			}
		}
		for (var k=0;k<4;k++) {
			if (k<a.length) {
				arr2[i][k]=a[k]
			} else{
				arr2[i][k]=0;
			}
		}
	}
}
function moveRight () {
	for (var i=0;i<4;i++) {
		var a=[];
		var isadd=false;
		for (var j=3;j>=0;j--) {
			if (arr2[j][i]!=0) {
				var x=arr2[j][i];
				var z=a.length;
				if (isadd||z==0||x!=a[z-1]) {
					a.push(x);
					isadd=false;
				} else{
					a[z-1]=2*x;
					isadd=true;
				}
			}
		}
		for (var k=0;k<4;k++) {
			if (k<a.length) {
				arr2[3-k][i]=a[k]
			} else{
				arr2[3-k][i]=0;
			}
		}
	}
}
function moveBottom () {
	for (var i=0;i<4;i++) {
		var a=[];
		var isadd=false;
		for (var j=3;j>=0;j--) {
			if (arr2[i][j]!=0) {
				var x=arr2[i][j];
				var z=a.length;
				if (isadd||z==0||x!=a[z-1]) {
					a.push(x);
					isadd=false;
				} else{
					a[z-1]=2*x;
					isadd=true;
				}
			}
		}
		for (var k=0;k<4;k++) {
			if (k<a.length) {
				arr2[i][3-k]=a[k]
			} else{
				arr2[i][3-k]=0;
			}
		}
	}
}
function checkOver () {
	for (var i=0;i<4;i++) {
		for (var j=0;j<4;j++) {
			if (arr2[i][j]==0) {
				return ;
			}
		}
	}
	for (var i=0;i<3;i++) {
		for (var j=0;j<4;j++) {
			if (arr2[i][j]==arr2[i+1][j]) {
				return ;
			}
		}
	}
	for (var i=0;i<4;i++) {
		for (var j=0;j<3;j++) {
			if (arr2[i][j]==arr2[i][j+1]) {
				return ;
			}
		}
	}
	isOver=true;
	alert("游戏结束！")
}
function checkMove () {
	var count=0;
	for (var i=0;i<4;i++) {
		for (var j=0;j<4;j++) {
			if (arr2[i][j]!=arr3[i][j]) {
				count++;
			}
		}
	}
	if (count==0) {
		return false;
	} else{
		return true;
	}
}
function updates () {
	for (var i=0;i<4;i++) {
		for (var j=0;j<4;j++) {
			arr3[i][j]=arr2[i][j];
		}
	}
}
function showMax (max) {
	if (max<128) {
		return ;
	}
	var address=[];
	for (var i=0;i<4;i++) {
		for (var j=0;j<4;j++) {
			if (max==arr2[i][j]) {
				address.push({x:i,y:j});
			}
		}
	}
	for (var i=0;i<address.length;i++) {
		arr1[address[i].x][address[i].y].className="max";
	}
}