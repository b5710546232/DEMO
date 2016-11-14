game.GameOverScreen = me.ScreenObject.extend({
  onResetEvent: function() {
    if (!me.save.highScore) me.save.add({bestScore: game.data.score});
    if (game.data.score > me.save.bestScore) {
        me.save.bestScore = game.data.score;
    }
    this.bg = new me.Sprite(0,0, {image: me.loader.getImage('gameover_bg')});
    me.game.world.addChild(this.bg,0);
      this.result = new game.Result.Container();
      me.game.world.addChild(this.result,1);

  },
  onDestroyEvent: function() {
    me.game.world.removeChild(this.result);
    me.game.world.removeChild(this.bg);

  }
});
game.Result = game.Result || {};
game.Result.Container = me.Container.extend({

    init: function() {
        this._super(me.Container, 'init');

        this.isPersistent = true;

        this.floating = true;

        this.z = Infinity;

        this.name = "Result";

        this.addChild(new game.Result.ScoreText(gameWidth*1/10,gameHeight*3/10),1);
        this.addChild(new game.Result.BestScoreText(gameWidth*1/10,gameHeight*5/10),1);
        this.addChild(new game.Result.playAgainButton(gameWidth*1/10,gameHeight*7/10),1);
        this.addChild(new game.Result.menuButton(gameWidth*6.5/10,gameHeight*7/10),1);


    }
});

game.Result.ScoreText = me.Renderable.extend({
    init: function(x, y) {
        this._super(me.Renderable, 'init', [x, y, 10, 10]);
        this.text1 = new me.BitmapFont("font", 32);
        this.text1.set("left",0.8);

        this.text2 = new me.BitmapFont("font", 32);
        this.text2.set("left",0.8);

    },
    draw : function (renderer) {
        this.text1.draw (renderer, "Score : " , this.pos.x, this.pos.y);
        this.text2.draw (renderer, " "+game.data.score , this.pos.x+this.text1.measureText(renderer, "Score : ").width, this.pos.y);
    }
});
game.Result.BestScoreText = me.Renderable.extend({
    init: function(x, y) {
        this._super(me.Renderable, 'init', [x, y, 10, 10]);
        this.text1 = new me.BitmapFont("font", 32);
        this.text1.set("left",0.8);

        this.text2 = new me.BitmapFont("font", 32);
        this.text2.set("left",0.8);

    },
    draw : function (renderer) {
        // draw it baby !
        this.text1.draw (renderer, "Best score : " , this.pos.x, this.pos.y);
        this.text2.draw (renderer, " "+me.save.bestScore.toString() , this.pos.x+this.text1.measureText(renderer, "Best score : ").width, this.pos.y);
    }
});
game.Result.playAgainButton = me.GUI_Object.extend(
  {
    init:function (x, y)
    {
      var settings = {};
      settings.image = "play_again_button";
      settings.framewidth =  me.loader.getImage("play_again_button").width;
      settings.frameheight = me.loader.getImage("play_again_button").height;
      this._super(me.GUI_Object, "init", [x, y, settings]);
      this.z = 4;
      this.isHoldable = true;
      // this.alpha =  0.65;
    },
    onClick:function (event)
    {
      // this.alpha =  1;
    },
    onRelease:function (event) {
      // this.alpha =  0.65;

      me.state.change(me.state.PLAY);
      // this.alpha = 1;
      // return true;
    },
  });
game.Result.menuButton = me.GUI_Object.extend(
{
  init:function (x, y)
  {
    var settings = {};
    settings.image = "menu_button";
    settings.framewidth =  me.loader.getImage("menu_button").width;
    settings.frameheight = me.loader.getImage("menu_button").height;
    this._super(me.GUI_Object, "init", [x, y, settings]);
    this.z = 4;
    this.isHoldable = true;
  },
  onRelease:function (event) {
    me.state.change(me.state.MENU);
  },
});
