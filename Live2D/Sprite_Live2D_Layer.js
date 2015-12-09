//=============================================================================
// Sprite_Live2D_Layer.js
//=============================================================================

var parameters = PluginManager.parameters('Live2D');
var modelPath = parameters['path'] || 'live2d/';

function Sprite_Live2D_Layer() {
    this.initialize.apply(this, arguments);
}

Sprite_Live2D_Layer.prototype = Object.create(Sprite_Base.prototype);
Sprite_Live2D_Layer.prototype.constructor = Sprite_Live2D_Layer;

Sprite_Live2D_Layer.prototype.initialize = function() {
	Sprite_Base.prototype.initialize.call(this);
	this._models = {};
	this._loading = false;
}

Sprite_Live2D_Layer.prototype.update = function () {
	Sprite_Base.prototype.update.call(this);
	this._models = $gameScreen.live2dModels;
	for (var i in this._models) {
		if (this._models[i]) {
			if (typeof this._models[i] == "string") {
				this.add(i, this._models[i]);
			} else {
				this._models[i].update();
			}
		}
	}
};

Sprite_Live2D_Layer.prototype.add = function (key, model) {
	if (this._loading) return;
	var thisRef = this;
	this._loading = true;
	this._models[key] = new Sprite_Live2D(modelPath + model + '/' + model + '.model.json', false, function () {
		thisRef._models[key].x = Graphics.width - thisRef._models[key].width;
		thisRef._models[key].y = Graphics.height - thisRef._models[key].height;
		thisRef._models[key]._hash = key;
		thisRef._loading = false;
		thisRef.addChild(thisRef._models[key]);
	});
};

Sprite_Live2D_Layer.prototype.get = function (key) {
	return this._models[key];
};

var _Spriteset_Base_createUpperLayer = Spriteset_Base.prototype.createUpperLayer;
Spriteset_Base.prototype.createUpperLayer = function() {
	this.createLive2DLayer();
	_Spriteset_Base_createUpperLayer.call(this);
};

Spriteset_Base.prototype.createLive2DLayer = function () {
	this._live2dLayer = new Sprite_Live2D_Layer();
	this._live2dLayer.bitmap = new Bitmap(Graphics.width, Graphics.height);
	// this._live2dLayer.bitmap.fillAll("#ffffff");
	this.addChild(this._live2dLayer);
	console.log(this.children);
};
