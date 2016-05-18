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





