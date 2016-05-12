APP.SpaceView = Backbone.View.extend({  

  initialize: function() {   
    var self = this;

    this.playerModel =    new APP.PlayerModel();

    this.infoLineView =   new APP.InfolineView();
    this.fieldView =      new APP.FieldView();
    this.informerView =   new APP.InformerView({model: this.playerModel});
    this.playerShipView = new APP.PlayerShipView({model: this.playerModel});

    this.playerRocketCollection = new APP.PlayerRocketsCollection();
    this.starsCollection = new APP.StarsCollection();

    this.render();    

    this.$el.attr('tabindex', 1).focus();  

    this.starsInitialize();  

    setInterval(function() {
      self.makeMoves(self)
    }, 100);
  },    

  template: _.template($('#spaceTpl').html()),

  render: function() {    
    this.$el.html(this.template());  
    this.$el.find('#informerWrap').html(this.informerView.el);  
    this.$el.find('#infoLineWrap').html(this.infoLineView.render().el);  
    this.$el.find('#fieldWrap').html(this.fieldView.render().el);  

    this.$el.find('#field').append(this.playerShipView.render().el);  

    return this;
  },

  events: {
    'keydown': 'move'
  },  

  move: function(e) { 
    if(e.keyCode == 32) { 
      var playerRocketsCnt = this.playerModel.get('rockets');

      playerRocketsCnt--;
      if(playerRocketsCnt < 0) { 
        return; 
      } else {
        this.playerModel.set({rockets: playerRocketsCnt})
      };

      var playerShipWidth = this.$el.find('#player').width(),
          playerShipHeight = this.$el.find('#player').height(),
          playerRocketModel = new APP.PlayerRocketModel({
            xCoord: this.playerModel.get('xCoord') + playerShipWidth - 5,
            yCoord: this.playerModel.get('yCoord') + playerShipHeight -7
          });

      if(this.playerRocketCollection.add(playerRocketModel)) {
        var playerRocket = new APP.PlayerRocketView({model: playerRocketModel});
        this.$el.find('#field').append(playerRocket.render().el);
      };
    } else {
      var newCoords = this.computeCoords(e.keyCode);

      this.playerModel.set({
        xCoord: newCoords.xCoord,
        yCoord: newCoords.yCoord
      });      
    };
  },

  computeCoords: function(keyCode) { 
    var yCoordNew,
        xCoordNew,
        yCoord =  this.playerModel.get('yCoord'),
        xCoord =  this.playerModel.get('xCoord'),
        speed =   this.playerModel.get('speed');

    var playerShipWidth = this.$el.find('#player').width(),
        playerShipHeight = this.$el.find('#player').height();        

    var topBoundCoord = 0,
        leftBoundCoord = 0,    
        bottomBoundCoord = this.$el.find('#field').height() - playerShipHeight,
        rightBoundCoord = this.$el.find('#field').width() - playerShipWidth;

    switch(keyCode) {
      case 38:  
        yCoordNew = yCoord - speed;        
        if(yCoordNew <= topBoundCoord) { yCoordNew = yCoord };
        xCoordNew = xCoord;
        break;

      case 40: 
        yCoordNew = yCoord + speed;
        if(yCoordNew >= bottomBoundCoord) { yCoordNew = yCoord };
        xCoordNew = xCoord;
        break;

      case 37: 
        xCoordNew = xCoord - speed;
        if(xCoordNew <= leftBoundCoord) { xCoordNew = xCoord };
        yCoordNew = yCoord;
        break;

      case 39: 
        xCoordNew = xCoord + speed;
        if(xCoordNew >= rightBoundCoord) { xCoordNew = xCoord };
        yCoordNew = yCoord;
        break;                

      default:
        /*console.log('error coords compute');*/
        break;
    };

    return {
      xCoord: xCoordNew, 
      yCoord: yCoordNew
    };
  },

  makeMoves: function(self) { 
    this.playerRocketsMoves(self);
    this.starsMoves(self);    
  },

  playerRocketsMoves: function(self) {  
    self.playerRocketCollection.each(function(model) { 
      var xCoord = model.get('xCoord'),
          xCoordNew = xCoord + 10,
          fieldWidth = self.$el.find('#field').width(),
          playerRocketWidth = self.$el.find('#playerRocket').first().width();

      if(xCoordNew < (fieldWidth - playerRocketWidth)) {
        model.set({xCoord: xCoordNew});
      } else {  
        model.destroy();
      };        
    });
  },

  starsMoves: function(self) {  
    self.starsCollection.each(function(model) { 
      var speed = model.get('speed'),
          xCoord = model.get('xCoord'),
          xCoordNew = xCoord - speed,
          fieldWidth = self.$el.find('#field').width(),
          fieldHeight = self.$el.find('#field').height();

      if(xCoordNew > 0) {
        model.set({xCoord: xCoordNew});
      } else {  
        model.set({
          xCoord: fieldWidth,
          yCoord: APP.helper.randomIntFromZero(fieldHeight),
        });
      };        
    });    
  },

  starsInitialize: function() {     
    var starsCnt = 100,
        starSpeedMax = 3,
        starSpeedMin = 0,
        starModel,
        xCoordRandom,
        yCoordRandom,
        speedRandom,
        fieldWidth = this.$el.find('#field').width(),
        fieldHeight = this.$el.find('#field').height();

    for(var i = 0; i < starsCnt; i++) {
      xCoordRandom = APP.helper.randomIntFromZero(fieldWidth);
      yCoordRandom = APP.helper.randomIntFromZero(fieldHeight);
      speedRandom = APP.helper.randomIntFromInterval(starSpeedMin, starSpeedMax);

      starModel = new APP.StarModel({
        xCoord: xCoordRandom,
        yCoord: yCoordRandom,
        speed: speedRandom
      });

      if(this.starsCollection.add(starModel)) {
        starView = new APP.StarView({model: starModel});
        this.$el.find('#field').append(starView.render().el);
      };      
    };
  }
 

});


