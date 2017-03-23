define(['app'], function (app) {
	app.service('TryCatchService', function () {
		this.TryCatch = function (data) {
			try{
				var result = (data != null);
			}catch(err){
				console.error("");
			}
		};
	});
});