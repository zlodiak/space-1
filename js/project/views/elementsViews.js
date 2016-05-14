
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
    'keydown': 'move'
  },  

  move: function(e) { console.log('mmm')
    if(e.keyCode == 32) { 
      if(!this._checkPlayerRocketsCnt()) { return };

      var playerShipWidth = this.$el.find('#player').width(),
          playerShipHeight = this.$el.find('#player').height(),
          playerRocketModel = new APP.PlayerRocketModel({
            xCoord: this.playerModel.get('xCoord') + playerShipWidth - 5,
            yCoord: this.playerModel.get('yCoord') + playerShipHeight -7
          });

      if(this.playerRocketCollection.add(playerRocketModel)) {
        var playerRocket = new APP.PlayerRocketView({model: playerRocketModel}),
            playerRocketsCnt = this.playerModel.get('rockets');

        this.$el.find('#field').append(playerRocket.render().el);

        playerRocketsCnt--;
        this.playerModel.set({rockets: playerRocketsCnt});

        this.infoLineView.addMessage('fire');
      };
    } else {
      var newCoords = this._computeCoords(e.keyCode);

      this.playerModel.set({
        xCoord: newCoords.xCoord,
        yCoord: newCoords.yCoord
      });      
    };
  },

  _checkPlayerRocketsCnt: function() { 
    var playerRocketsCnt = this.playerModel.get('rockets'),
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
  }  

});


APP.PlayerRocketView = Backbone.View.extend({  

  initialize: function() {     
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
  }

});


APP.StarView = Backbone.View.extend({  

  initialize: function() {       
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.destroyElem);
  },

  className: 'star',

  render: function() {    
    this.$el.css({
      top: this.model.get('yCoord'),
      left: this.model.get('xCoord')
    }).html();   

    return this;
  },

  destroyElem: function() {   
    this.$el.remove();
  }

});



