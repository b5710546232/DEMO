game.GroundEntity = me.Entity.extend({
  init:function (x,y,num) {
    if(num===undefined)num = 0;
    var settings = {};
    if(num===0)settings.image = "ground";
    settings.image = "ground1";

    settings.width = me.loader.getImage("ground1").width;
    if(num===0)settings.height = me.loader.getImage("ground").height;
    settings.height = me.loader.getImage("ground1").height;
    this._super(me.Entity, "init", [x, y, settings]);
    this.body.collisionType = me.collision.types.WORLD_SHAPE;
    this.body.gravity = 0;
    this.type = "platform";
  },
});
// var GROUNDSHAPE = new me.Rect(0,0,70,70);
