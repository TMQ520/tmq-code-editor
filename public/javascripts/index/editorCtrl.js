define(['app'],function (app) {

	function aceConfig (ace) {
		var editor = ace.edit('editor'); //添加ace的editor工具
		
		editor.setOptions({	//设置自动提示功能
			enableBasicAutocompletion:true,
			enableSnippets:true,
			enableLiveAutocompletion:true
		});

		editor.setTheme("ace/theme/monokai");//添加主题
		editor.getSession().setMode("ace/mode/javascript"); //建立模块
		return editor;	//返回出去  因为我们要使用editor工具
	}

	app.controller('editorCtrl',['$scope','$http', function (scope,http) {
		var editor = aceConfig(ace);	//创建editor
		var editorNode = {};	//用来存放 node

		scope.itemClick = function (node) {	//点击文件时 读取文件
			editorNode = node;
			if(node.isFile) {
				http.post('/editor/readFile', {path:node.path})
				.then(function (data) {
					//将data数据转换成字符串格式 即json格式必须转换成string格式  angular.toJson(data.data,true)
					var content = typeof(data.data) == "string" ? data.data:angular.toJson(data.data,true);
					editor.setValue(content);	//此时的content 需是String
				});
			}
		};

		scope.saveFile = function () { //保存文件
			var obj = {
				path: editorNode.path,	//文件保存路径
				content: editor.getValue()	//文件内容
			};
			// console.log(obj);
			http.post('/editor/saveFile',obj)	//http请求 给到路径和内容
			.then(function (data) {	//拿到返回的的数据
				// alert(data.data);
			});
		};
	}]);
});