APP.InformerView = Backbone.View.extend({  

  initialize: function() {   
    this.listenTo(this.model, 'change', this.refreshOutputData); 
    this.refreshOutputData();   
  },

  template: _.template($('#informerTpl').html()),

  render: function() {    
    this.$el.html(this.template(this.params));      
    return this;
  },

  refreshOutputData: function() {  
    this.getParams();
    this.render();
  },

  getParams: function() {    
    this.params = {
      score: this.model.get('score'),
      rockets: this.model.get('rockets'),
      energy: this.model.get('energy'),
      speed: this.model.get('speed'),
    };
  }

});


APP.InfolineView = Backbone.View.extend({  

  initialize: function() {   
    this.listenTo(this.collection, 'add', this.displayMessage); 
  },  

  template: _.template($('#infoLineTpl').html()),

  render: function() {    
    this.$el.html(this.template());      
    return this;
  },

  displayMessage: function(message) {   
    console.log('sfsdf')
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
