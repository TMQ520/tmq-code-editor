define(['app','ace_config'] ,function (app, AceConfig) {

	

	app.controller('editorCtrl',['$scope','$http','saveFileService', function (scope,http,saveFileService) {

		var editor = AceConfig.aceConfig("editor");	//创建editor
		var editorNode = null;	//用来存放 node

		scope.rightBtnClick = function (e) {
			//alert(121);	
		};

		//ajax读取文件
		scope.itemClick = function (node) {	//点击文件时 读取文件
			editorNode = node;
			AceConfig.setFile(node); //aceconfig中,缓存当前编辑的文件对象信息
			if(node.isFile) {
				http.post('/editor/readFile', {path:node.path})
				.then(function (data) {
					//将data数据转换成字符串格式 即json格式必须转换成string格式  angular.toJson(data.data,true)是序列化JSON数据
					var content = typeof(data.data) == "string" ? data.data:angular.toJson(data.data,true);
					editor.setValue(content);	//此时的content 需是String
				});
			}
		};
		//ajax保存文件
		scope.saveFile = saveFileService.saveFile;
		/*function () { //保存文件
			if(!editorNode) {
				alert('没有选中的文件');
				return;
			}
			var obj = {
				path: editorNode.path,	//文件保存路径
				content: editor.getValue()	//文件内容
			};
			// console.log(obj);
			http.post('/editor/saveFile',obj)	//http请求 给到路径和内容
			.then(function (data) {	//拿到返回的的数据
				alert(data.data);
			});
		};*/

		
	}]);
});