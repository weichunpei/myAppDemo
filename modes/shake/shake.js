/*加速度传感器*/
mui.init();
mui.plusReady(function() {
	var up = document.querySelector(".up");
	var down = document.querySelector(".down");
	var MAX = 20;
	var p = null;
	plus.accelerometer.watchAcceleration(function(a) {
				//如果x,y,z三个方向上的加速度绝对值加起来超过了某个数值,那么我们就认为用户在摇手机

				if(!p && (Math.abs(a.xAxis) + Math.abs(a.yAxis) + Math.abs(a.zAxis) )> MAX) {

//					mui.alert('开始播放音效')
					//			mui.alert('我被摇动了');
					//播放音效
					p =plus.audio.createPlayer('modes/shake/shake.wav');
					//			console.info(p);
					p.play(); //开始播放音效
					setTimeout(function() {
						p.stop(); //2s后停止播放音效
						p = null;
					}, 2000);
					//开始图片特效
					console.info('开始图片特效');
					up.style.webkitTransform = 'translateY(-' + (up.offsetHeight / 2) + 'px)';
					down.style.webkitTransform = 'translateY(' + (down.offsetHeight / 2) + 'px)';
					setTimeout(function() {
						up.style.webkitTransform ='';
						down.style.webkitTransform='';
						mui.later(function(){
							mui.toast('正在搜索同一时刻摇晃手机的人');
						},200)
					}, 700);
				}
				
		},
		function() {
			alert('监听失败了');
		}, {
			frequency: 500
		})
});