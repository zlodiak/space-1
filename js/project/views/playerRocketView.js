APP.PlayerRocketView = Backbone.View.extend({  

  initialize: function() {  
    var self = this;

    APP.playerRocketCollection.add(this._modelCreate());

    $('#' + APP.fieldView.id).append(this.render().el);   

    this._rocketsDecrement();

    setInterval(function() {
      self._move();

      if(self._checkCollisPlayerStone()) {
        APP.infoLineView.addMessage('Попадание в астероид');
      };
      
    }, APP.TIME_UNIT_MS);       

    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.destroyElem);
  },

  className: 'player_rocket',

  id: 'playerRocket',

  render: function() {    
    this.$el.css({
      top: this.model.get('yCoord'),
      left: this.model.get('xCoord')
    }).html();   

    return this;
  },

  destroyElem: function() {   
    this.$el.remove();
  },

  _move: function() { 
    var xCoord = this.model.get('xCoord'),
        xCoordNew = xCoord + 10,
        fieldWidth = this.$el.parent().width(),
        playerRocketWidth = this.$el.width();

    if(xCoordNew < (fieldWidth - playerRocketWidth)) {  
      this.model.set({xCoord: xCoordNew});
    } else { 
      this.model.destroy();
    };         
  },

  _modelCreate: function() { 
    var playerShipWidth = $('#' + APP.playerShipView.id).width(),
        playerShipHeight = $('#' + APP.playerShipView.id).height();
        
        this.model = new APP.PlayerRocketModel({
          xCoord: APP.playerModel.get('xCoord') + playerShipWidth - 5,
          yCoord: APP.playerModel.get('yCoord') + playerShipHeight -7
        });

    return this.model;
  },

  _rocketsDecrement: function() { 
    var playerRocketsCnt = APP.playerModel.get('rockets');

    playerRocketsCnt--;
    APP.playerModel.set({rockets: playerRocketsCnt});    

    if(playerRocketsCnt < 10) {
      APP.infoLineView.addMessage('Берегите ракеты!');
    };    
  },

  _checkCollisPlayerStone: function() { 
    var self = this,
        result;

    APP.stonesCollection.each(function(stoneModel) { 
      var xCoord =  stoneModel.get('xCoord'),
          yCoord =  stoneModel.get('yCoord'),
          size =    stoneModel.get('size'),
          y1 = yCoord,
          y2 = yCoord + size,
          x1 = xCoord,
          x2 = xCoord + size;

      var xCoordRocket =  self.model.get('xCoord'),
          yCoordRocket =  self.model.get('yCoord'),
          widthRocket =   $('#' + self.model.id).width(),
          heightRocket =  $('#' + self.model.id).height(),
          yr1 = yCoordRocket,
          yr2 = yCoordRocket + heightRocket,
          xr1 = xCoordRocket,
          xr2 = xCoordRocket + widthRocket;     

      if((yr2 >= y1 && yr2 <= y2) && ((xr2 >= x1 && xr2 <= x2) || (xr1 <= x2 && xr2 >= x1))) {
        result = true;
      };

      if((yr1 <= y2 && yr1 >= y1) && ((xr2 >= x1 && xr2 <= x2) || (xr1 <= x2 && xr2 >= x1))) {
        result = true;
      };
    });

    return result;
  },        

});