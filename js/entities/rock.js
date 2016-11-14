game.rockEntity = me.Entity.extend({
  init:function (x,y,rockType,labelRock) {
    if(labelRock===undefined)labelRock = null;
    if(rockType===undefined)rockType = "U";
    var settings = {};
      switch (rockType) {
        case "U":
        settings.image = "rockU";
        settings.width = 64;
        settings.height = 64;
          break;

        case "L":
        settings.image = "rockL";
        settings.width = 64;
        settings.height = 64;
          break;

        case"R" :
        settings.image = "rockR";
        settings.width = 64;
        settings.height = 64;
          break;
        default:
        settings.image = "rockU";
        settings.width = 64;
        settings.height = 64;
      }
      this.labelRock = labelRock;
      this._super(me.Entity, "init", [x, y, settings]);
      this.renderable.addAnimation("idle",  [0, 1, 2, 3, 4, 5],100);
      this.renderable.addAnimation("die",  [6, 7, 8, 9, 10, 11],100);
      this.renderable.setCurrentAnimation("idle");
      this.body.collisionType = me.collision.types.ENEMY_OBJECT;
      this.rockType = rockType;
      this.isHit = false;
  },
  destroy:function () {
    this.rockType = "X";
    if(!this.isHit){
      this.labelRock.destroy();
      // me.game.world.removeChild(this.labelRock);
      // game.data.score+=score;
      var arr = [20,30,35];
      var rand = Math.floor((Math.random() * 3));
      // this.pos.x+=arr[rand];
      this.renderable.setCurrentAnimation("die",(function () {
        me.game.world.removeChild(this);
         return false; // do not reset to first frame
     }).bind(this));
     this.isHit = true;
   }
  },
});
game.LabelRockSprite = me.AnimationSheet.extend({
  init:function (x,y,rocktType) {
    var settings = {};
    settings.image = "label_rock";
    settings.framewidth = 32;
    settings.frameheight = 32;
    this._super(me.AnimationSheet, "init", [x, y, settings]);
    this.addAnimation("remove", [ 0, 1, 2 ],80);
    this.animationpause = true;
    switch (rocktType) {
      case "L" :
        this.angle = Math.PI*3/2;
        break;
      case "R" :
      this.angle = Math.PI/2;
      break;
      default:
      // no change.
    }
  },
  destroy:function () {
    this.animationpause = false;
    this.setCurrentAnimation("remove",(function () {
       this.alpha = 0;
       me.game.world.removeChild(this);
       return false; // do not reset to first frame
     }).bind(this));
  },
});
