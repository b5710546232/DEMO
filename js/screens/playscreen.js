game.PlayScreen = me.ScreenObject.extend({
  onResetEvent: function() {
    me.audio.pauseTrack();
    // reset the score
    game.data.score = 0;
    // me.plugin.register.defer(this, me.debug.Panel, "debug");
    // add bg
    this.bg = new game.BgContainer();
    me.game.world.addChild(this.bg,-1);
    // add this.player
    this.player = me.pool.pull("Player",-10,250);
    me.game.world.addChild(this.player,8);
    // add our HUD to the game world
    this.HUD = new game.HUD.Container(this.player);
    me.game.world.addChild(this.HUD,10);
    // add weapon
    this.drill = new game.DrillEntity(this.player);
    me.game.world.addChild(this.drill,7);
    //add platformGenerator and create the platform.
    this.platformGenerator = me.pool.pull("platformGenerator");
    me.game.world.addChild(this.platformGenerator,2);
    this.platformGenerator.create();

    this.countDownLabel = me.pool.pull("counterLabel");
    me.game.world.addChild(this.countDownLabel,10);
    this.pauseButton = new pauseButton(gameWidth-65,25,this.countDownLabel);
    me.game.world.addChild(this.pauseButton,10);
    if(me.device.isMobile){
      this.ui =  new game.UiContanier(this.player);
      me.game.world.addChild(this.ui,10);
    }

    me.input.bindKey(me.input.KEY.SPACE, "jump", true);
    me.input.bindKey(me.input.KEY.R, "reset", true);
    me.input.bindKey(me.input.KEY.P, "pause", true);
    me.input.bindKey(me.input.KEY.UP, "UP", false);
    me.input.bindKey(me.input.KEY.LEFT, "LEFT", false);
    me.input.bindKey(me.input.KEY.RIGHT, "RIGHT", false);
    me.audio.playTrack("S31-Undercover-Operative_fix2");
  },
  onDestroyEvent: function() {
    me.game.world.removeChild(this.player);
    me.game.world.removeChild(this.drill);
    me.game.world.removeChild(this.platformGenerator);
    me.game.world.removeChild(this.HUD);
    me.game.world.removeChild(this.countDownLabel);

    if(this.ui!== undefined){
      me.game.world.removeChild(this.ui);
    }
    
    game.isActive = false;

    me.input.unbindKey(me.input.KEY.LEFT);
    me.input.unbindKey(me.input.KEY.RIGHT);
    me.input.unbindKey(me.input.KEY.SPACE);
    me.input.unbindKey(me.input.KEY.UP);
    me.input.unbindKey(me.input.KEY.R);
    me.input.unbindKey(me.input.KEY.P);


    me.audio.stopTrack();

  }
});
game.UiContanier = me.Container.extend({
  init:function (player) {
    this._super(me.Container, "init", [0,0,gameWidth,gameHeight]);
    this.player = player;
    me.game.world.addChild(new jumpButton(50,gameHeight-190+100 + 15 - 30,this.player),10);
    me.game.world.addChild(new upButton(gameWidth-220,gameHeight-190+100 + 15 - 30 ,this.player),10);
    me.game.world.addChild(new leftButton(gameWidth-320,gameHeight-190+100 + 15 - 30,this.player),10);
    me.game.world.addChild(new rightButton(gameWidth-120,gameHeight-190+100 + 15 - 30,this.player),10);
    }
});
game.BgContainer = me.Container.extend({
  init:function () {
    this._super(me.Container, "init", [0,0,gameWidth,gameHeight]);
    var bg_b = new game.BG_B();
    var bg_f = new game.BG_F();
    var filter = me.pool.pull("filter");
    me.game.world.addChild(filter,9);
    this.addChild(bg_b,-1);
    this.addChild(bg_f,0);

  },
  update:function (dt) {
    if(!game.isActive)return false;
    this._super(me.Container, "update", [dt]);
    return true;
  },
});

game.BG_B = me.ImageLayer.extend({
  init:function () {
    var settings = {};
    settings.image = "bg_b";
    settings.width = me.loader.getImage("bg_b").width;
    settings.height = me.loader.getImage("bg_b").height;
    settings.anchorPoint = new me.Vector2d(0.5,0.5);
    this._super(me.ImageLayer, "init", [0, 0, settings]);
  },
  update:function (dt) {
    this._super(me.ImageLayer, "update", [dt]);
    this.offset.x+=game.SPEED*0.8;
    return true;
  },
});
game.BG_F = me.ImageLayer.extend({
  init:function () {
    var settings = {};
    settings.image = "bg_f";
    settings.width = me.loader.getImage("bg_f").width;
    settings.height = me.loader.getImage("bg_f").height;
    settings.anchorPoint = new me.Vector2d(0.5,0.5);
    this._super(me.ImageLayer, "init", [0, 0, settings]);
  },
  update:function (dt) {
    this._super(me.ImageLayer, "update", [dt]);
    this.offset.x+=game.SPEED*0.9;
    return true;
  },
});
game.Filter = me.Sprite.extend({
  init:function () {
    var settings = {};
    settings.image = "filter";
    settings.width = gameWidth;
    settings.height = gameHeight;
    this._super(me.Sprite, "init", [0, 0, settings]);
  },
});
