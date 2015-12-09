//=============================================================================
// AltSaveScreen.js
//=============================================================================

/*:
 * @plugindesc Add Live2D SDK.
 * @author Hitomi
 *
 * @help This plugin does not provide plugin commands.
 */
(function() {
    // Patch Game System
    PluginManager.loadScript('Live2D/Patches/GLBitmap.js');
    // Load Live2D Library
    PluginManager.loadScript('Live2D/Libs/live2d.min.js');
    PluginManager.loadScript('Live2D/Framework/Live2DFramework.js');
    // Load Live2D Utils
    PluginManager.loadScript('Live2D/Framework/utils/MatrixStack.js');
    PluginManager.loadScript('Live2D/Framework/utils/ModelSettingJson.js');
    // Load Live2D System
    PluginManager.loadScript('Live2D/Framework/PlatformManager.js');
    PluginManager.loadScript('Live2D/Framework/LAppDefine.js');
    PluginManager.loadScript('Live2D/Framework/LAppModel.js');
    // Link Start
    PluginManager.loadScript('Live2D/Sprite_Live2D.js');
    PluginManager.loadScript('Live2D/Scene_L2DTest.js');
    PluginManager.loadScript('Live2D/Sprite_Live2D_Layer.js');
    // Make Command List
    PluginManager.loadScript('Live2D/Patches/Game_Screen.js');
    
    PluginManager.parameters('Live2D');
    var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'Live2D') {
            console.log(args);
            switch (args[0]) {
            // 加载模型
            case 'load':
                // TODO
                $gameScreen.loadLive2DModel(args[1], args[2]);
                break;
            // 显示模型
            case 'show':
                // TODO
                var model = $gameScreen.getLive2DModel(args[1]);
                if (model) model.show();
                break;
            // 隐藏模型
            case 'hide':
                // TODO
                var model = $gameScreen.getLive2DModel(args[1]);
                if (model) model.hide();
                break;
            // 显示模型
            case 'fadeIn':
                // TODO
                var model = $gameScreen.getLive2DModel(args[1]);
                if (model) model.fadeIn(args[2]);
                break;
            // 隐藏模型
            case 'fadeOut':
                // TODO
                var model = $gameScreen.getLive2DModel(args[1]);
                if (model) model.fadeOut(args[2]);
                break;
            // 动作
            case 'motion':
                // TODO
                var model = $gameScreen.getLive2DModel(args[1]);
                if (model) model.startMotion(args[2], args[3] || 0, args[4] || 3);
                break;
            // 表情
            case 'expression':
                // TODO
                var model = $gameScreen.getLive2DModel(args[1]);
                if (model) model.setExpression(args[2]);
                break;
            // 模型位置
            case 'pos':
                // TODO
                var model = $gameScreen.getLive2DModel(args[1]);
                switch (args[2]) {
                case 'left':
                    if (model) model.x = 0;
                    break;
                case 'right':
                    if (model) model.x = Graphics.width - model.width;
                    break;
                default:
                    if (model) model.x = parseInt(args[2], 10);
                    break;
                }
            break;
            // 测试场景
            case 'test':
                // TODO
                SceneManager.goto(Scene_L2DTest);
            break;
            }
        }
    };
})();