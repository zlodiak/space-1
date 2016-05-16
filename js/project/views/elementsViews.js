
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


APP.PlayerRocketView = Backbone.View.extend({  

  initialize: function() {  
    var self = this;

    APP.playerRocketCollection.add(this._modelCreate());

    $('#' + APP.fieldView.id).append(this.render().el);   

    this._rocketsDecrement();

    setInterval(function() {
      self._move()
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

    APP.infoLineView.addMessage('Берегите ракеты!');
  }  

});


APP.StarView = Backbone.View.extend({  

  initialize: function() {   
    var self = this;

    APP.starsCollection.add(this._modelCreate());

    $('#' + APP.fieldView.id).append(this.render().el);    

    setInterval(function() {
      self._move()
    }, APP.TIME_UNIT_MS);          

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
  },

  _move: function() {   
    var speed = this.model.get('speed'),
        xCoord = this.model.get('xCoord'),
        xCoordNew =   xCoord - speed,
        fieldWidth =  this.$el.parent().width(),
        fieldHeight = this.$el.parent().height();

    if(xCoordNew > 0) { 
      this.model.set({xCoord: xCoordNew});
    } else {  
      this.model.set({
        xCoord: fieldWidth,
        yCoord: APP.helper.randomIntFromZero(fieldHeight),
      });
    };        
  }, 

  _modelCreate: function() {
    var starSpeedMax = 3,
        starSpeedMin = 0,
        fieldWidth = $('#' + APP.fieldView.id).width(),
        fieldHeight = $('#' + APP.fieldView.id).height(),        
        xCoordRandom =  APP.helper.randomIntFromZero(fieldWidth),
        yCoordRandom =  APP.helper.randomIntFromZero(fieldHeight),
        speedRandom =   APP.helper.randomIntFromInterval(starSpeedMin, starSpeedMax);

    this.model = new APP.StarModel({
      xCoord: xCoordRandom,
      yCoord: yCoordRandom,
      speed: speedRandom
    });   

    return this.model;
  }  

});


APP.StoneView = Backbone.View.extend({    

  initialize: function() {  
    var self = this;

    APP.stonesCollection.add(this._modelCreate());

    $('#' + APP.fieldView.id).append(this.render().el);    

/*    setInterval(function() {
      self._move()
    }, APP.TIME_UNIT_MS);          

    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.destroyElem);*/
  },

  className: 'stone',

  render: function() {    
    this.$el.addClass(this.model.get('shapeClass'));

    this.$el.css({
      width: this.model.get('size'),
      height: this.model.get('size'),
      top: this.model.get('yCoord'),
      left: this.model.get('xCoord')
    }).html();   

    return this;
  },

  destroyElem: function() {   
    this.$el.remove();
  },

  _move: function() {   
    var speed = this.model.get('speed'),
        xCoord = this.model.get('xCoord'),
        xCoordNew =   xCoord - speed,
        fieldWidth =  this.$el.parent().width(),
        fieldHeight = this.$el.parent().height();

    if(xCoordNew > 0) { 
      this.model.set({xCoord: xCoordNew});
    } else {  
      this.model.set({
        xCoord: fieldWidth,
        yCoord: APP.helper.randomIntFromZero(fieldHeight),
      });
    };        
  }, 

  _modelCreate: function() {  
    var fieldWidth = $('#' + APP.fieldView.id).width(),
        fieldHeight = $('#' + APP.fieldView.id).height(); 

    var sizesArr = [20, 40, 60],      
        sizesCnt =  sizesArr.length,      
        sizeIndex =  APP.helper.randomIntFromZero(sizesCnt),
        size = sizesArr[sizeIndex];

    var shapesClassArr = ['stone_0', 'stone_1', 'stone_2', 'stone_3'],      
        shapesClassCnt =  shapesClassArr.length,      
        shapeClassIndex =  APP.helper.randomIntFromZero(shapesClassCnt),
        shapeClass = shapesClassArr[shapeClassIndex];

    var xCoordRandom =  APP.helper.randomIntFromZero(fieldWidth),
        yCoordRandom =  APP.helper.randomIntFromZero(fieldHeight);

    this.model = new APP.StoneModel({
      xCoord: xCoordRandom,
      yCoord: yCoordRandom,
      shapeClass: shapeClass,
      size: size
    });   

    //console.log(this.model, '-----')

    return this.model;
  }  

});




