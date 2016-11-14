game.auraEffect = me.AnimationSheet.extend({
    init:function (player) {
      var settings = {};
      settings.image = "aura_sheet";
      settings.framewidth = 50;
      settings.frameheight = 50;
      this.player = player;
      this._super(me.AnimationSheet, "init", [player.pos.x, player.pos.y, settings]);
      this.addAnimation("start_green", [ 0, 1, 2 ],100);
      this.addAnimation("end_green", [ 2, 1, 0 ],80);
      this.addAnimation("use_green", [ 3, 4, 5 ],80);

      this.addAnimation("start_red", [ 6, 7, 8 ],100);
      this.addAnimation("end_red", [ 8, 7, 6 ],80);
      this.addAnimation("use_red", [ 9, 10, 11 ],80);

      this.addAnimation("start_violet", [ 12, 13, 14 ],100);
      this.addAnimation("end_violet", [ 14, 13, 12 ],80);
      this.addAnimation("use_violet", [ 15, 16, 17 ],80);

      this.alwaysUpdate = true;
      this.alpha = 0;
      this.isUse = false;
    },
    use:function () {
      if(!game.isActive)return;
      this.alpha = 1;
      // console.log('ok');
      if(!this.isUse){

        switch (this.player.drillType) {
          case "L":
          this.setCurrentAnimation("start_green",(function () {
             this.alpha = 1;
             this.setCurrentAnimation("use_green");
             return true; // reset to first frame
           }).bind(this));
            break;
          case "R":
          this.setCurrentAnimation("start_red",(function () {
             this.alpha = 1;
             this.setCurrentAnimation("use_red");
             return true; // reset to first frame
           }).bind(this));
           break;

           case "U":
           this.setCurrentAnimation("start_violet",(function () {
              this.alpha = 1;
              this.setCurrentAnimation("use_violet");
              return true; // reset to first frame
            }).bind(this));
            break;
          default:

        }
       this.isUse = true;
     }
   },
   notUse:function () {
     if(!game.isActive)return;
     if(this.isUse){
      switch (this.player.drillType) {
        case "L":
        this.setCurrentAnimation("end_green",(function () {
           this.alpha = 0;
           return true; //  reset to first frame
         }).bind(this));
        break;

        case "R":
        this.setCurrentAnimation("end_red",(function () {
           this.alpha = 0;
           return true; //  reset to first frame
         }).bind(this));
        break;

        case "U":
        this.setCurrentAnimation("end_violet",(function () {
           this.alpha = 0;
           return true; //  reset to first frame
         }).bind(this));
        break;


      }
   }
   this.isUse = false;
   },
   update:function (dt) {
     this.pos.x = this.player.pos.x+this.player.width/2 - 3;
     this.pos.y = this.player.pos.y+this.player.height*0.4;
     return (this._super(me.AnimationSheet, 'update', [dt]));
   }
});
