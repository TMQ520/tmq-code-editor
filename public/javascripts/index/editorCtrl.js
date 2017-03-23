define(['app','ace_config'] ,function (app, AceConfig) {

	

	app.controller('editorCtrl',['$scope','$http','McodeService','Mconst','$location', function (scope,http,McodeService,Mconst,location) {

		//编辑框的实例对象
		var editor = AceConfig.aceConfig("editor",saveCurrentFile);	//创建editor
		var editorNode = null;	//用来存放 node(当前编辑的节点(文件))
		//如果缓存中有文件信息则进行读入
		(function () {
			editorNode = {};
			var path = sessionStorage.getItem(Mconst.CURRENT_EDITOR_FILE_PATH);
			var content = sessionStorage.getItem(Mconst.CURRENT_EDITOR_FILE_CONTENT);
			if(content) {
				editor.setValue(content);//这里作用是跳转回来时还在编辑代码页面
				editorNode.path = path;
				editorNode.content = content;
			}
		})();

		//ace编辑框右键点击事件
		scope.rightBtnClick = function (e) {
			//alert(121);	
		};

		//向数据库插入数据
		scope.insertDb = function () {
			//做数据判断
			if(!editor.getValue()) return console.error('没有写入文件或者写入错误');
			//定义对象
			if(valueNull(editor.getValue()).length == 5){

				var data = eval('(' + editor.getValue() + ')');	//将从editor编辑器中获取到的字符串转为Object
				McodeService.insertData(data);
			}
		};

		//对数据库的数据进行改变
		scope.updateDb = function () {
			//做数据判断
			if(!editor.getValue()) return console.error('没有写入文件或者写入错误');
			if(valueNull(editor.getValue()).length == 6){
				
				var data = eval('(' + editor.getValue() + ')'); 
				McodeService.updateData(data);
			}
		};

		//获取数据库所有的数据
		scope.getAll = function () {
			http.get('/mcode/get_all').then(function (data) {
				var data = angular.toJson(data.data,true);	//将返回的数据json格式序列化
				// console.log(JSON.stringify(data.data));
				// console.log(angular.toJson(data.data,true));
				editor.setValue(data);
			});			
		};

		//删除数据
		scope.deleteRow = function () {
			
			//做数据判断
			if(!editor.getValue() || !(valueNull(editor.getValue()).id)) return console.error('删除格式不规范');
			var data= eval('(' + editor.getValue() + ')'); 
			console.log(data);
			http.post('/mcode/delete_row',data).then(function (data) {
				editor.setValue(data.data);
			});
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

		//判断
		function valueNull (value) {
			var valueNull =  eval('('+ value +')');//!(valueNull(eval('('+ value +')')).id)
			return valueNull;
		};

		//插入缓存中生成的代码
		scope.insertCeneratCode = function () {
			var code = sessionStorage.getItem("renderCode");
			if(!code) return console.error('缓存中没有文件信息');
			editor.insert(code);
		};

		//跳转到生成代码的页面
		scope.goGeneratCode = function () {
			//缓存当前被编辑的文件
			if(editorNode) {
				sessionStorage.setItem(Mconst.CURRENT_EDITOR_FILE_PATH,editorNode.path);
				sessionStorage.setItem(Mconst.CURRENT_EDITOR_FILE_CONTENT,editor.getValue());
			}
			location.path('/mcode');
		};
	}]);
});