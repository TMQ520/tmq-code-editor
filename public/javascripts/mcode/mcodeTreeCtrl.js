define(['app'], function (app) {
	app.controller('mcodeTreeCtrl',['$scope','$http','arr2tree',
		function (scope,http,arr2tree) {
		
		scope.name = 'mcode';
		http.get('/mcode/get_all').then(function (data) {//拿到mcode下服务器中的文件 
			var tree = arr2tree.doConve(data.data);
			scope.dataForTheTree = tree;			
		});

		scope.treeOptions = {
		    nodeChildren: "child",	//这里需要改成child
		    dirSelectable: true,
		    isLeaf: function (node) {	//判断是否为叶节点或者枝节点
		    	return node.is_leaf;
		    },
		    injectClasses: {
		        ul: "a1",
		        li: "a2",
		        liSelected: "a7",
		        iExpanded: "a3",
		        iCollapsed: "a4",
		        iLeaf: "a5",
		        label: "a6",
		        labelSelected: "a8"
		    }
		}
	}]);
});