mui.init();
document.addEventListener('showpage', function() {
//	alert('触发了')
	var header = document.querySelector('header.mui-bar');
	var list = document.getElementById('list');
	//calc hieght
	list.style.height = (document.body.offsetHeight - header.offsetHeight) + 'px';
	//create
	window.indexedList = new mui.IndexedList(list);
})

//mui.ready(function() {
//				var header = document.querySelector('header.mui-bar');
//				var list = document.getElementById('list');
//				//calc hieght
//				list.style.height = (document.body.offsetHeight - header.offsetHeight) + 'px';
//				//create
//				window.indexedList = new mui.IndexedList(list);
//			});