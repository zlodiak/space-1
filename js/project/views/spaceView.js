APP.SpaceView = Backbone.View.extend({  

  initialize: function() {   
    var self = this;

    APP.TIME_UNIT_MS = 100;
    APP.STARS_CNT = 100;
    APP.STONES_CNT = 10;

    this._modelsInitialize();
    this._collectionsInitialize();
    this._viewsInitialize();

    if(this.render()) {
      this._starsInitialize();    
      this._stonesInitialize();    
    };        

    $('body').on('click', function() {
      self._setFocus('player');
    });

    setInterval(function() {
      self._checkCollisPlayerStone();
    }, APP.TIME_UNIT_MS);           

    APP.infoLineView.addMessage('Полёт нормальный');
  },    

  template: _.template($('#spaceTpl').html()),

  render: function() {    
    this.$el.html(this.template());  
    this.$el.find('#informerWrap').html(this.informerView.el);  
    this.$el.find('#infoLineWrap').html(APP.infoLineView.render().el);  
    this.$el.find('#fieldWrap').html(APP.fieldView.render().el);  

    this.$el.find('#field').append(APP.playerShipView.render().el);  
    this._setFocus('player');

    return this;
  },

  _setFocus: function(elemId) { 
    this.$el.find('#' + elemId).attr('tabindex', 1).focus(); 
  },

  _starsInitialize: function() {   
    for(var i = 0; i < APP.STARS_CNT; i++) {
      new APP.StarView();
    };
  },

  _stonesInitialize: function() {   
    for(var i = 0; i < APP.STONES_CNT; i++) {
      new APP.StoneView();
    };
  },  

  _modelsInitialize: function() { 
    APP.playerModel = new APP.PlayerModel();
  },

  _collectionsInitialize: function() { 
    APP.playerRocketCollection =  new APP.PlayerRocketsCollection();
    APP.starsCollection =         new APP.StarsCollection();    
    APP.stonesCollection =        new APP.StonesCollection();    
    this.infolinesCollection =    new APP.InfolinesCollection();
  },

  _viewsInitialize: function() { 
    APP.infoLineView =   new APP.InfolineView({collection: this.infolinesCollection});
    APP.fieldView =      new APP.FieldView();
    this.informerView =  new APP.InformerView({model: APP.playerModel});
    APP.playerShipView = new APP.PlayerShipView({model: APP.playerModel});
  },

  _checkCollisPlayerStone: function() { 
    APP.stonesCollection.each(function(stoneModel) { 
      var xCoord =  stoneModel.get('xCoord'),
          yCoord =  stoneModel.get('yCoord'),
          size =    stoneModel.get('size'),
          y1 = yCoord,
          y2 = yCoord + size,
          x1 = xCoord,
          x2 = xCoord + size;

      var xCoordPlayer =  APP.playerModel.get('xCoord'),
          yCoordPlayer =  APP.playerModel.get('yCoord'),
          widthPlayer =    $('#player').width(),
          heightPlayer =   $('#player').height(),
          yp1 = yCoordPlayer,
          yp2 = yCoordPlayer + heightPlayer,
          xp1 = xCoordPlayer,
          xp2 = xCoordPlayer + widthPlayer;    

      if((yp2 >= y1 && yp2 <= y2) && ((xp2 >= x1 && xp2 <= x2) || (xp1 <= x2 && xp2 >= x1))) {
        APP.infoLineView.addMessage('Столкновение с астероидом!');
        //app._gameOver();
      };

      if((yp1 <= y2 && yp1 >= y1) && ((xp2 >= x1 && xp2 <= x2) || (xp1 <= x2 && xp2 >= x1))) {
        APP.infoLineView.addMessage('Столкновение с астероидом!');
        //app._gameOver();
      };
    });



  },

  _gameOver: function() { 
    alert('Вы погибли');
  }    
 
});


