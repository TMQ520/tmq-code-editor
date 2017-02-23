var express = require('express');
var codeManagerService = require('../service/codeManagerService.js');

var router = express.Router();

/* GET home page*/
router.get('/',function (req, res, next) {
	res.send('<h1>sucess</h1>');
});

//拿全部数据
router.get('/get_all', function (req, res, next) {
	var promiseResult = codeManagerService.getAll();
	promiseResult.then(function (data) {
		res.json(data);
	}, function (err) {
		res.send(err);
	});
});

module.exports = router;