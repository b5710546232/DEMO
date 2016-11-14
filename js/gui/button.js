var jumpButton = me.GUI_Object.extend(
  {
    init:function (x, y, player)
    {
      var settings = {};
      settings.image = "jumpButton";
      settings.framewidth =  me.loader.getImage("jumpButton").width;
      settings.frameheight = me.loader.getImage("jumpButton").height;
      this._super(me.GUI_Object, "init", [x, y, settings]);
      this.z = 4;
      this.player = player;
      this.isHoldable = true;
      this.alpha =  0.65;
    },

    // output something in the console
    // when the object is clicked
    onClick:function (event)
    {
      // console.log("clicked!");
      // don't propagate the event
      if(!game.isActive)return;
      this.alpha =  1;
      this.player.jump();
      return true;
    },
    onRelease:function (event) {
      if(!game.isActive)return;
      this.alpha =  0.65;
      // return false;
    },
  });
var upButton = me.GUI_Object.extend({
  init:function (x, y, player)
  {
    var settings = {};
    settings.image = "arrow";
    settings.framewidth =  me.loader.getImage("arrow").width;
    settings.frameheight = me.loader.getImage("arrow").height;
    this._super(me.GUI_Object, "init", [x, y, settings]);
    this.z = 4;
    this.player = player;
    this.alpha =  0.65;
    this.isHoldable = true;
  },

  // output something in the console
  // when the object is clicked
  onClick:function (event)
  {
    if(!game.isActive)return;
    this.player.drillType = "U";
    this.alpha =  1;
    this.player.auraEffect.use();
    return true;
  },
  onRelease:function (event) {
    if(!game.isActive)return;
    this.player.auraEffect.notUse();
    this.player.drillType = "N";
    this.alpha =  0.65;
    // return false;
  },

});
var leftButton = me.GUI_Object.extend({
  init:function (x, y, player)
  {
    var settings = {};
    settings.image = "arrow";
    settings.framewidth =  me.loader.getImage("arrow").width;
    settings.frameheight = me.loader.getImage("arrow").height;
    this._super(me.GUI_Object, "init", [x, y, settings]);
    this.z = 4;
    this.player = player;

    this.alpha =  0.65;
    this.isHoldable = true;
    this.angle = Math.PI*3/2;
    // console.log(this);
  },

  // output something in the console
  // when the object is clicked
  onClick:function (event)
  {
    if(!game.isActive)return;
    this.player.drillType = "L";
    this.alpha =  1;
    this.player.auraEffect.use();
    return true;
  },
  onRelease:function (event) {
    if(!game.isActive)return;
    this.player.auraEffect.notUse();
    this.player.drillType = "N";
    this.alpha =  0.65;
    // return false;
  },

});
var rightButton = me.GUI_Object.extend({
  init:function (x, y, player)
  {
    var settings = {};
    settings.image = "arrow";
    settings.framewidth =  me.loader.getImage("arrow").width;
    settings.frameheight = me.loader.getImage("arrow").height;
    this._super(me.GUI_Object, "init", [x, y, settings]);
    this.z = 4;
    this.player = player;

    this.alpha =  0.65;
    this.isHoldable = true;
    this.angle = Math.PI/2;
    // console.log(this);
  },

  // output something in the console
  // when the object is clicked
  onClick:function (event)
  {
    if(!game.isActive)return;
    this.player.drillType = "R";
    this.player.auraEffect.use();
    this.alpha =  1;
    return true;
  },
  onRelease:function (event) {
    if(!game.isActive)return;
    this.player.auraEffect.notUse();
    this.player.drillType = "N";
    this.alpha =  0.65;
    // return false;
  },

});

var pauseButton = me.GUI_Object.extend({
  init:function (x, y,countDownLabel)
  {
    var settings = {};
    settings.image = "pauseButton";
    settings.framewidth =  32;
    settings.frameheight = 32;
    this._super(me.GUI_Object, "init", [x, y, settings]);
    this.isHoldable = true;
    this.alpha =  0.85;
    this.countDownLabel = countDownLabel;
    // console.log(this);
  },

  // output something in the console
  // when the object is clicked
  onClick:function (event)
  {
    this.alpha =  1;
    return true;
  },
  onRelease:function (event) {
    this.alpha =  0.85;
    if(game.isActive){
      game.isActive = false;
      this.image =  me.loader.getImage('resumeButton');
      this.countDownLabel.pause();
    }
    else if(!game.isActive){
      this.image =  me.loader.getImage('pauseButton');
      // var countDownLabel = me.pool.pull("counterLabel");
      // me.game.world.addChild(countDownLabel,10);
      this.countDownLabel.resume();
    }
    // if(game.isPlay){
    //   game.SPEED = 0;
    //   game.isPlay  = false;
    // }
    // else if(!game.isPlay){
    //   game.isPlay  = true;
    //   game.SPEED = 8;
    // }
    // return false;
  }

});
