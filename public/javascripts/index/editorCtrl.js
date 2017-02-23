define(['app','ace_config'] ,function (app, AceConfig) {

	

	app.controller('editorCtrl',['$scope','$http'/*,'saveFileService'*/, function (scope,http,saveFileService) {

		//编辑框的实例对象
		var editor = AceConfig.aceConfig("editor",saveCurrentFile);	//创建editor
		var editorNode = null;	//用来存放 node(当前编辑的节点(文件))

		//ace编辑框右键点击事件
		scope.rightBtnClick = function (e) {
			//alert(121);	
		};

		//ajax读取文件  http是通过ajax请求的
		scope.itemClick = function (node) {	//点击文件时 读取文件
			editorNode = node;
			AceConfig.setFile(node); //aceconfig中,缓存当前编辑的文件对象信息
			if(node.isFile) {
				http.post('/editor/readFile?time=' + (new Date()).getTime(), {path:node.path})
				.then(function (data) {
					//将data数据转换成字符串格式 即json格式必须转换成string格式  angular.toJson(data.data,true)是序列化JSON数据
					var content = typeof(data.data) == "string" ? data.data:angular.toJson(data.data,true);
					editor.setValue(content);	//此时的content 需是String
				});
			}
		};
		//ajax保存文件
		scope.saveFile = saveCurrentFile;
		
		function saveCurrentFile() { //保存文件
			if(!editorNode) {
				alert('没有选中的文件');
				return;
			}
			var obj = {
				path: editorNode.path,	//文件保存路径
				content: editor.getValue()	//文件内容
			};
			// 异步调用保存文件的接口
			http.post('/editor/saveFile',obj)	//http请求 给到路径和内容 是个对象
			.then(function (data) {	//拿到返回的的数据
				alert(data.data);
			});
		};

		
	}]);
});