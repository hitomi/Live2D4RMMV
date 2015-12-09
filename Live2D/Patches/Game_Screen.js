(function () {

	var parameters = PluginManager.parameters('Live2D');
	var modelPath = parameters['path'] || 'live2d/';
	
	var _Game_Screen_clear = Game_Screen.prototype.clear;
	Game_Screen.prototype.clear = function () {
		_Game_Screen_clear.call(this);
    	this.clearLive2DModels();
	};
	
	
	Game_Screen.prototype.clearLive2DModels = function () {
		this.live2dModels = {};
	};
	
	Game_Screen.prototype.loadLive2DModel = function(key, model) {
		this.live2dModels[key] = model;
	};
	
	Game_Screen.prototype.getLive2DModel = function(key) {
		console.log(this.live2dModels[key]);
		return this.live2dModels[key];
	};
	
	Game_Screen.prototype.removeLive2DModel = function(key) {
		delete this.live2dModels[key];
	};
	
})();