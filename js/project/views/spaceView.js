APP.SpaceView = Backbone.View.extend({  

  initialize: function() {   
    var self = this;

    APP.TIME_UNIT_MS = 100;
    APP.STARS_CNT = 100;

    this.playerModel =    new APP.PlayerModel();

    APP.playerRocketCollection =  new APP.PlayerRocketsCollection();
    APP.starsCollection =         new APP.StarsCollection();    
    this.infolinesCollection =    new APP.InfolinesCollection();

    APP.infoLineView =    new APP.InfolineView({collection: this.infolinesCollection});
    this.fieldView =      new APP.FieldView();
    this.informerView =   new APP.InformerView({model: this.playerModel});
    this.playerShipView = new APP.PlayerShipView({model: this.playerModel});

    if(this.render()) {
      this._starsInitialize();  

      setInterval(function() {
        self._makeMoves()
      }, APP.TIME_UNIT_MS);   
    };    

    APP.infoLineView.addMessage('Полёт нормальный');

    $('body').on('click', function() {
      self._setFocus('player');
    });
  },    

  template: _.template($('#spaceTpl').html()),

  render: function() {    
    this.$el.html(this.template());  
    this.$el.find('#informerWrap').html(this.informerView.el);  
    this.$el.find('#infoLineWrap').html(APP.infoLineView.render().el);  
    this.$el.find('#fieldWrap').html(this.fieldView.render().el);  

    this.$el.find('#field').append(this.playerShipView.render().el);  
    this._setFocus('player');

    return this;
  },

  _setFocus: function(elemId) { 
    this.$el.find('#' + elemId).attr('tabindex', 1).focus(); 
  },

  _makeMoves: function() { 
    this._playerRocketsMoves(this);   
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

  _starsInitialize: function() {   
    for(var i = 0; i < APP.STARS_CNT; i++) {
      new APP.StarView(this.fieldView.id);
    };
  }
 

});


