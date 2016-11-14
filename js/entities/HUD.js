/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};


game.HUD.Container = me.Container.extend({

    init: function(player) {
        if(player===undefined)player=null;
        // call the constructor
        this._super(me.Container, 'init');

        // persistent across level change
        this.isPersistent = true;

        // make sure we use screen coordinates
        this.floating = true;

        // make sure our object is always draw first
        this.z = Infinity;

        // give a name
        this.name = "HUD";
        this.addChild(new game.HUD.HPStatusDisplay(80,35),0);
        this.addChild(new game.HUD.HPGreenBar(85,40,player),1);

        this.addChild(new game.HUD.ScoreItem(gameWidth - 100, 38),1);
        this.addChild(new game.HUD.CharacterDisplay(10,10),0);

        this.addChild(new game.HUD.ScoreBorder(gameWidth-300, 15),0);
        this.addChild(new game.HUD.StatusTexture(),0);

        // this.addChild(new game.HUD.ScoreText(gameWidth-150, 30),11);
    }
});


/**
 * a basic HUD item to display score
 */
game.HUD.ScoreItem = me.Renderable.extend({
    /**
     * constructor
     */
    init: function(x, y) {

        // call the parent constructor
        // (size does not matter here)
        this._super(me.Renderable, 'init', [x, y, 10, 10]);

        // create a font
        this.font = new me.BitmapFont("font", 32);
        this.font.set("right",0.4);

        // local copy of the global score
        this.score = -1;
    },

    /**
     * update function
     */
    update : function () {
        // we don't do anything fancy here, so just
        // return true if the score has been updated
        if (this.score !== game.data.score) {
            this.score = game.data.score;
            return true;
        }
        return false;
    },

    /**
     * draw the score
     */
    draw : function (renderer) {
        // draw it baby !
        this.font.draw (renderer, this.score, this.pos.x, this.pos.y);
    }

});
game.HUD.ScoreText = me.Renderable.extend({
    /**
     * constructor
     */
    init: function(x, y) {

        // call the parent constructor
        // (size does not matter here)
        this._super(me.Renderable, 'init', [x, y, 10, 10]);

        // create a font
        this.font = new me.BitmapFont("font", 32);
        this.font.set("right",0.4);

    },

    /**
     * draw the score
     */
    draw : function (renderer) {
        // draw it baby !
        this.font.draw (renderer, "score :" , this.pos.x, this.pos.y);
    }
});
game.HUD.ScoreBorder = me.Sprite.extend({
    init:function (x,y) {
      var settings = {};
      settings.image = "score_border_HUD";
      settings.framewidth  = me.loader.getImage("score_border_HUD").width;
      settings.frameheight = me.loader.getImage("score_border_HUD").height;
      this._super(me.Sprite, "init", [x, y, settings]);
    },
});
game.HUD.CharacterDisplay = me.Sprite.extend({
    init:function (x,y) {
      var settings = {};
      settings.image = "basic_char_display";
      settings.framewidth  = me.loader.getImage("basic_char_display").width;
      settings.frameheight = me.loader.getImage("basic_char_display").height;
      this._super(me.Sprite, "init", [x, y, settings]);
    },
});
game.HUD.HPStatusDisplay = me.Sprite.extend({
    init:function (x,y) {
      var settings = {};
      settings.image = "hp_status_bar";
      settings.framewidth  = me.loader.getImage("hp_status_bar").width;
      settings.frameheight = me.loader.getImage("hp_status_bar").height;
      this._super(me.Sprite, "init", [x, y, settings]);
    },
});
game.HUD.HPGreenBar = me.Sprite.extend({
    init:function (x,y,player) {
      var settings = {};
      settings.image = "hp_green_bar";
      settings.framewidth  = me.loader.getImage("hp_green_bar").width;
      settings.frameheight = me.loader.getImage("hp_green_bar").height;
      this._super(me.Sprite, "init", [x, y, settings]);
      this.player = player;
      this.playerHPMAX = player.hp;
      this.playerHPCurrent = player.hp;
      this.anchorPoint = new me.Vector2d(0,0.5);

      this.f = 1;
    },
    update:function (dt) {
      this.playerHPCurrent = this.player.hp;
      var ratioX = (this.playerHPCurrent/this.playerHPMAX).toFixed(3);
      if(ratioX<=0)ratioX = 0.001;
      this.scale(ratioX, 0);
      return (this._super(me.Sprite, 'update', [dt]));
    },
});
game.HUD.StatusTexture = me.Sprite.extend({
    init:function () {
      var settings = {};
      settings.image = "status_texture_HUD";
      settings.framewidth  = me.loader.getImage("status_texture_HUD").width;
      settings.frameheight = me.loader.getImage("status_texture_HUD").height;
      this._super(me.Sprite, "init", [0, 0, settings]);
    },
});
