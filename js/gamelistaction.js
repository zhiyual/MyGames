var icons=document.getElementById("icon");


window.onload=function () {
	var lis=document.getElementById("lists").getElementsByTagName('li');
	for (var i=0;i<lis.length;i++) {
		var j=Math.floor(i/4);
		if ((i%2==0&&j%2==0)||(i%2==1&&j%2==1)) {
			lis[i].getElementsByTagName('div')[0].className="tilt_l";
		} else{
			lis[i].getElementsByTagName('div')[0].className="tilt_r";
		}
	}
}
icons.onmouseenter=function () {
	icons.src="img/icon-hover.png";
}
icons.onmouseleave=function () {
	icons.src="img/icon.png"
}
