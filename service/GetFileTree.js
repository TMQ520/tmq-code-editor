var fs = require('fs');

var obj = {};
function walk (path, file, noeach) {
	if(file == null){
		file = {};
		file.name = "root";
		file.path = path;
		file.child = []; //存放子文件夹
		file.isFile = false;	//用来判断是否为叶节点或者枝节点
	}
	//凡是对数据的使用 前提都要进行验证
	//要合法性验证  数据处理 return出去  三步骤  异步是在方法栈当中进行排队执行  return出去有可能没有值
	var files = fs.readdirSync(path);	//所以这里必须是 同步读取文件夹
	
	if(files == null || files == undefined) return;

	//对拿到的文件目录进行迭代
	files.forEach(function (item, index, arr) {
		var tmpPath = path + '/' + item;  //将当前文件路径加上子文件名
		var tmpfile = {
			name: item,	//文件名
			path: tmpPath, 	//文件路径
			child:[]
		};

		//如果file的child存在就将子文件push到child中
		if(file.child) file.child.push(tmpfile);	//把子文件push到child中

		var stats = fs.statSync(tmpPath);	//同步读取 返回的是文件信息数组
		tmpfile.isFile = stats.isFile(); 	//判断是文件还是文件夹
		for(var i in noeach){	//排除不需要进行递归的文件夹
			if(item == noeach[i]){
				stats = null;
			}
		}
		if(stats && stats.isDirectory()){	//判断不为空且是目录名
			walk(tmpPath,tmpfile,noeach); //递归 获取filetree 文件树
		}
	});

	return file;	//返回拿到的文件树内容
}

function eachfile (root, noeach) {//将walk()包一层  可以实现在内部对它walk()进行操作 这样就可以进行递归
	troot = root;
	var result = walk(troot, null, noeach);
	return result;
}

obj.walk = eachfile;	//提供给外部一个API
module.exports = obj;	//将obj公布出去

