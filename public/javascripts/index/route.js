define(['app'],function (app) {
	app.config(['$routeProvider',function (route) {
		route.when('/tmq',{
			controller: 'IndexCtrl',
			templateUrl: '/html/index/index.html'
		}).when('/editor',{
			controller: 'editorCtrl',
			templateUrl: 'html/index/editor.html'
		}).otherwise({
			redirectTo: '/tmq'	//默认进入tmq路径页面下
		});
	}]);
});