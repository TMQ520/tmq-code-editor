define(['app'],function (app) {
	app.directive('navEcanal',function () {
		return {
			restrict: "AE", 	//指明属性和元素
			templateUrl: "/html/common/nav.html",
			replace:true,

			scope:{//隔离作用域
				data: "=navdata"
			},
		};
	});
});