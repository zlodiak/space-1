APP.SpaceView = Backbone.View.extend({  

  initialize: function() {   
    var self = this;

    this.playerModel =    new APP.PlayerModel();

    this.infoLineView =   new APP.InfolineView();
    this.fieldView =      new APP.FieldView();
    this.informerView =   new APP.InformerView({model: this.playerModel});
    this.playerShipView = new APP.PlayerShipView({model: this.playerModel});

    this.playerRocketCollection = new APP.PlayerRocketsCollection();

    this.render();    

    this.$el.attr('tabindex', 1).focus();    

    setInterval(function() {
      self.makeMoves(self.playerRocketCollection)
    }, 100);
  },    

  template: _.template($('#spaceTpl').html()),

  render: function() {    
    this.$el.html(this.template());  
    this.$el.find('#informerWrap').html(this.informerView.render().el);  
    this.$el.find('#infoLineWrap').html(this.infoLineView.render().el);  
    this.$el.find('#fieldWrap').html(this.fieldView.render().el);  

    this.$el.find('#field').append(this.playerShipView.render().el);  

    return this;
  },

  events: {
    'keydown': 'move'
  },  

  move: function(e) { 
    if(e.keyCode == 32) { //console.log('fire') 
      var playerShipWidth = this.$el.find('#player').width(),
          playerRocketModel = new APP.PlayerRocketModel({
            xCoord: this.playerModel.get('xCoord') + playerShipWidth - 5,
            yCoord: this.playerModel.get('yCoord') + 13
          });

      if(this.playerRocketCollection.add(playerRocketModel)) {
        var playerRocket = new APP.PlayerRocketView({model: playerRocketModel});
        this.$el.find('#field').append(playerRocket.render().el);
      };

      //console.log('rc2', this.playerRocketCollection)

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

    var topBoundCoord = 0,
        leftBoundCoord = 0,    
        bottomBoundCoord = this.$el.find('#field').height() - 20,
        rightBoundCoord = this.$el.find('#field').width() - 50;

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

  makeMoves: function(playerRocketCollection) { console.log('mm')
    //console.log('makeMoves', playerRocketCollection)

    playerRocketCollection.each(function(model) { 
        var xCoord = model.get('xCoord'),
            xCoordNew = xCoord + 10;

        model.set({xCoord: xCoordNew});
    });



  }
 

});


APP.InformerView = Backbone.View.extend({  

  template: _.template($('#informerTpl').html()),

  render: function() {    
    this.$el.html(this.template());      
    return this;
  }

});


APP.InfolineView = Backbone.View.extend({  

  template: _.template($('#infoLineTpl').html()),

  render: function() {    
    this.$el.html(this.template());      
    return this;
  }

});


APP.FieldView = Backbone.View.extend({  

  className: 'field',

  id: 'field',

  render: function() {    
    this.$el.html();      
    return this;
  }

});


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
  }

});


APP.PlayerRocketView = Backbone.View.extend({  

  initialize: function() {     
    this.listenTo(this.model, 'change', this.render);
  },

  className: 'player_rocket',

  id: 'playerRocket',

  render: function() {    
    this.$el.css({
      top: this.model.get('yCoord'),
      left: this.model.get('xCoord')
    }).html();   

    return this;
  }

});





