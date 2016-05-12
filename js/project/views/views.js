APP.SpaceView = Backbone.View.extend({  

  initialize: function() {   
    this.playerModel =    new APP.PlayerModel();

    this.infoLineView =   new APP.InfolineView();
    this.fieldView =      new APP.FieldView();
    this.informerView =   new APP.InformerView({model: this.playerModel});
    this.playerShipView = new APP.PlayerShipView({model: this.playerModel});

    this.render();    

    this.$el.attr('tabindex', 1).focus();    
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

  move: function(e) {  console.log(11)
    if (e.keyCode == 38) {  
      var yCoord = this.playerModel.get('yCoord'),
          speed = this.playerModel.get('speed');

      yCoord -= speed;
      this.playerModel.set({yCoord: yCoord})
    };

    if (e.keyCode == 40) { 
      var yCoord = this.playerModel.get('yCoord'),
          speed = this.playerModel.get('speed');

      yCoord += speed;
      this.playerModel.set({yCoord: yCoord})
    };

    if (e.keyCode == 37) { 
      var xCoord = this.playerModel.get('xCoord'),
          speed = this.playerModel.get('speed');

      xCoord -= speed;
      this.playerModel.set({xCoord: xCoord})
    };    

    if (e.keyCode == 39) { 
      var xCoord = this.playerModel.get('xCoord'),
          speed = this.playerModel.get('speed');

      xCoord += speed;
      this.playerModel.set({xCoord: xCoord})
    };       

    if (e.keyCode == 32) { console.log('fire') };
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





