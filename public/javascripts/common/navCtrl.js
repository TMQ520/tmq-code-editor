define(['app'],function (app) {
	app.controller('navCtrl',['$scope',function (scope) {
		scope.navdata = {
			brand: "E-Canal",
			left:[
				{url:'http://www.yuyigufen.com',val:'宇易'},
				{
					val: "e运河",
					dropdown: true,	//用来显示下拉列表
					items: [
						{url: 'http://www.yuyigufen.com',val: '运河首页'},{},
						{url: 'http://www.capcc.com.cn',val: '中国运河网'},{},
						{url: 'http://www.grandcanal.com.cn',val: '京杭大运河'}
					]
				}
			],
			form: {	//搜索框
				btnVal: '搜索',
				inputVal: 'e运河',
				onSubmit: function () {
					alert(this.inputVal);
				}
			},
			right: [
				{url: "http://www.ecanal.com",val: "e运河"},
				{
					val: "编程语言",
					dropdown: true,
					items:[
						{ url: "http://www.w3school.com.cn", val: "Web"},
						{ url: "http://jquery.com", val: "Jquery"},
						{ url: "https://angularjs.org",val: 'Angualr'},{},
						{ url: "http://nodejs.cn", val: "Nodejs"},
						{ url: "https://bower.io", val: "Bower"},
						{ url: 'http://www.bootcss.com', val: "Bootstrap"}
					]
				}
			]
		};
	}]);
});