APP.SpaceView = Backbone.View.extend({  

  initialize: function() {   
    this.informerView = new APP.InformerView();
    this.infoLineView = new APP.InfolineView();
    this.fieldView = new APP.FieldView();

    this.playerModel = new APP.PlayerModel();
    this.playerView = new APP.PlayerView({model: this.playerModel});

    this.render();
  },    

  template: _.template($('#spaceTpl').html()),

  render: function() {    
    this.$el.html(this.template());  
    this.$el.find('#informerWrap').html(this.informerView.render().el);  
    this.$el.find('#infoLineWrap').html(this.infoLineView.render().el);  
    this.$el.find('#fieldWrap').html(this.fieldView.render().el);  

    this.$el.find('#field').append(this.playerView.render().el);  

    return this;
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


APP.PlayerView = Backbone.View.extend({  

  className: 'player',

  id: 'player',

  render: function() {    
    this.$el.html();      
    return this;
  }

});





