var express = require('express');
var codeManagerService = require('../service/codeManagerService.js');
var mutil = require('mill-n-utils');

var router = express.Router();

/* GET home page*/
router.get('/',function (req, res, next) {
	res.send('<h1>sucess</h1>');
});

//拿sqlite服务器上的全部数据
router.get('/get_all', function (req, res, next) {
	var promiseResult = codeManagerService.getAll();
	promiseResult.then(function (data) {
		res.json(data);
		// res.send(data);
	}, function (err) {
		res.send(err);
	});
});

//选择服务器上的数据 这些都是通过get请求才能用 
//如 get_row/:id  在浏览器中写成: https://localhost:3000/mcode/get_row/3 用req.params.id获取  此时id为3
//如 get_row?id=1 在浏览器中写成: https://localhost:3000/mcode/get_row?id=3 用req.query.id获取后面的id
/*router.get('/get_row', function (req, res, next) {
	var promiseResult = codeManagerService.getRow({id: req.query.id});
	promiseResult.then(function (data) {
		res.send(data);	//将数据返回给请求
	},
	function (err) {
		res.send(err);	//发送错误信息
	});
});*/

router.get('/get_row/:id', function (req, res, next) {
	var promiseResult = codeManagerService.getRow({id: req.params.id});
	promiseResult.then(function (data) {
		res.send(data);	//将数据返回给请求
	},
	function (err) {
		res.send(err);	//发送错误信息
	});
});

//更新服务器上的数据  通过post请求发送的数据  可用req.body.data
router.post('/update', function (req, res, next) {
	var promiseResult = codeManagerService.update(req.body.data);
	promiseResult.then(function () {
		res.send('updated success');
	},function (err) {
		res.send(err);
	});
});

//插入数据到服务器 通过post请求 可用req.body.data
router.post('/insert', function (req, res, next) {
	var promiseResult = codeManagerService.insert(req.body.data);
	promiseResult.then( function () {
		res.send('insert success');
	}, function (err) {
		res.send(err);
	});
});

//删除数据库中的数据  这里用 post 所以用req.body.id去拿
router.post('/delete_row', function (req, res, next) {
	if(req.body.id) {
		var promiseResult = codeManagerService.deleteRow({id:req.body.id});	
		promiseResult.then( function () {
			res.send('deleted success');
		}, function (err) {
			res.send(err);
		});
	}
});

//删除数据库中的数据  这里用 /delete_row?id=2的方法 所以用req.query.id去拿
router.get('/delete_row', function (req, res, next) {
	var promiseResult = codeManagerService.deleteRow({id: req.query.id});	
	promiseResult.then( function () {
		res.send('deleted success');
	}, function (err) {
		res.send(err);
	});
});
router.get('/delete_row/:id', function (req, res, next) {
	var promiseResult = codeManagerService.deleteModel({id: req.params.id});	
	promiseResult.then( function () {
		res.send('deleted success');
	}, function (err) {
		res.send(err);
	});
});

router.post('/render_code', function (req, res, next) {
	var tpl = req.body.data.template;
	var conf = req.body.data.content;

	if(tpl && conf) {
		try{
			conf = JSON.parse(conf);	//解析为对象
			var result = mutil.ejs.render(tpl,conf);//渲染代码
			res.json({
				state: 1,
				message: "代码生成成功",
				data: result
			});
		}catch(e){
			res.json({
				state: -1,
				message: "模板解析错误或代码生成错误,请检查配置",
				data: {}
			});
		}
	}else {
			res.json({
				state: 0,
				message: "代码生成失败,请检查你的参数",
				data: {}
			});
		}
});


module.exports = router;