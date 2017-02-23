define(['app'],function (app) {
	app.config(['$routeProvider',function (route) {
		route.when('/tmq',{
			controller: 'IndexCtrl',
			templateUrl: '/html/index/index.html'
		}).when('/editor',{
			controller: 'editorCtrl',	//指定控制器
			templateUrl: 'html/index/editor.html'	//指定模板页面
		}).otherwise({
			redirectTo: '/tmq'	//默认进入tmq路径页面下
		});
	}]);
});