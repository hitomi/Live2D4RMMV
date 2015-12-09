//-----------------------------------------------------------------------------
// Window_TitleCommand
//
// The window for selecting New Game/Continue on the title screen.

var L2D_TEST_ACTIONS = [{
    name: '背景色',
    action: function() {
        this.live2d_character.bgColor = !this.live2d_character.bgColor;
    }
},{
    name: '剪裁',
    action: function() {
        this.live2d_character.cut = !this.live2d_character.cut;
    }
}, {
    name: '出血线',
    action: function() {
        this.live2d_character.bleedingLine = !this.live2d_character.bleedingLine;
    }
}, {
    name: '显示隐藏',
    action: function() {
        this.live2d_character._hiding ? this.live2d_character.show() : this.live2d_character.hide();
    }
}, {
    name: '冻结',
    action: function() {
        this.live2d_character.sleep = !this.live2d_character.sleep;
    }
}, {
    name: '动作',
    action: function() {
        this.live2d_character.startRandomMotion(['pinch_in', 'pinch_out', 'shake', 'flick_head', 'tap_body'][Math.floor(Math.random()*10)%5], 3);
    }
}, {
    name: '表情',
    action: function() {
        this.live2d_character.setRandomExpression();
    }
}, {
    name: '启用鼠标',
    action: function() {
        this.live2d_character.mouseEnable = !this.live2d_character.mouseEnable;
    }
}, {
    name: '跟随鼠标',
    action: function() {
        this.live2d_character.drag = !this.live2d_character.drag;
    }
}, {
    name: '响应动作',
    action: function() {
        this.live2d_character.tap = !this.live2d_character.tap;
    }
}, {
    name: '放大',
    action: function() {
        this.live2d_character.viewScale = 1.1;
    }
}, {
    name: '缩小',
    action: function() {
        this.live2d_character.viewScale = 0.9;
    }
}, {
    name: '重置缩放',
    action: function() {
        this.live2d_character.resetScale();
    }
}, {
    name: '淡入淡出',
    action: function() {
        thisRef = this;
        if (this.live2d_character.opacity == 255) {
            this.live2d_character.tween('opacity', 0, 120);
        }
        if (this.live2d_character.opacity == 0) {
            this.live2d_character.tween('opacity', 255, 120);
        }
    }
}, {
    name: '返回',
    action: function() {
       SceneManager.goto(Scene_Map);
   } 
}];

function Window_L2DTest() {
    this.initialize.apply(this, arguments);
}

Window_L2DTest.prototype = Object.create(Window_Command.prototype);
Window_L2DTest.prototype.constructor = Window_L2DTest;

Window_L2DTest.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
};

Window_L2DTest.prototype.changeCommandName = function(index, name) {
    this._list[index] = name;
};

Window_L2DTest.prototype.makeCommandList = function() {
    for (var i = 0; i < L2D_TEST_ACTIONS.length; i++) {
        this.addCommand(L2D_TEST_ACTIONS[i].name, 'runAction');
    }
};

Window_L2DTest.prototype.processOk = function() {
    Window_L2DTest._lastCommandSymbol = this.currentSymbol();
    this.playOkSound();
    this.updateInputData();
    this.callOkHandler();
};

Window_L2DTest.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.processHandling();
    this.processWheel();
    this.processTouch();
    this._stayCount++;
};


function Scene_L2DTest() {
    this.initialize.apply(this, arguments);
}

Scene_L2DTest.prototype = Object.create(Scene_Base.prototype);
Scene_L2DTest.prototype.constructor = Scene_L2DTest;

Scene_L2DTest.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
    this._hide = false;
};

Scene_L2DTest.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    // this.create_bg();
    this.createWindowLayer();
    this.create_win();
    this.create_ch();
};
Scene_L2DTest.prototype.create_win = function() {
    this._win = new Window_L2DTest();
    this._win.setHandler('runAction',  this.runAction.bind(this));
    this.addWindow(this._win);
};
Scene_L2DTest.prototype.runAction = function() {
    L2D_TEST_ACTIONS[this._win.index()]['action'].call(this);
};
Scene_L2DTest.prototype.create_bg = function() {
    this._bgs = new Sprite();
    this._bgs.bitmap = SceneManager.backgroundBitmap();
    this.addChild(this._bgs);
};
Scene_L2DTest.prototype.create_ch = function() {
    console.log(LAppDefine.MODEL_SHIZUKU);
    this.live2d_character = new Sprite_Live2D(LAppDefine.MODEL_SHIZUKU, function() {
        console.log(this.height);
        this.y = Graphics.height - this.height;
        this.x = (Graphics.width - this.width) / 2;
        thisRef = this;
    });
    this.addChildAt(this.live2d_character, 0);
};
Scene_L2DTest.prototype.update = function() {
    if (Input.isPressed('up')) {
        this.live2d_character.y--;
    }
    if (Input.isPressed('down')) {
        this.live2d_character.y++;
    }
    if (Input.isPressed('left')) {
        this.live2d_character.x--;
    }
    if (Input.isPressed('right')) {
        this.live2d_character.x++;
    }
    Scene_Base.prototype.update.call(this);
};