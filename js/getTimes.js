function clocks () {
	var d=new Date()
	var hh=d.getHours()
	var mm=d.getMinutes()
	var ss=d.getSeconds()
	var ap="AM"
	var year=d.getFullYear()
	var month=d.getMonth()+1
	var dates=d.getDate()
	var week=d.getDay()
	if (hh>12) {
		hh=hh-12
		ap="PM"
	}else if(hh==12){
		ap="PM"
	}
	if (hh<10) {
		hh="0"+hh
	}
	if (mm<10) {
		mm="0"+mm
	}
	if (ss<10) {
		ss="0"+ss
	}
	switch (week){
		case 0:week="日"
			break;
		case 1:week="一"
			break;
		case 2:week="二"
			break;
		case 3:week="三"
			break;
		case 4:week="四"
			break;
		case 5:week="五"
			break;
		case 6:week="六"
			break;
		default:
			break;
	}
	document.getElementById('timer').innerHTML=year+"年"+month+"月"+dates+"日&nbsp;星期"+week+"&nbsp;&nbsp;"+hh+":"
		+mm+":"+ss+"&nbsp;"+ap;
	setTimeout(clocks,1000);
}
clocks();