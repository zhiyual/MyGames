var ctx,ctx2,canv,left,showSteps;
var black=new Image(),white=new Image(),white_red=new Image();
black.src="img/black.png";
white.src="img/write.png";
white_red.src="img/write_red.png";
var cbg=1;
//AI步骤
var aiStep=[];
//我的步骤
var myStep=[];
for (var i=0;i<112;i++) {
	aiStep[i]=[];
	myStep[i]=[];
	for (var j=0;j<2;j++) {
		aiStep[i][j]=16;
		myStep[i][j]=16;
	}
}
var stepNum=0;//步数
var isblack=true;//是否黑棋
var isOver=false;//是否结束
//棋子数组(黑子1，白子2)
var chessData=[]
for (var i=0;i<15;i++) {
	chessData[i]=[];
	for (var j=0;j<15;j++) {
		chessData[i][j]=0;
	}
}
//赢法数组
var wins=[];
for (var i=0;i<15;i++) {
	wins[i]=[];
	for (var j=0;j<15;j++) {
		wins[i][j]=[];
	}
}
var count=0
for (var i=0;i<15;i++) {
	for (var j=0;j<11;j++) {
		for (var k=0;k<5;k++) {
			wins[i][j+k][count]=true;
		}
		count++;
	}
}
for (var i=0;i<15;i++) {
	for (var j=0;j<11;j++) {
		for (var k=0;k<5;k++) {
			wins[j+k][i][count]=true;
		}
		count++;
	}
}
for (var i=0;i<11;i++) {
	for (var j=0;j<11;j++) {
		for (var k=0;k<5;k++) {
			wins[i+k][j+k][count]=true;
		}
		count++;
	}
}
for (var i=0;i<11;i++) {
	for (var j=14;j>3;j--) {
		for (var k=0;k<5;k++) {
			wins[i+k][j-k][count]=true;
		}
		count++;
	}
}
//赢法统计数组
var myWin=[];
var aiWin=[];
for (var i=0;i<count;i++) {
	myWin[i]=0;
	aiWin[i]=0;
}
window.onload=function () {
	canv=document.getElementById("cans");
	ctx=canv.getContext('2d');
	ctx2=document.getElementById('canline').getContext('2d')
	left=canv.offsetLeft;
	showSteps=document.getElementById("steps")
	showSteps.innerHTML=stepNum;
	drawMap();
	changeBg();
}
//绘制棋盘
function drawMap () {
	for (var i=40;i<610;i+=40) {
		ctx2.beginPath(); 
		ctx2.moveTo(40, i); 
		ctx2.lineTo(600, i); 
		ctx2.closePath(); 
		ctx2.stroke(); 
		ctx2.beginPath(); 
		ctx2.moveTo(i, 40); 
		ctx2.lineTo(i, 600); 
		ctx2.closePath(); 
		ctx2.stroke(); 
	}
}
//落子
function drawChess (a,x,y) {
	if (x>=0&&x<15&&y>=0&&y<15) {
		if (a==1) {
			ctx.drawImage(black,x*40+20,y*40+20);
			chessData[x][y] = 1; 
		} else if (a==2){
			ctx.drawImage(white,x*40+20,y*40+20);
			chessData[x][y] = 2; 
		} else if (a==3) {
			ctx.drawImage(white_red,x*40+20,y*40+20);
			chessData[x][y] = 2; 
		} else if (a==4) {
			ctx.clearRect(x*40+20,y*40+20,40,40);
			chessData[x][y] = 0;
		}
	}
}
//玩家下棋
function play (e){
	var x = parseInt((e.offsetX-20)/40);
	var y = parseInt((e.offsetY-20)/40);
	if (isOver) {
		alert("游戏已结束！");
		window.location.href="index.html";
		return ;
	}
	if (chessData[x][y]!=0) {
		alert("不能在此处落子！");
		return ;
	}
	if (!isblack) {
		return ;
	}
	drawChess(1,x,y);
	myStep[stepNum][0]=x;
	myStep[stepNum][1]=y;
	for (var k=0;k<count;k++) {
		if (wins[x][y][k]) {
			myWin[k]++;
			aiWin[k]--;
			if (myWin[k]==5) {
				alert("你赢了");
				isOver=true;
			}
		}
	}
	if (!isOver) {
		isblack=!isblack;
		AI();
	}
	console.log(stepNum);
}
//电脑AI
function AI () {
	var myScore=[];
	var aiScore=[];
	var max=0,x=0,y=0;
	for (var i=0;i<15;i++) {
		myScore[i]=[];
		aiScore[i]=[];
		for (var j=0;j<15;j++) {
			myScore[i][j]=0;
			aiScore[i][j]=0;
		}
	}
	for (var i=0;i<15;i++) {
		for (var j=0;j<15;j++) {
			if (chessData[i][j]==0) {
				for (var k=0;k<count;k++) {
					if (wins[i][j][k]) {
						switch (myWin[k]){
							case 1:
								myScore[i][j]+=200;
								break;
							case 2:
								myScore[i][j]+=400;
								break;
							case 3:
								myScore[i][j]+=2000;
								break;
							case 4:
								myScore[i][j]+=10000;
								break;
							default:
								break;
						}
						switch (aiWin[k]){
							case 1:
								aiScore[i][j]+=210;
								break;
							case 2:
								aiScore[i][j]+=410;
								break;
							case 3:
								aiScore[i][j]+=2010;
								break;
							case 4:
								aiScore[i][j]+=20000;
								break;
							default:
								break;
						}
					}
				}
				if (myScore[i][j]>max) {
					max=myScore[i][j];
					x=i;
					y=j;
				} else if (myScore[i][j]==max) {
					if (aiScore[i][j]>aiScore[x][y]) {
						x=i;
						y=j;
					}
				}
				if (aiScore[i][j]>max) {
					max=aiScore[i][j];
					x=i;
					y=j;
				} else if (aiScore[i][j]==max) {
					if (myScore[i][j]>myScore[x][y]) {
						x=i;
						y=j;
					}
				}
			}
		}
	}
	drawChess(3,x,y);
	if (stepNum>0) {
		drawChess(4,aiStep[stepNum-1][0],aiStep[stepNum-1][1]);
		drawChess(2,aiStep[stepNum-1][0],aiStep[stepNum-1][1]);
	}
	aiStep[stepNum][0]=x;
	aiStep[stepNum][1]=y;
	stepNum++;
	showSteps.innerHTML=stepNum;
	for (var k=0;k<count;k++) {
		if (wins[x][y][k]) {
			aiWin[k]++;
			myWin[k]--;
			if (aiWin[k]==5) {
				alert("电脑赢了");
				isOver=true;
			}
		}
	}
	if (!isOver) {
		isblack=!isblack;
	}
}
//悔棋
function returnChess () {
	if (isOver) {
		alert("游戏已结束！");
		window.location.href="index.html";
		return ;
	}
	if (stepNum==0) {
		alert("尚未落子！");
		return ;
	}
	stepNum--;
	if (stepNum==0) {
		drawChess(4,myStep[stepNum][0],myStep[stepNum][1]);
		drawChess(4,aiStep[stepNum][0],aiStep[stepNum][1]);
	} else{
		drawChess(4,myStep[stepNum][0],myStep[stepNum][1]);
		drawChess(4,aiStep[stepNum][0],aiStep[stepNum][1]);
		drawChess(4,aiStep[stepNum-1][0],aiStep[stepNum-1][1]);
		drawChess(3,aiStep[stepNum-1][0],aiStep[stepNum-1][1]);
	}
	var x1=myStep[stepNum][0],y1=myStep[stepNum][1];
	var x2=aiStep[stepNum][0],y2=aiStep[stepNum][1];
	for (var k=0;k<count;k++) {
		if (wins[x2][y2][k]) {
			aiWin[k]--;
			myWin[k]++;
		}
		if (wins[x1][y1][k]) {
			aiWin[k]++;
			myWin[k]--;
		}
	}
	showSteps.innerHTML=stepNum;
}
//更改棋盘背景
function changeBg () {
	var bgimg=document.getElementById("cbg")
	switch (cbg){
		case 1:
			cbg++;
			bgimg.src="http://read.pudn.com/downloads128/sourcecode/zip/542813/wuziqi/res/%E4%BA%94%E5%AD%90%E6%A3%8B%E6%A3%8B%E7%9B%98__.jpg"
			break;
		case 2:
			cbg++;
			bgimg.src="http://img.my.csdn.net/uploads/201303/29/1364553741_3407.jpg"
			break;
		case 3:
			cbg++;
			bgimg.src="http://static.oschina.net/uploads/code/201602/07112515_OOgj.jpg"
			break;
		case 4:
			cbg++;
			bgimg.src="http://pic.shejiben.com/caizhi/day_130122/20130122_d46dfb46cd63f5d221b36yEOBw4k2QT6.jpg"
			break;
		default:
			cbg=1;
			bgimg.src="http://imgsrc.baidu.com/forum/w%3D580/sign=bc374eef64380cd7e61ea2e59145ad14/ce1b9d16fdfaaf51ff9730e08d5494eef01f7a7c.jpg"
			break;
	}
}
