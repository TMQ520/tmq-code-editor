require.config({

	paths:{
		'bootstrap': '/bootstrap/dist/js/bootstrap',  //引入bootstrap
		"ace":"/ace/build/src/ace",
		"ext-language":"/ace/build/src/ext-language_tools",  
    	'angular': '/angular/angular', //引入angular
    	'angular-route': '/angular-route/angular-route', //引入angular-route
    	'angular-tree': '/angular-tree-control/angular-tree-control', //引入angular-tree-control
		'jquery': "/jquery/dist/jquery", //引入jQuery,
    	'nav': '/javascripts/common/nav',
    	'navCtrl': '/javascripts/common/navCtrl'
	},
	shim:{ //用来加载不符合AMD规范的js文件
		'bootstrap':{
			exports: "bootstrap",
			deps:[
			'jquery',
			//'css!/bootstrap/dist/css/bootstrap.css'	//加! 表示引入的是css 不是js
			]
		},
	    'angular': {
	      exports: 'angular',
	      deps:['bootstrap']
	    },
	    'angular-route': {
	      exports: 'angular-route',
	      deps:['angular']
	    },
	    'angular-tree': {
	      exports: 'angular-tree',
	      deps:[
	      	'angular',
	      	"css!/angular-tree-control/css/tree-control.css",
			"css!/angular-tree-control/css/tree-control-attribute.css",
	      ]
	    },
	    'ace': {
	      exports: 'ace',
	    },
	    'ext-language': {
	      exports: 'ext-language',
	      deps:[
	      	'ace'
	      ]
	    },
	    'nav': {
	      exports:'nav',
	      deps:['angular']  //依赖于angular
		},
	},
	map:{ //引入require-css
		'*':{
			'css':'/require-css/css.js'
		}
	}
});

require([
		'bootstrap',
	    'angular',
	    'angular-route',
	    'angular-tree',
	    'route',   
	    'IndexCtrl',   
	    'editorCtrl',   
	    'treeCtrl',   
	    'app',   
	    'nav',   
	    'navCtrl',   
	    'ace',   
	    'ext-language'
		],function (boot,angular) {
	    angular.bootstrap(document,['indexApp']);
});