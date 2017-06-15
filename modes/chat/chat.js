mui.init();
//输入框
var send=document.getElementById('send');
//表情
var emoticons=document.getElementById('emoticons');
//更多
var more=document.getElementById('more');
document.getElementById('msg-input').addEventListener('input',function(){
//	console.log(this.value);
	if(this.value.trim().length>0){
		//把发送按钮显示出来 把表情更多按钮隐藏
		send.style.display='block';
		emoticons.style.display='none';
		more.style.display='none';
	}else{
		
		//和上边相反
		send.style.display='';
		emoticons.style.display='';
		more.style.display='';
	}
})

document.getElementById('send').addEventListener('tap',function(){
//	alert(document.getElementById('msg-input').value);
	var msgInput=document.getElementById('msg-input');
	var msgInputValue=document.getElementById('msg-input').value;
	var willSendMsg='<div class="chat-box chat-box-right mui-content-padded mui-clearfix">'+
					'<img src="lisi.png" class="chat-avatar" />'+
					'<div class="chat-content">'+
						'<div class="chat-content-inner">'+
							msgInputValue+
						'</div>'+
						'<div class="chat-content-arrow">'+
						'</div>'+
					'</div>'+
				'</div>';
				var newDom=document.createElement('div');
				newDom.innerHTML=willSendMsg;
				var msgList=document.querySelector('.chat-list');
				msgList.appendChild(newDom);
				//清空文本输入框
				msgInput.value='';
				//显示表情和跟多按钮
				send.style.display='';
				emoticons.style.display='';
				more.style.display='';
				
				//滚动条到达最底部时 229 scrollHeight 753 offsetHeight 524
				msgList.scrollTop=msgList.scrollHeight-msgList.offsetHeight;
				
				
})