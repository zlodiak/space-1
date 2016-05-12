APP.SpaceView = Backbone.View.extend({  

  initialize: function() {   
    var self = this;

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

  move: function(e) {  
    if (e.keyCode == 38) { console.log('up') };
    if (e.keyCode == 40) { console.log('down') };
    if (e.keyCode == 37) { console.log('l') };
    if (e.keyCode == 39) { console.log('r') };
    if (e.keyCode == 32) { console.log('fire') };
  },      

  events: {
    'keydown': 'move'
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

  className: 'player',

  id: 'player',

  render: function() {    
    this.$el.html();      
    return this;
  }

});





