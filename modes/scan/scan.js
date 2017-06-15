mui.init();
mui.plusReady(function() {
	/*创建扫描控件*/
	var scan=new plus.barcode.Barcode('bcode', [
		plus.barcode.QR, //二维码
		plus.barcode.AZTEC //条形码
	],{
		frameColor:'#399a0e',
		scanbarColor:'#399a0e'
	});
//	扫描成功后回掉函数(识别条形码,返回文本结果)
	scan.onmarked=function(type,code,file){
		consol.info(type+'------'+code);
	}
	//开始扫描
	scan.start();
})

