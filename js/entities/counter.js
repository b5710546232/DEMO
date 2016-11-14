game.CountDownLabel = me.AnimationSheet.extend({
    init:function () {
      var settings = {};
      settings.image = "counter_label_sheet";
      settings.framewidth = 100;
      settings.frameheight = 50;
      this._super(me.AnimationSheet, "init", [gameWidth/2 - 50, gameHeight/2 - 25, settings]);
      this.anchorPoint = new me.Vector2d(0.5,0);
      this.addAnimation("pause", [ 4 ],1000);
      this.addAnimation("countDown", [ 2, 1, 0 ],1000);
      this.addAnimation("start", [ 3,2, 1, 0 ],1000);
      this.setCurrentAnimation("start",(function () {
      this.alpha = 0;
        game.isActive = true;
         return true; // reset to first frame
       }).bind(this));
    },
  //   onDeactivateEvent: function() {
	// 	if (!game.isActive) {
  //     game.isActive = true;
	// 	}
  //
	// },
  pause:function () {
    // game.player.isActive = false;
    // game.platformGenerator.isActive = false;
    // game.bg.isActive = false;
    // game.drill.isActive = false;
    this.alpha = 1;
    this.setCurrentAnimation("pause",(function () {
      game.isActive = false;
       return false; // reset to first frame
     }).bind(this));
  },
  resume:function () {
    this.setCurrentAnimation("countDown",(function () {
      this.alpha = 0;
      game.isActive = true;
       return true; // reset to first frame
     }).bind(this));
  }
});
