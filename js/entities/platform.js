var groundSpriteWidth = 64;
game.SPEED = 0;
game.Platform = me.Container.extend({
  init:function (x,type) {
    this.groundWidth = me.loader.getImage("ground").width;
    this._super(me.Container, "init", [x,0,game.platformMap[0].length*this.groundWidth,gameHeight]);
    this.type = type===undefined ? 0:type;
    this.groundHeight = 310; // default;
    this.gameScreenWidth = gameWidth;
    this.alwaysUpdate = true;
    this.size = 0;
  },
  create:function () {
    for(var i = 0,length = game.platformMap[this.type].length;i<length;i++){
      this.setPlatformLevel(game.platformMap[this.type][i].level);
      if(game.platformMap[this.type][i].tile!==undefined){
        // console.log(game.platformMap[this.type][i]);
        var ground = me.pool.pull("ground",i*(groundSpriteWidth),this.groundHeight,0);
        this.addChild(ground);
        if(game.platformMap[this.type][i].object == "rock"){
          var types = ["U","R","L"];
          var rand =Math.floor((Math.random() * 3));
          var labelRock = me.pool.pull("labelRock",ground.pos.x+16,ground.pos.y-110,types[rand]);
          var rock = me.pool.pull("rock",ground.pos.x,ground.pos.y-64,types[rand],labelRock);
          this.addChild(labelRock,3);
          this.addChild(rock,3);
        }
      }
    }
  },
  setPlatformLevel:function(level){
    switch (level) {
      case 'l':this.groundHeight = 310;break;
      case 'm':this.groundHeight = 246-32;break;
      case 'h':this.groundHeight = 182-64;break;
      default:this.groundHeight = 310;
    }
  },
  pause:function () {
    if(game.isPlay){
      game.SPEED = 0;
      game.isPlay  = false;
    }
    else if(!game.isPlay){
      game.isPlay  = true;
      game.SPEED = 8;
    }
  },
  update:function(dt) {
    if (me.input.isKeyPressed("pause"))this.pause();
    this._super(me.Container, "update", [dt]);
    return true;
  },
});
game.PlatformGenerator = me.Container.extend({
  init:function () {
    this._super(me.Container, "init", [0,0,gameWidth,gameHeight]);
    this.platformWidth = game.platformMap[0].length*64;
    this.autoSort = false;
    this.counter = 0;
    game.SPEED = 4;
    this.alwaysUpdate = true;
  },
  create:function () {
    var platform_1 = me.pool.pull("platform",0,0,0);
    platform_1.create();
    this.addChild(platform_1,1);
    var platform_2 = me.pool.pull("platform",this.platformWidth,0,0,0);
    platform_2.create();
    this.addChild(platform_2,1);
  },
  update:function(dt) {
    this._super(me.Container, "update", [dt]);
    if(!game.isActive)return false;
    for (i = 0; i < this.children.length; i++) {
      this.getChildAt(i).pos.x -= game.SPEED;
    }
    var x = this.getChildAt(0).pos.x;
    if (x<=-this.platformWidth) {
      // console.log('create');
      this.removeChild(this.getChildAt(0));
      var range = game.platformMap.length;
      var rand = Math.floor((Math.random() * range) + 1);
      //  console.log(rand);
       this.counter++;
       if(this.counter%5===0){
         if(game.SPEED>=10)game.SPEED = 10;
         game.SPEED++;
         console.log('speedup');
       }
      var platform = me.pool.pull("platform",this.getChildAt(this.children.length-1).pos.x+this.platformWidth,rand-1);
      platform.create();
      this.addChild(platform);
    }
    return true;
  },
});
