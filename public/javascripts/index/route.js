define(['app'],function (app) {
	app.config(['$routeProvider',function (route) {
		route.when('/mcode',{
			controller: 'mcodeCtrl',
			templateUrl: '/html/index/mcode.html'
		}).when('/editor',{
			controller: 'editorCtrl',	//指定控制器
			templateUrl: 'html/index/editor.html'	//指定模板页面
		}).otherwise({
			redirectTo: '/mcode'	//默认进入tmq路径页面下
		});
	}]);
});