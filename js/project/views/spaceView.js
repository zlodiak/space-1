APP.SpaceView = Backbone.View.extend({  

  initialize: function() {   
    var self = this;

    APP.TIME_UNIT_MS = 100;
    APP.STARS_CNT = 100;

    this.playerModel =    new APP.PlayerModel();

    APP.playerRocketCollection = new APP.PlayerRocketsCollection();
    this.infolinesCollection = new APP.InfolinesCollection();
    APP.starsCollection = new APP.StarsCollection();    

    APP.infoLineView =   new APP.InfolineView({collection: this.infolinesCollection});
    this.fieldView =      new APP.FieldView();
    this.informerView =   new APP.InformerView({model: this.playerModel});
    this.playerShipView = new APP.PlayerShipView({model: this.playerModel});

    if(this.render()) {
      this._starsInitialize();  

      setInterval(function() {
        self._makeMoves()
      }, APP.TIME_UNIT_MS);   
    };    

    APP.infoLineView.addMessage('sstart');
  },    

  template: _.template($('#spaceTpl').html()),

  render: function() {    
    this.$el.html(this.template());  
    this.$el.find('#informerWrap').html(this.informerView.el);  
    this.$el.find('#infoLineWrap').html(APP.infoLineView.render().el);  
    this.$el.find('#fieldWrap').html(this.fieldView.render().el);  

    this.$el.find('#field').append(this.playerShipView.render().el);  
    this.$el.find('#player').attr('tabindex', 1).focus();  

    return this;
  },

  _makeMoves: function() { 
    this._playerRocketsMoves(this);
    //this._starsMoves(this);    
  },

  _playerRocketsMoves: function(self) {  
    APP.playerRocketCollection.each(function(model) {     
      if(!model) { return };

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
    APP.starsCollection.each(function(model) { 
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
    for(var i = 0; i < APP.STARS_CNT; i++) {
      new APP.StarView(this.fieldView.id);
    };
  }
 

});


