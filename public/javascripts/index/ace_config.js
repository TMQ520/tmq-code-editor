define(['app','ace','context','ext-language'],function  (app) {
	
	var editor = {};
	var topId = '';
	var crrentFile = '';
	//初始化ace
	function aceInit (id) {
		topId = id;
		editor = ace.edit(id); //添加ace的editor工具
		

		editor.setOptions({	//设置自动提示功能
			enableBasicAutocompletion:true,
			enableSnippets:true,
			enableLiveAutocompletion:true
		});

		document.getElementById(id).style.fontSize = '14px';
		editor.setTheme("ace/theme/twilight");//添加主题
		editor.getSession().setMode("ace/mode/javascript"); //设置程序语言模式 即这里可以设为java或者javascript
		editor.commands.addCommand({
			name: 'myCommand',
			bindKey: {
				win: 'Ctrl-S',
				mac: 'Command-S'
			},
			exec: function (editor) {
				alert("你是否要保存文件");
			},
			readOnly: true // false if this command should not apply in readOnly mode 
		});
		return editor;	//返回出去  因为我们要使用editor工具 
	}

	//TODO 要封装成service,因为依赖http服务
	
	app.provider('saveFileService',function () {
		this.$get = function ($http) {	//这里进行依赖注入
			var factory = {};

			factory.saveFile = function () {
				if(!crrentFile) {
					return alert('没有选中的文件');
				}
				var obj = {
					path: crrentFile.path,
					content: editor.getValue()
				};

				$http.post("/editor/saveFile", obj)
				.then(function(data) {
					alert(data.data);
				});
			};
			return factory;
		};
	});

	/*app.service('saveFileService',['$http',function (http) { //而它是在这里进行行内依赖注入
		this.saveFile = function () {
			if(!crrentFile) {
				return alert('没有选中的文件');
			}
			var obj = {
				path: crrentFile.path,
				content: editor.getValue()
			};

			http.post("/editor/saveFile", obj)
			.then(function(data) {
				alert(data.data);
			});
		};
	}]);*/

	/*app.factory('saveFileService', ['$http',function (http) {	//而它是在这里进行行内依赖注入
		var factory = {};
		
		factory.saveFile = function () {
			if(!crrentFile) {
				return alert('没有选中的文件');
			}
			var obj = {
				path: crrentFile.path,
				content: editor.getValue()
			};

			http.post("/editor/saveFile", obj)
			.then(function(data) {
				alert(data.data);
			});
			// return this;
		};
		return factory;
		
	}]);*/


	// function saveFile (http) {
		/*if(!crrentFile) {
			return alert('没有选中的文件');
		}*/
		// var obj = {
			// path: crrentFile.path,
			// content: editor.getValue()
		// }

		// http.post("/editor/saveFile", obj)
			// .then(function(data) {
				// alert(data.data);
		// });
	// }

	//初始化
	context.init({
		fadeSpeed: 100,
		filter: function ($obj) {},
		above: 'auto',
		preventDoubleContext: true,
		compress: false
	});

	//设置语言的对象装填
	var languageMenus = [];
	var models = ['javascript','java','php','json','xml','html']; 
	models.forEach( function (item, index, arr) {
		languageMenus.push({
			text: item,
			action: function (e) {
				e.preventDefault();	//取消默认事件
				if(editor) {
					editor.getSession().setMode('ace/mode/' + item);	//设置ace的语言提示功能
				}
			}
		});
	});

	//设置右键菜单
	context.attach('#editor', [{
		header: 'ace设置'
	},{
		text: '百度',
		href: 'http://www.baidu.com',
		target: '_blank'
	},{
		text: '选择语言',
		subMenu: languageMenus
	},{
		text: '设置字体大小',
		action: function (e) {
			var size = prompt('请输入字体(px)','14');
			if(topId) {
				document.getElementById(topId).style.fontSize = size + 'px';
			}
		}
	},{
		text: "设为只读",
		action: function (e) {
			e.preventDefault();
			editor.setReadOnly(!editor.getReadOnly());
			e.currentTarget.innerHTML = e.currentTarget.innerHTML == "设为只读" ? "取消只读" : "设为只读";
		}
	},{
		divider: true
	},{
		header: '第二个标题'
	}]);

	return {
		aceConfig: aceInit,
		setFile: function (file) {
			crrentFile = file;
		},
		// saveFile: saveFile
	}

});