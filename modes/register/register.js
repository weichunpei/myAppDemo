mui.init();
//mui.plusReady(function() {
var username = document.getElementById('username');
var password = document.getElementById("password");
var email = document.getElementById("email");
var sendPhone = document.getElementById("send-phone");
var checkNum = document.getElementById("check-num");
var phoneNum = document.getElementById("phone-number");
var phoneFlag = false;
username.addEventListener('blur', function() {
	if(username.value.trim() == '') {
		mui.toast("昵称不能为空");
	}
})
password.addEventListener('blur', function() {
	if(password.value.length < 6) {
		mui.toast("密码不能少于6位");
	}
})
document.getElementById("register").addEventListener("tap", function() {
	if(phoneFlag) {
		//尝试
		mui.toast('注册成功');
			mui.later(function() {
				mui.openWindow({
					url: '../login/login.html',
					id: 'login',
					show: {
						aniShow: 'none'
					},
					styles: {
						hardwareAccelerated: true
					}

				});
			}, 1000);
		
		// 新建 AVUser 对象实例
//		console.log(111);
		//		var user = new AV.User();
		// 设置用户名
		//		user.setUsername(username.value);
		// 设置密码
		//		user.setPassword(password.value);
		// 设置邮箱
		//	user.setEmail(email.value);
		//设置手机号码
		//		user.setMobilePhoneNumber(phoneNum.value);
//		user.signUp().then(function(loginedUser) {
//			//			console.log(loginedUser);
//			mui.toast('注册成功');
//			mui.later(function() {
//				mui.openWindow({
//					url: '../login/login.html',
//					id: 'login',
//					show: {
//						aniShow: 'none'
//					},
//					styles: {
//						hardwareAccelerated: true
//					}
//
//				});
//			}, 1000);
//		}, function(error) {
//			console.log(error);
//			if(error.code == 214) {
//				mui.toast('手机号码已注册过');
//			}
//			if(error.code == 202) {
//				mui.toast('注册失败,请重新输入用户名')
//			}
//		});
	}
})
//})

//初始化
var APP_ID = '8iimbgUCTguEsNPN1AgUash3-gzGzoHsz';
var APP_KEY = 'b4ONwLEi6Oy0lPyBMUnsbr7k';
AV.init({
	appId: APP_ID,
	appKey: APP_KEY
});

//电话号码验证
var rex = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
sendPhone.addEventListener('tap', function() {
	if(!rex.test(phoneNum.value)) {
		mui.toast('请输入正确的手机号码');
	} else {
		var a = 60;
		sendPhone.disabled = true;
		var timer = setInterval(function() {
			sendPhone.innerText = '等待' + a + 's';
			if(a == 0) {
				a = 60;
				sendPhone.innerText = '点击重新发送';
				clearInterval(timer);
				sendPhone.disabled = false;
			}
			a--;

		}, 1000)
		//		mui.alert(username.value + '-----' + password.value + '---' + phoneNum.value);
		var user = new AV.User();
		// 设置用户名
		user.setUsername(username.value);
		// 设置密码
		user.setPassword(password.value);
		//设置电话
		user.setMobilePhoneNumber(phoneNum.value);
		user.signUp().then(function(loginedUser) {
			console.log(loginedUser);
			mui.toast('发送成功');
		},function(error){
			if(error.code == 214) {
				mui.toast('手机号码已注册过');
			}
			if(error.code == 202) {
				mui.toast('用户名已被占用');
			}
		});
		checkNum.addEventListener('blur', function() {
			var pattern = /^\d{6}$/;
			if(!pattern.test(checkNum.value)) {
				mui.toast('请输入正确的验证码')
			} else {
				AV.User.verifyMobilePhone(checkNum.value).then(function() {
					//验证成功
					phoneFlag = true;
					console.log(phoneFlag);
					document.getElementById("check-flag").style.display = 'block';
				}, function(err) {
					console.log(err);
					//验证失败
					phoneFlag = false;
					if(err.code == 603) {
						mui.toast('短信验证码不正确');
					}

				});
			}

		})
	}
})