define(['app','angular-tree'],function (app) {
	app.controller('treeCtrl',['$scope', '$http', function (scope,http) {
		scope.name = 'temp';
		http.get('/editor/filetree').then(function (data) {
			scope.dataForTheTree = data.data;			
		});

		scope.treeOptions = {
		    nodeChildren: "child",	//这里需要改成child
		    dirSelectable: true,
		    isLeaf: function (node) {	//判断是否为叶节点或者枝节点
		    	return node.isFile;
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
		/*scope.dataForTheTree =
		[
		    { "name" : "Joe", "age" : "21", "children" : [
		        { "name" : "Smith", "age" : "42", "children" : [] },
		        { "name" : "Gary", "age" : "21", "children" : [
		            { "name" : "Jenifer", "age" : "23", "children" : [
		                { "name" : "Dani", "age" : "32", "children" : [] },
		                { "name" : "Max", "age" : "34", "children" : [] }
		            ]}
		        ]}
		    ]},
		    { "name" : "Albert", "age" : "33", "children" : [] },
		    { "name" : "Ron", "age" : "29", "children" : [] }
		];*/
	}]);
});