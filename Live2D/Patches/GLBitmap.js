function GLBitmap() {
    this.initialize.apply(this, arguments);
}
GLBitmap.prototype = Object.create(Bitmap.prototype);
GLBitmap.prototype.constructor = GLBitmap;

GLBitmap.prototype.initialize = function (width, height) {
    this._canvas = document.createElement('canvas');
    this._canvas.width = Math.max(width || 0, 1);
    this._canvas.height = Math.max(height || 0, 1);
    this._baseTexture = new PIXI.BaseTexture(this._canvas);
    this._baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
    this._image = null;
    this._url = '';
    this._paintOpacity = 255;
    this._smooth = false;
    this._loadListeners = [];
    this._isLoading = false;
    this._hasError = false;
    this.fontFace = 'Microsoft Yahei';
    this.fontSize = 28;
    this.fontItalic = false;
    this.textColor = '#ffffff';
    this.outlineColor = 'rgba(0, 0, 0, 0.5)';
    this.outlineWidth = 4;
    this._context = this.getWebGLContext();
    this.gl = this._context;
};
GLBitmap.prototype.getWebGLContext = function () {
    var NAMES = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    var param = {
        // alpha : true,
        preserveDrawingBuffer: true
    };
    for (var i = 0; i < NAMES.length; i++) {
        try {
            var ctx = this._canvas.getContext(NAMES[i], param);
            if (ctx) return ctx;
        }
        catch (e) { }
    }
    return null;
}