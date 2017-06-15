mui.init();
document.getElementById('tom').addEventListener('tap',function(){
	mui.openWindow({
		url:'../chatDemo2/lisi-zhangsan.html',
		id:'lisi'
	})
});
document.getElementById('jerry').addEventListener('tap',function(){
	
		mui.openWindow({
		url:'../chatDemo2/zhangsan-lisi.html',
		id:'zhangsan'
	})
});