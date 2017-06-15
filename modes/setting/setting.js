mui.init();
		var loginWv;
		mui.later(function(){			
	//获取到登录界面的webWv
			loginWv=plus.webview.getLaunchWebview();
		loginWv.show();
		},1000)
mui('body').on('tap', '.mui-popover-action li>a', function() {
	var a = this,
		parent;
	//根据点击按钮，反推当前是哪个actionsheet
	for(parent = a.parentNode; parent != document.body; parent = parent.parentNode) {
		if(parent.classList.contains('mui-popover-action')) {
			break;
		}
	}
	//关闭actionsheet
	mui('#' + parent.id).popover('toggle');
//	alert("你刚点击了\"" + a.id + "\"按钮");
	if(a.id=='loginout'){
		
		//清空一下本地用户数据
		localStorage.removeItem('sessionToken');
		localStorage.removeItem('username');
		
		//退出,显示登录界面
		
		//推迟以后 关闭主界面,由于 主界面和message,address-book,discover,mine 界面是父子关系,关闭主界面,就相当于关闭了子界面
		plus.webview.close('main','none');
		plus.webview.close('setting');
	}else{
		
	}
})