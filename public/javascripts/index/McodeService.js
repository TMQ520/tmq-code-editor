define(['app'], function (app) {
	//注册底层服务 
	app.service('McodeService', ["$http", function (http) {
		//想服务器插入数据
		this.insertData = function (data) {
			//向服务器https://localhost:3000/mcode/insert页面发送post请求
			http.post('/mcode/insert', {data:data}).then(function (data) {//拿到服务器响应的数据
				alert(data.data);
			});
		};

		//向服务器改动数据
		this.updateData = function (data) {
			http.post('/mcode/update', {data:data}).then(function (data) {
				alert(data.data);
			});
		};
	}]);
});