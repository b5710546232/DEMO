var LOADINGBG = me.Sprite.extend({
  init:function () {
    var settings = {};
    settings.image = "loadbg";
    settings.width = me.loader.getImage("loadbg").width;
    settings.height = me.loader.getImage("loadbg").height;
    this._super(me.Sprite, "init", [0, 0, settings]);
  },
});
game.LoadingScreen = me.ScreenObject.extend({
    onResetEvent: function() {
      me.game.reset();
      me.game.world.addChild(new LOADINGBG(), 0);
    },
    onDestroyEvent: function() {
      me.game.world.removeChild(new LOADINGBG());
    }
});
