//初始化mui框架
mui.init();
//用户输入账号密码
//用户点击登录按钮
//捕获用户点击登录按钮的事件
document.getElementById('login').addEventListener('tap', function() {
	//	alert('我被触发了');
	//获取到账号和密码的文本框对象
	var usernameInput = document.querySelector('input[name="username"]');
	var passwordInput = document.querySelector('input[name="password"]');
	//获取到用户输入的账号密码
	var usernameValue = usernameInput.value;
	var passwordValue = passwordInput.value;
	console.info("账号是:", usernameValue, "   密码是：", passwordValue);
	//非空校验
	if(!usernameValue || !passwordValue) {
		mui.toast('用户名或密码不能为空');
		return;
	}

	//	if(usernameValue==='admin'&&passwordValue==='123456'){
	//		console.info('登录成功,开始跳转页面');
	//		mui.openWindow('../main/main.html','main');
	//	}else{
	//		mui.toast('用户名或密码错误!请重新输入!');
	//	}

	//使用Ajax把账号密码传输到服务器上，在服务器进行账号密码的校验，https://leancloud.cn
	mui.ajax({
		url: 'https://api.leancloud.cn/1.1/login',
//		url:'php/login.php',
		type: 'get',
		data: {
			'username': usernameValue,
			'password': passwordValue
		},
		headers: {
			"X-LC-Id": "8iimbgUCTguEsNPN1AgUash3-gzGzoHsz",
			"X-LC-Key": "b4ONwLEi6Oy0lPyBMUnsbr7k"
		},
		success: function(data) {
			console.log(data);
			mui.toast('登录成功!');
			//存储到本地
			localStorage.setItem('sessionToken',data.sessionToken);
			localStorage.setItem('username',data.username);
			mui.later(function(){
				mui.openWindow({
					url:'../main/main.html',
					id:'main',
					show:{
						aniShow:'none'
					},
					styles:{
						hardwareAccelerated:true
					}
					
				});
			},1500);
		
		 /*
		  "username": "wcp",
		  * "sessionToken": "nve6yr8u500e7yp4ugk8sgjni",
		  * */
		 
		},
		error: function(error) {
			mui.toast('账号或者密码错误！')
			if(error.code==210){
				mui.toast('用户名和密码不匹配');
			}else if(error.code==211){
				mui.toast('用户不存在');
			}
			
//			 * {"code":210,"error":"The username and password mismatch."}
//			 * {"code":211,"error":"Could not find user"}
			 
		}
	});
	//如果校验成功，跳转界面到主页 
	//如果校验失败，提示密码错误
});
      	mui.plusReady(function(){
      		//引导页只有在第一次进入才会进入
      		if(plus.storage.getItem('launchFlag')){
      			//表示已经启动过引导页了,不需要造次进入引导页,直接跳转到登录页			
      			mui.openWindow({
      			url:'login.html',
      			id:'login',
      			style:{
   				popGusture:'none'
      			},
      			show:{
      				aniShow:'none'
      			}
      		})
      		}else{
      			//跳转到引导页面
      		
      		mui.openWindow({
      			url:'../guide/guide.html',
      			id:'guid',
      			style:{
   				popGusture:'none'
      			},
      			show:{
      				aniShow:'none'
      			}
      		})
      		}
      		
      	})
      	
//跳转到注册页面
document.getElementById("btn-register").addEventListener('tap',function(){
	mui.openWindow({
					url:'../register/register.html',
					id:'register',
					show:{
						aniShow:'none'
					},
					styles:{
						hardwareAccelerated:true
					}
					
				});
})