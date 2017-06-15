mui.init();
document.getElementById('shake').addEventListener('tap',function(){
	mui.openWindow({
		url:'../shake/shake.html',
		id:'shake'
	})
});

document.getElementById('scan').addEventListener('tap',function(){
	mui.openWindow({
		url:'../scan/scan.html',
		id:'scan'
	})
});