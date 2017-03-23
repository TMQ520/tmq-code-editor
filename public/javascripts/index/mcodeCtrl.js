define(['app','ace_config','treeContext'], function (app,AceConfig,treeContext) {

	app.controller('mcodeCtrl',
		['$scope','$http','$location',function (scope, http, location) {
		
		scope.title = 'this is my code'
		scope.editorTitle = 'content';
		//编辑框的实例对象
		var editor = AceConfig.aceConfig("editor",saveCurrentFile);	//创建editor
		var crrentNode = null;	//用来存放 node(当前点击s的节点(文件))

		scope.nodeClick = function (e,node) {	//用来保存当前右键点击时的node节点
			crrentNode = node;
		};
		function saveCurrentFile() {
			alert('保存当前的模板');
		}
		function saveModelOrItem (isleaf) {//封装添加模块和条目所共用的方法
			var param = {
				parent_id: crrentNode.id,
				is_leaf: isleaf,
				name: prompt('模块名称',"")
			};
			http.post('/mcode/insert',{data:param})
			.then(function (data) {
				alert(data.data);
			});
		}

		//为右键菜单设置处理函数
		treeContext.setFuncs({
			saveNode: function () {//保存模块
				saveModelOrItem(0);	//模块不是文件
			},
			saveItem: function () {//保存条目
				saveModelOrItem(1);	//条目是文件
			},
			del: function () {//删除
				http.get('/mcode/delete_row/' + crrentNode.id)
				.then(function (data) {
					alert(data.data);
				});
			}
		});

		/*
			生成代码
		 */
		scope.createCode = function () {
			if(!crrentNode){
				return console.error('没有选中任何文件');
			}
			crrentNode[scope.editorTitle] = editor.getValue();
			http.post('/mcode/render_code', {data: crrentNode})
			.then(function (generatorCode) {
				var result = generatorCode.data;
				if(result.state == 1){
					//将代码保存到浏览器的临时缓冲区去
					sessionStorage.setItem('renderCode',result.data);
					location.path('/editor'); //跳转的编辑页面
					// window.location.href = '/#!/editor';
				} else {
					console.error(result.message);
				}
			});
		};
		/*
			编辑配置
		 */
		scope.editConf = function () {
			//将模板的内容保存到template中
			if(!crrentNode){
				return console.error('没有选中任何文件');
			}
			crrentNode.template = editor.getValue();
			scope.editorTitle = 'content';
			editor.setValue(crrentNode.content);
		};

		/*
			编辑模板
		 */
		scope.editTpl = function () {
			if(!crrentNode){
				return console.error('没有选中任何文件');
			}
			crrentNode.content = editor.getValue();
			scope.editorTitle = 'template'
			editor.setValue(crrentNode.template);
		};
		/*
			保存模板和默认配置到数据库中去
		 */
		scope.saveCode = function () {
			//把当前编辑器中的代码赋值到crrentNode中去
			if(!crrentNode){
				return console.error('没有选中任何文件');
			}
			crrentNode[scope.editorTitle] = editor.getValue();
			http.post('/mcode/update', {data: crrentNode})
			.then(function (data) {
				alert(data.data);
			});
		};

		//点击读取文件内容
		scope.itemClick = function (node) {
			http.get('/mcode/get_row/' + node.id)
			.then(function (data) {
				//将当前读到的节点进行缓存
				crrentNode = node;
				if(!data.data)return;
				var content = typeof(data.data.content) == 'string' ? data.data.content : angular.toJson(data.data.content);
				editor.setValue(content);
			});
		};

		//点击保存文件内容
		scope.saveFile = function () {
			if(!crrentNode) {
				alert('没有选中文件');
				return;
			}
			crrentNode.content = editor.getValue();
			// 异步调用保存文件的接口
			http.post('/mcode/update', { data: crrentNode})
			.then(function (data) {
				alert(data.data);
			});
		};
	}]);
});