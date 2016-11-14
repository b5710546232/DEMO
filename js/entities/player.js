/**
* Player Entity
*/
game.PlayerEntity = me.Entity.extend({

  init:function (x, y) {
    var settings = {};
    settings.image = "player_sheet";
    settings.width = 41;
    settings.height = 60;
    this._super(me.Entity, "init", [x, y, settings]);

    this.alwaysUpdate = true;
    this.hp = 5;
    this.playerPositionX = 250;
    this.jumpTimes = 2;
    this.drillType = "N";
    this.lastAnim = "walk";
    var velX = 10;
    this.body.setVelocity(velX, 12);
    this.body.collisionType = me.collision.types.PLAYER_OBJECT;
    this.renderable.addAnimation("walk",  [0, 1, 2, 3, 4, 5, 6, 7],100);
    this.renderable.addAnimation("jump",  [2]);
    this.renderable.setCurrentAnimation("walk");
    this.auraEffect = me.pool.pull("auraEffect",this);
    this.area = new me.Rect(0,0,gameWidth/2,gameHeight);
    me.game.world.addChild(this.auraEffect,6);
  },

  update : function (dt) {
    if (!game.isActive) {
           return false;
    }
    this.body.update(dt);
    this.control();
    if(this.alive){
      if(this.pos.x>=this.playerPositionX){
        this.pos.x = Math.floor(this.playerPositionX);
      }
      if(this.pos.x<this.playerPositionX){
        this.body.vel.x = 2;
      }
    }
    me.collision.check(this);
    if (me.input.isKeyPressed("reset")) {
      this.rebirth();
    }
    this.manageAnim();
    this.death();
    return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
  },
  manageAnim:function () {
    if((this.body.jumping || this.body.falling) && this.lastAnim==="walk"){
      this.renderable.setCurrentAnimation("jump");
      this.lastAnim = "jump";
      // console.log('jump');
    }
    if(!this.body.falling && !this.body.jumping && (this.lastAnim!=="walk")){
      this.renderable.setCurrentAnimation("walk");
      this.renderable.setAnimationFrame(0);
      // console.log('walk');
      this.lastAnim = "walk";
    }
  },
  rebirth:function () {
    this.body.vel.x = 0;
    this.body.vel.y = 0;
    this.jumpTimes = 2;
    game.SPEED = 3.5;
    this.pos.x = this.playerPositionX;
    this.pos.y = 100;
    this.alive = true;
    this.hp = 5;
  },
  jump:function () {
    if (this.jumpTimes>0) {
      this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
      this.body.jumping = true;
      this.jumpTimes--;
      me.audio.play("swosh");
    }
    if(!this.alive){
      this.rebirth();
    }
  },
  death:function () {
    if(this.pos.y>gameWidth+50||this.pos.x<-50){
      this.alive = false;
      this.auraEffect.notUse();
    }
    if(!this.alive){
      game.SPEED-=0.2;
      if(game.SPEED<=0){
        game.SPEED=0;
        this.alive = false;
        me.game.world.removeChild(this.auraEffect);
        me.state.change(me.state.GAMEOVER);
      }
    }
    if(this.hp<=0){
      this.hp=0;
      this.alive = false;
    }
  },
  getDamage:function () {
    // console.log(this.hp);
    if(this.hp>0){ this.hp--; }
  },
  control:function () {
    if(!me.device.isMobile){
      if (me.input.isKeyPressed("jump")) {
        this.jump();
      }

    if (me.input.isKeyPressed("UP")){
      if(this.drillType!=="U")
      this.auraEffect.notUse();

      this.drillType = "U";
      this.auraEffect.use();

    }
    else if (me.input.isKeyPressed("LEFT")){
      if(this.drillType!=="L")
      this.auraEffect.notUse();


      this.drillType = "L";
      this.auraEffect.use();
    }
    else if (me.input.isKeyPressed("RIGHT")){
      if(this.drillType!=="R")
      this.auraEffect.notUse();

       this.drillType = "R";
       this.auraEffect.use();

     }
     else if(!me.input.isKeyPressed("RIGHT") && !me.input.isKeyPressed("UP") && !me.input.isKeyPressed("LEFT")){
       this.auraEffect.notUse();
       this.drillType = "N";
     }

    }

  },
  onCollision: function (res, other) {
    if(!this.alive){
      this.body.vel.x = -0.5;
       return false;
     }
    switch (res.b.body.collisionType) {
      case me.collision.types.WORLD_SHAPE:
      if (other.type === "platform") {
        if (this.body.falling &&
          (res.overlapV.y > 0) &&
          (~~this.body.vel.y >= ~~res.overlapV.y)
        ) {
          res.overlapV.x = 0;
          this.body.falling = false;
          this.body.jumping = true;
          this.jumpTimes = 2;
          return true;
        }
        return false;
      }

      break;
      case me.collision.types.ENEMY_OBJECT:
      if(other.rockType ==="U"|| other.rockType ==="L"||other.rockType ==="R"){
          if(this.drillType===other.rockType){
            game.data.score+=10;
            me.audio.play("Explosion2");
          }
          else if(this.drillType!==other.rockType){
            this.body.vel.x = - this.body.maxVel.x/5 * me.timer.tick;
            this.body.vel.y = -this.body.maxVel.y * me.timer.tick*0.5;
            this.renderable.flicker(350);
            this.getDamage();
            this.jumpTimes = 0;
            me.audio.play("Explosion2_2");
          }
          other.destroy();
          return false;
        }
        else {
          return false;
        }
      break;
      default:
      return false;
    }

    return true;
  }
});
