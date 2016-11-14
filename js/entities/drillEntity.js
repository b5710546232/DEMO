game.DrillEntity = me.Entity.extend({
  init:function (player) {
    var settings = {};
    settings.image = "drill_sheet";
    settings.width = 48;
    settings.height = 48;
    this.player = player;
    this._super(me.Entity, "init", [Math.floor(this.player.pos.x+(this.player.width/2)-4), Math.floor(this.player.pos.y+(this.player.height/2)-2), settings]);
    this.renderable.addAnimation("walk",  [0, 1, 2, 3, 4, 5, 6, 7],100);
    this.renderable.addAnimation("jump",  [2]);
    this.renderable.setCurrentAnimation("walk");
    this.lastAnim = "walk";
    this.body.collisionType = me.collision.types.PLAYER_OBJECT;
    this.alwaysUpdate = true;
  },
  update:function (dt) {

    if(!game.isActive)return false;
    // this.pos.x = Math.floor(this.player.pos.x+(this.player.width/2)-4);
    // this.pos.y = Math.floor(this.player.pos.y+(this.player.height/2)-2);

    if((this.player.body.jumping || this.player.body.falling) && this.lastAnim==="walk"){
      this.renderable.setCurrentAnimation("jump");
      this.lastAnim = "jump";
      this.pos.y = Math.floor(this.player.pos.y+(this.player.height/2)-2);
      this.pos.x = Math.floor(this.player.pos.x+(this.player.width/2)-4);
      // console.log('Djump');
    }
    else if(!this.player.body.falling && !this.player.body.jumping && (this.lastAnim!=="walk")){
      this.renderable.setCurrentAnimation("walk");
      this.renderable.setAnimationFrame(0);
      this.lastAnim = "walk";
      this.pos.y = Math.floor(this.player.pos.y+(this.player.height/2)-2);
      this.pos.x = Math.floor(this.player.pos.x+(this.player.width/2)-4);
      // console.log('Dwalk');
    }
    else{
    this.pos.y = Math.floor(this.player.pos.y+(this.player.height/2)-2);
    this.pos.x = Math.floor(this.player.pos.x+(this.player.width/2)-4);
    }


    return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
  },
});
