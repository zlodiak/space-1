
APP.StoneView = Backbone.View.extend({    

  initialize: function() {  
    var self = this;

    APP.stonesCollection.add(this._modelCreate());

    $('#' + APP.fieldView.id).append(this.render().el);    

    setInterval(function() {
      self._move()
    }, APP.TIME_UNIT_MS);          

    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.destroyElem);
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
        size = this.model.get('size'),
        xCoord = this.model.get('xCoord'),
        xCoordNew =   xCoord - speed,
        fieldWidth =  this.$el.parent().width(),
        fieldHeight = this.$el.parent().height();

    if(xCoordNew > -size) { 
      this.model.set({xCoord: xCoordNew});
    } else {  
      this.model.set({
        xCoord: fieldWidth * this.model.get('rangeHoriz'),
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
        size = sizesArr[sizeIndex],
        sizeMax = sizesArr[sizesCnt - 1];

    var shapesClassArr = ['stone_0', 'stone_1', 'stone_2', 'stone_3'],      
        shapesClassCnt =  shapesClassArr.length,      
        shapeClassIndex =  APP.helper.randomIntFromZero(shapesClassCnt),
        shapeClass = shapesClassArr[shapeClassIndex];

    var xCoordRandom =  APP.helper.randomIntFromZero(fieldWidth) * 2, // hardcode(
        yCoordRandom =  APP.helper.randomIntFromZero(fieldHeight),
        fieldHeight = $('#' + APP.fieldView.id).height();

    if(yCoordRandom > (fieldHeight - sizeMax)) {
      yCoordRandom -= sizeMax;
    };

    this.model = new APP.StoneModel({
      xCoord: xCoordRandom,
      yCoord: yCoordRandom,
      shapeClass: shapeClass,
      size: size
    });   

    return this.model;
  }  

});
