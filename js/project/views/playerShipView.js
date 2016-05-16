APP.PlayerShipView = Backbone.View.extend({  

  initialize: function() {       
    this.listenTo(this.model, 'change', this.render);
  },

  className: 'player',

  id: 'player',

  render: function() {    
    this.$el.css({
      top: this.model.get('yCoord'),
      left: this.model.get('xCoord')
    }).html();   

    return this;
  },

  events: {
    'keydown': 'action'
  },  

  action: function(e) { 
    if(e.keyCode == 32) { 
      if(!this._checkPlayerRocketsCnt()) { 
        APP.infoLineView.addMessage('Ракеты кончились :(');
        return; 
      };

      new APP.PlayerRocketView();
    } else {
      var newCoords = this._computeCoords(e.keyCode);

      this.model.set({
        xCoord: newCoords.xCoord,
        yCoord: newCoords.yCoord
      });      
    };
  },

  _checkPlayerRocketsCnt: function() { 
    var playerRocketsCnt = this.model.get('rockets'),
        result;
    
    if(playerRocketsCnt <= 0) { 
      result = false;
    } else {      
      result = true;
    };

    return result;
  },

  _computeCoords: function(keyCode) { 
    var yCoordNew,
        xCoordNew,
        yCoord =  this.model.get('yCoord'),
        xCoord =  this.model.get('xCoord'),
        speed =   this.model.get('speed');

    var playerShipWidth = this.$el.width(),
        playerShipHeight = this.$el.height();        

    var topBoundCoord = 0,
        leftBoundCoord = 0,    
        bottomBoundCoord = this.$el.parent().height() - playerShipHeight,
        rightBoundCoord = this.$el.parent().width() - playerShipWidth;

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
  }  

});