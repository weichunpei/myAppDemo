//底部webview main.html 主webview
//其他webview 子webview
//层级关系 子webview 盖在父webview上面
mui.init();

mui.plusReady(function() {
	//获取父webview
	var parentWv = plus.webview.currentWebview();
	//创建4个子webview
	var pageList = [{
			url: '../message/message.html',
			id: 'message'
		},
		{
			url: '../address-book/address-book.html',
			id: 'address-book'
		},
		{
			url: '../discover/discover.html',
			id: 'discover'
		},
		{
			url: '../mine/mine.html',
			id: 'mine'
		}
	];
	for(var i = 0; i < pageList.length; i++) {
		var url = pageList[i].url;
		var id = pageList[i].id;
		// 		console.log(url+'======'+id);
		//开始创建webview
		//如果该webview已经被创建,则跳过本次循环
		if(plus.webview.getWebviewById(id)) {
			continue;
		}
		var newWv = plus.webview.create(url, id, {
			bottom: '50px', //距离底部距离
			top: '0ppx',
			popGesture: 'none' //侧滑返回
		});
		//webview的显示状态
		//第一个webview显示出来,其他的webview隐藏
		//		if(i===0){
		//			newWv.show();
		//		}else{
		//			newWv.hide();
		//		}
		i === 0 ? newWv.show() : newWv.hide();

		//把子webview追加到父webview
		parentWv.append(newWv);
	}
	var showWv = 'message';

	mui('.mui-bar').on('tap', '.mui-tab-item', function(e) {
		//				mui-alert('我被点击了');
		var showWvId=this.dataset.id;
		//如果當前顯示的子頁面和將要顯示的子頁面是同一個那麼什麼都不做
		if(showWv===showWvId){
			return;
		}
		//隐藏当前正显示的webview
		plus.webview.getWebviewById(showWv).hide();
		//在显示即将点击的webview
		//		mui-alert(this.dataset.id);
		var willShow=plus.webview.getWebviewById(showWvId);
		willShow.show('none',0,function(){
			//出发这个webWv定义的showPage事件
			mui.fire(willShow,'showpage');//第一个参数是触发那个对象,第二个参数是触发什么事件
		});
		//跟新當前顯示的子頁面id
		showWv = showWvId;
	});
});