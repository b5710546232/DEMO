var platformGenerator = {};
/* Game namespace */
var game = {


    // an object where to store game information
    data : {
        // score
        score : 0
    },
    isActive:false,

    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init( gameWidth , gameHeight , {wrapper : "screen", scale : "auto",doubleBuffering : true})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // add "#debug" to the URL to enable the debug Panel
        if (me.game.HASH.debug === true) {
            window.onReady(function () {
                me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
            });
        }
        // setup limit fps = 45;
        me.sys.fps = 45;
        me.sys.preRender = true;
        // Initialize the audio.
        me.audio.init("mp3,ogg,");

        // // Set a callback to run when loading is complete.
        me.loader.load({name: "loadbg",type:"image",	src: "assets/images/load_bg.png"},
        this.preloaded.bind(this));
    },
    preloaded:function () {
      // set all ressources to be loaded
              me.loader.onload = this.loaded.bind(this);

              // set all ressources to be loaded
              me.loader.preload(game.resources);

              // load everything & display a loading screen
              me.state.set(me.state.LOADING, new game.LoadingScreen());
              me.state.change(me.state.LOADING);
    },
    // Run on game resources loaded.
    "loaded" : function () {
        me.state.set(me.state.PLAY, new game.PlayScreen());
        me.state.set(me.state.MENU, new game.MenuScreen());
        me.state.set(me.state.GAMEOVER, new game.GameOverScreen());
        me.state.transition("fade", "#001113", 500);
        me.pool.register("Player", game.PlayerEntity );
        me.pool.register("ground",game.GroundEntity);
        me.pool.register("rock",game.rockEntity);
        me.pool.register("labelRock",game.LabelRockSprite);
        me.pool.register("auraEffect",game.auraEffect);
        me.pool.register("platform",game.Platform);
        me.pool.register("platformGenerator",game.PlatformGenerator);
        me.pool.register("filter",game.Filter);
        me.pool.register("counterLabel",game.CountDownLabel);


        me.game.viewport.setBounds(0, 0, gameWidth, gameWidth);
        // Start the game.
        // me.state.change(me.state.GAMEOVER);
        me.state.change(me.state.MENU);
        // me.state.change(me.state.PLAY);
    }
};
// var gameWidth = 640;
// var gameHeight = 360;
var gameWidth = 768;
var gameHeight = 432;
