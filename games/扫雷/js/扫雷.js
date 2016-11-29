var canvas
var context
var sec=0
var t
var isstart=0
var isover=false
var minenum=Math.floor(Math.random()*5+5)
var img_mine=new Image()
img_mine.src="img/boo.png"
var img_sign=new Image()
img_sign.src="img/yes.png"
var img_0=new Image()
img_0.src="img/bg.png"
var img_1=new Image()
img_1.src="img/1.png"
var img_2=new Image()
img_2.src="img/2.png"
var img_3=new Image()
img_3.src="img/3.png"
var img_4=new Image()
img_4.src="img/4.png"
var img_5=new Image()
img_5.src="img/5.png"
var img_6=new Image()
img_6.src="img/6.png"
var img_7=new Image()
img_7.src="img/7.png"
var img_8=new Image()
img_8.src="img/8.png"
var celldata=new Array(10)
for (var x=0;x<10;x++) {
	celldata[x]=new Array(10)
	for (var y=0;y<10;y++) {
		celldata[x][y]=0
	}
}
var minedata=new Array(10)
for (var x=0;x<10;x++) {
	minedata[x]=new Array(10)
	for (var y=0;y<10;y++) {
		minedata[x][y]=0
	}
}
function drawMap () {
	canvas=document.getElementById("canvas")
	context=canvas.getContext("2d")
	for (var i=0;i<=400;i+=40) {
		context.beginPath()
		context.moveTo(0,i)
		context.lineTo(400,i)
		context.closePath()
		context.stroke()
		context.beginPath()
		context.moveTo(i,0)
		context.lineTo(i,400)
		context.closePath()
		context.stroke()
	}
	inMine(minenum)
	tt()
	document.getElementById('nums').value=minenum
	clearTimeout(t)
}
function play (e) {
	if (isover) {
		alert("游戏已结束！")
		window.location.href="index.html"
	}
	if (isstart==0) {
		startit()
	}
	var x=parseInt(((e.clientX)-480)/40)
	var y=parseInt(((e.clientY)-100)/40)
	if (e.button==2) {
		isMine(x,y)
	} else if (e.button==0){
		if (celldata[x][y]==1) {
		    alert("此处已清扫！")
		    return;
	    }
	    checkMine(x,y)
	    if (isover) {
	    	clearTimeout(t)
	    	alert("Game Over!")
	    } else{
	    	checkNum(x,y)
	    }
	}
	isWin()
}
function checkNum (x,y) {
	var count=0
	if (x==0) {
		if (y==0) {
			if (minedata[x+1][y]==1) {
		        count++
	        }
			if (minedata[x][y+1]==1) {
		        count++
	        }
			if (minedata[x+1][y+1]==1) {
		        count++
	        }
		} else if (y==9){
			if (minedata[x+1][y]==1) {
		        count++
	        }
			if (minedata[x][y-1]==1) {
		        count++
	        }
			if (minedata[x+1][y-1]==1) {
		        count++
	        }
		} else{
			if (minedata[x+1][y]==1) {
		        count++
	        }
			if (minedata[x+1][y+1]==1) {
		        count++
	        }
			if (minedata[x+1][y-1]==1) {
		        count++
	        }
			if (minedata[x][y+1]==1) {
		        count++
	        }
			if (minedata[x][y-1]==1) {
		        count++
	       }
		}
	} else if (x==9){
		if (y==0) {
			if (minedata[x-1][y]==1) {
		        count++
	        }
			if (minedata[x][y+1]==1) {
		        count++
	        }
			if (minedata[x-1][y+1]==1) {
		        count++
	        }
		} else if (y==9){
			if (minedata[x-1][y]==1) {
		        count++
	        }
			if (minedata[x][y-1]==1) {
		        count++
	        }
			if (minedata[x-1][y-1]==1) {
		        count++
	        }
		} else{
			if (minedata[x-1][y]==1) {
		        count++
	        }
			if (minedata[x-1][y+1]==1) {
		        count++
	        }
			if (minedata[x-1][y-1]==1) {
		        count++
	        }
			if (minedata[x][y+1]==1) {
		        count++
	        }
			if (minedata[x][y-1]==1) {
		        count++
	       }
		}
	} else{
		if (y==0) {
			if (minedata[x][y+1]==1) {
		        count++
	        }
			if (minedata[x+1][y+1]==1) {
		        count++
	        }
			if (minedata[x-1][y+1]==1) {
		        count++
	        }
			if (minedata[x+1][y]==1) {
		        count++
	        }
			if (minedata[x-1][y]==1) {
		        count++
	       }
		} else if (y==9){
			if (minedata[x+1][y]==1) {
		        count++
	        }
			if (minedata[x-1][y]==1) {
		        count++
	        }
			if (minedata[x-1][y-1]==1) {
		        count++
	        }
			if (minedata[x+1][y-1]==1) {
		        count++
	        }
			if (minedata[x][y-1]==1) {
		        count++
	       }
		} else{
			if (minedata[x+1][y]==1) {
		        count++
	        }
	        if (minedata[x-1][y]==1) {
		        count++
	        }
	        if (minedata[x][y+1]==1) {
	        	count++
        	}
        	if (minedata[x][y-1]==1) {
        		count++
	        }
        	if (minedata[x+1][y+1]==1) {
        		count++
        	}
        	if (minedata[x+1][y-1]==1) {
        		count++
        	}
	        if (minedata[x-1][y+1]==1) {
	        	count++
	        }
        	if (minedata[x-1][y-1]==1) {
        		count++
        	}
		}
	}
	switch (count){
		case 0: context.drawImage(img_0,x*40,y*40);
		    break;
		case 1: context.drawImage(img_1,x*40,y*40);
		    break;
		case 2: context.drawImage(img_2,x*40,y*40);
		    break;
		case 3: context.drawImage(img_3,x*40,y*40);
		    break;
		case 4: context.drawImage(img_4,x*40,y*40);
		    break;
		case 5: context.drawImage(img_5,x*40,y*40);
		    break;
		case 6: context.drawImage(img_6,x*40,y*40);
		    break;
		case 7: context.drawImage(img_7,x*40,y*40);
		    break;
		case 8: context.drawImage(img_8,x*40,y*40);
		    break;
		default:
			break;
	}
	celldata[x][y]=1
}
function checkMine (x,y) {
	if (minedata[x][y]==1) {
		context.drawImage(img_mine,x*40,y*40)
		isover=true
	}
}
function inMine (n) {
	for (i=0;i<n;i++) {
		var x=Math.floor(Math.random()*10)
		var y=Math.floor(Math.random()*10)
		if (minedata[x][y]==0) {
			minedata[x][y]=1
		} else{
			n++
		}
	}
}
function tt () {
	var st=0
	for (var i=0;i<10;i++) {
		for (var j=0;j<10;j++) {
			if (minedata[i][j]==1) {
				st++
			}
		}
	}
	alert(st+"  颗地雷！")
}
function isMine (x,y) {
	if (celldata[x][y]==0) {
		context.drawImage(img_sign,x*40,y*40)
		if (minedata[x][y]==1) {
			celldata[x][y]=3
		} else{
			celldata[x][y]=4
		}
	} else{
		alert("不能标记扫过的地方！")
	}
}
function isWin () {
	var t_sign=0
	var w_sign=0
	for (var i=0;i<10;i++) {
		for (var j=0;j<10;j++) {
			if (celldata[i][j]==3) {
				t_sign++
			} else if (celldata[i][j]==4){
				w_sign++
			}
		}
	}
	if (t_sign==minenum&&w_sign==0) {
		clearTimeout(t)
		alert("Viectory!")
		isover=true
	}
}
function startit () {
	isstart=1
	t=setTimeout("startit()",1000)
	sec++
	document.getElementById('times').value=sec
	document.getElementById('ctrl').value="暂停"
	document.getElementById('ctrl').onclick=function () {
		endit()
	}
}
function endit () {
	isstart=0
	clearTimeout(t)
	document.getElementById('ctrl').value="开始"
	document.getElementById('ctrl').onclick=function () {
		startit()
	}
}