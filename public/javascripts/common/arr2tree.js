define(['app'], function (app) {
	app.service('arr2tree',function (){
		this.doConve = function (arr) {	//
			if(!arr) throw "参数不能为空";
			if(!Array.isArray(arr)) throw "参数必须为数组";
			var obj = {
				0: {name: 'root', child:[]}
			};
			arr.forEach(function (item,index,arr) {//第一次循环将所有的数据都添加到obj中
				item.child = [];
				obj[item.id] = item;
			});
			arr.forEach(function (item,index,arr) {//第二次循环将parent_id为1的都push到parent_id为0的对象中
				if(obj[item.parent_id])
					obj[item.parent_id].child.push(item);
			});
			// console.log(obj);
			return obj[0];//返回根对象
		};
	});
});