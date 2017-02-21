var express = require('express');
var ft = require('../service/GetFileTree.js');
var muitls = require('mill-n-utils');	//导入mill工具包
var fs = require('fs');	//导入nodejs封装的包
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Editor' });
});

/*
req: request, 	请求
res: response,	响应

 */

			//文件树
router.get('/filetree', function (req, res, next) {
	var fileTreeObj = ft.walk('D:/工作/tmq-code-editor', ['node_modules','bower']);
	// res.send("这里是文件树的接口");
	res.json(fileTreeObj);
});

//读文件
router.post('/readFile',function (req, res, next) {
	if(req.body.path) {	//拿到传过来的 node.path
		var content = muitls.fs.read(req.body.path);
		res.send(content);	//发送响应
	}
});

//保存文件
router.post('/saveFile',function (req, res, next) {
	if(req.body.path) {
		fs.writeFileSync(req.body.path, req.body.content);	//同步写入文件
		res.send("保存完成"); //服务器缓存有问题 即文件必须有修改，才会反映到http.post上
	}
});

module.exports = router;
