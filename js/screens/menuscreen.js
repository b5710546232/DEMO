game.MenuScreen = me.ScreenObject.extend({
  /**
  *  action to perform on state change
  */
  onResetEvent: function() {
      me.input.bindKey(me.input.KEY.ENTER, "enter", true);
      me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.ENTER);
      this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
          if (action === "enter") {
              me.state.change(me.state.PLAY);
          }
      });
      this.bg = new game.BGMENU();
      me.game.world.addChild(this.bg,0);
      this.ui = new game.UI.PlayContainer();
      me.game.world.addChild(this.ui,10);

  },
  /**
  *  action to perform when leaving this screen (state change)
  */
  onDestroyEvent: function() {
      me.input.unbindKey(me.input.KEY.ENTER);
       me.input.unbindPointer(me.input.mouse.LEFT);
       me.event.unsubscribe(this.handler);
       me.game.world.removeChild(this.ui);
       me.game.world.removeChild(this.bg);
  }
});
game.BGMENU = me.Sprite.extend({
  init:function () {
    var settings = {};
    settings.image = "menubg";
    settings.width = me.loader.getImage("menubg").width;
    settings.height = me.loader.getImage("menubg").height;
    this._super(me.Sprite, "init", [0, 0, settings]);
  },
});
game.UI = game.UI || {};
game.UI.PlayContainer =  me.Container.extend({

    init: function() {
        this._super(me.Container, 'init');
        this.isPersistent = true;
        this.floating = true;
        this.addChild(new game.UI.PlayButton(gameWidth*5/12,320),1);
        this.addChild(new game.UI.ShopButton(gameWidth*1/10,320),1);
        this.addChild(new game.UI.CreditButton(gameWidth*9/12,320),1);
        this.addChild(new game.UI.SettingButton(gameWidth-64,30),1);

    }
});
game.UI.PlayButton = me.GUI_Object.extend(
{
  init:function (x, y)
  {
    var settings = {};
    settings.image = "play_button";
    settings.framewidth =  me.loader.getImage("play_button").width;
    settings.frameheight = me.loader.getImage("play_button").height;
    this._super(me.GUI_Object, "init", [x, y, settings]);
    this.z = 4;
    this.isHoldable = true;
  },
  onRelease:function (event) {
    me.state.change(me.state.PLAY);
  },
});
game.UI.ShopButton = me.GUI_Object.extend(
{
  init:function (x, y)
  {
    var settings = {};
    settings.image = "shop_button";
    settings.framewidth =  me.loader.getImage("shop_button").width;
    settings.frameheight = me.loader.getImage("shop_button").height;
    this._super(me.GUI_Object, "init", [x, y, settings]);
    this.z = 4;
    this.isHoldable = true;
  },
  onRelease:function (event) {
  },
});
game.UI.CreditButton = me.GUI_Object.extend(
{
  init:function (x, y)
  {
    var settings = {};
    settings.image = "credit_button";
    settings.framewidth =  me.loader.getImage("credit_button").width;
    settings.frameheight = me.loader.getImage("credit_button").height;
    this._super(me.GUI_Object, "init", [x, y, settings]);
    this.z = 4;
    this.isHoldable = true;
  },
  onRelease:function (event) {
  },
});
game.UI.SettingButton = me.GUI_Object.extend(
{
  init:function (x, y)
  {
    var settings = {};
    settings.image = "setting_button";
    settings.framewidth =  me.loader.getImage("setting_button").width;
    settings.frameheight = me.loader.getImage("setting_button").height;
    this._super(me.GUI_Object, "init", [x, y, settings]);
    this.z = 4;
    this.isHoldable = true;
  },
  onRelease:function (event) {
  },
});
