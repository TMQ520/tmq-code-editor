define(['app'],function (app) {
	app.directive('myRightClick', function ($parse) {
		return {
			link : function (scope, elem, attrs) {
				//$parse将字符串解析成函数，解析后的函数，接收两个参数,(scope,变量对象) 一个是上下文，一个是与之有关的变量对象
				var myRightClick = $parse(attrs.myRightClick);
				//绑定到contextmenu事件上
				elem.bind('contextmenu', function (event) {
					//扩展作用域
					scope.$apply(function () {
						event.preventDefault();//取消默认事件
						myRightClick(scope,{$event:event});
					});
				});
			}
		};
	});
});