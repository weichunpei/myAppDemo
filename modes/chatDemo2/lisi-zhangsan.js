mui.init();
//输入框
var send = document.getElementById('send');
//表情
var emoticons = document.getElementById('emoticons');
//更多
var more = document.getElementById('more');
document.getElementById('msg-input').addEventListener('input', function() {
	//	console.log(this.value);
	if(this.value.trim().length > 0) {
		//把发送按钮显示出来 把表情更多按钮隐藏
		send.style.display = 'block';
		emoticons.style.display = 'none';
		more.style.display = 'none';
	} else {

		//和上边相反
		send.style.display = '';
		emoticons.style.display = '';
		more.style.display = '';
	}
})

document.getElementById('send').addEventListener('tap', function() {
	//	alert(document.getElementById('msg-input').value);
	var msgInput = document.getElementById('msg-input');
	var msgInputValue = document.getElementById('msg-input').value;
	var willSendMsg = '<div class="chat-box chat-box-right mui-content-padded mui-clearfix">' +
		'<img src="lf.jpg" class="chat-avatar" />' +
		'<div class="chat-content">' +
		'<div class="chat-content-inner">' +
		msgInputValue +
		'</div>' +
		'<div class="chat-content-arrow">' +
		'</div>' +
		'</div>' +
		'</div>';
	var newDom = document.createElement('div');
	newDom.innerHTML = willSendMsg;
	var msgList = document.querySelector('.chat-list');
	msgList.appendChild(newDom);
	//清空文本输入框
	msgInput.value = '';
	//显示表情和跟多按钮
	send.style.display = '';
	emoticons.style.display = '';
	more.style.display = '';

	//滚动条到达最底部时 229 scrollHeight 753 offsetHeight 524
	msgList.scrollTop = msgList.scrollHeight - msgList.offsetHeight;

	//开始发送消息 lisi>>>zhangsan
	// lisi 用自己的名字作为 clientId，获取 IMClient 对象实例
	realtime.createIMClient('lisi').then(function(lisi) {
	  // 创建与Jerry之间的对话
	  return lisi.createConversation({
	    members: ['zhangsan'],
	    name: '李四发给张三的消息',
	  });
	}).then(function(conversation) {
	  // 发送消息
	  return conversation.send(new AV.TextMessage(msgInputValue));
	}).then(function(message) {
	  console.log('李四发给张三的消息', '发送成功！');
	}).catch(console.error);

})

//初始化聊天
var Realtime = AV.Realtime;
var TextMessage = AV.TextMessage;
//初始化
var realtime = new Realtime({
	appId: '8iimbgUCTguEsNPN1AgUash3-gzGzoHsz',
	region: 'cn', //美国节点为 "us"
	pushOfflineMessages: true,
});

console.info('我是李四，我现在正在和张三聊天');
//监听所有发送过来给我的消息
realtime.createIMClient('lisi').then(function(lisi) {
  lisi.on('message', function(message, conversation) {
    console.log('我收到了消息: ' + message.text);
    var willSendMsg='<div class="chat-box chat-box-left mui-content-padded">'+
			    	'	<img class="chat-avatar" src="zzw.jpg"/>'+
			    	'	<div class="chat-content">'+
			    	'		<div class="chat-content-inner">'+
			    	message.text+
			    	'		</div>'+
			    	'		<div class="chat-content-arrow"></div>'+
			    	'	</div>'+
			    	'	<div class="clear-float"></div>'+
			    	'</div>';
	
	var newDom=document.createElement('div');
	newDom.innerHTML=willSendMsg;
	var msgList=document.querySelector('.chat-list');
	//把拼接好的气泡html追加到消息列表末尾
	msgList.appendChild(newDom);
	
	msgList.scrollTop=msgList.scrollHeight-msgList.offsetHeight;
    
  });
}).catch(console.error);