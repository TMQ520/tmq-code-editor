define(['context','app'], function (c) {
	var contextFuncs = {};
	//初始化
	context.init({
		fadeSpeed: 100,
		filter: function ($obj) {},
		above: 'auto',
		preventDoubleContext: true,
		compress: false
	});
	//设置右键菜单
	context.attach('.ng-binding.ng-scope.branch', [{//枝节点的右键菜单
		header: '模块管理'
	},{
		text: '添加模块',
		action: function (e,text) {	//保存模块
			contextFuncs.saveNode();
		}
	},{
		text: '添加条目',
		action: function (e,text) {	//保存模块
			contextFuncs.saveItem();
		}
	},{
		text: '删除',
		action: function (e,text) {	//保存模块
			contextFuncs.del();
		}
	}]);


	//设置右键菜单
	context.attach('.ng-binding.ng-scope.leaf', [{//叶节点的右键菜单
		header: '条目管理'
	},{
		text: '删除',
		action: function (e,text) {	//保存模块
			contextFuncs.del(text);
		}
	}]);



	//设置对数据操作的方法
	function setFuncs (funcs) {
		contextFuncs = funcs;
	}

	return {
		setFuncs:setFuncs
	}
});