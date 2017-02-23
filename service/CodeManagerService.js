var SQLite3 = require('sqlite3');
var Promise = require('promise');
var path = require('path');

//连接数据库
var db = new SQLite3.Database(path.resolve(__dirname,"../dataCache/db/myCode.db"));

//向数据库中插入数据
function insert (obj) {
	var sql = `insert into code_manager 
	(name,content,template,parent_id,is_leaf)
	values(?,?,?,?,?)`;
	var parmas = [
		obj.name,
		obj.content,
		obj.template,
		obj.parent_id,
		obj.is_leaf
	];
	return runSql(sql,parmas);
}

//向数据库增加数据
function update (obj) {
	var sql = `update code_manager 
	set name=?,content=?,template=?,parent_id=?,is_leaf=?
	where id=?`;

	var parmas = [
		obj.name,
		obj.content,
		obj.template,
		obj.parent_id,
		obj.is_leaf,
		obj.id
	];

	return runSql(sql,parmas);
}

//向数据库删除数据
function deleteRow (obj) {
	var sql = `delete from code_manager where id=?`;
	return runSql(sql,[obj.id]);
}

//向数据库查询
function getRow (obj) {
	var sql = `select * from code_manager where id=?`;
	return new Promise(function (resolve,reject) {
		db.get(sql, [obj.id], function (err,data) {
			if(err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	})
}

//查所有数据需要做分页
function getAll () {
	var sql = `select * from code_manager`;
	return new Promise(function (resolve,reject) {
		db.all(sql,function (err,data) {
			if(err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	})
}

//封装运行sql语句的方法
function runSql (sql,parmas) {
	return new Promise(function (resolve,reject) {

		//三个参数  sql语句, 参数数组, 回调函数
		db.run(sql, parmas, function  (err) {
			if(err) {
				reject(err);	//失败 返回一个被拒绝的Promise对象
			} else {
				resolve(); 	//返回一个解析后成功的Promise对象
			}
		});
	});
}

module.exports = {
	getAll: getAll,
	getRow: getRow,
	deleteRow: deleteRow,
	update: update,
	insert: insert
};

/*var promiseResult = getAll();


promiseResult.then(function (data) {
	console.log(data);
},function (err) {
	console.error(err);
});*/