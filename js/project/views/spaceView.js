APP.SpaceView = Backbone.View.extend({  

  initialize: function() {   
    var self = this;

    this.playerModel =    new APP.PlayerModel();

    this.playerRocketCollection = new APP.PlayerRocketsCollection();
    this.infolinesCollection = new APP.InfolinesCollection();
    this.starsCollection = new APP.StarsCollection();    

    this.infoLineView =   new APP.InfolineView({collection: this.infolinesCollection});
    this.fieldView =      new APP.FieldView();
    this.informerView =   new APP.InformerView({model: this.playerModel});
    this.playerShipView = new APP.PlayerShipView({model: this.playerModel});

    if(this.render()) {
      

      this._starsInitialize();  

      setInterval(function() {
        self._makeMoves(self)
      }, 100);   
    };    

    this.infoLineView.addMessage('sstart');
  },    

  template: _.template($('#spaceTpl').html()),

  render: function() {    
    this.$el.html(this.template());  
    this.$el.find('#informerWrap').html(this.informerView.el);  
    this.$el.find('#infoLineWrap').html(this.infoLineView.render().el);  
    this.$el.find('#fieldWrap').html(this.fieldView.render().el);  

    this.$el.find('#field').append(this.playerShipView.render().el);  
    this.$el.find('#player').attr('tabindex', 1).focus();  

    return this;
  },

  _makeMoves: function(self) { 
    this._playerRocketsMoves(self);
    this._starsMoves(self);    
  },

  _playerRocketsMoves: function(self) {  
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

  _starsMoves: function(self) {  
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

  _starsInitialize: function() {     
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


