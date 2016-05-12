APP.InformerView = Backbone.View.extend({  

  initialize: function() {     console.log('ini', this.model.get('rockets'))
    this.listenTo(this.model, 'change', this.initialize);

    this.params = {
      score: this.model.get('score'),
      rockets: this.model.get('rockets'),
      energy: this.model.get('energy'),
      speed: this.model.get('speed'),
    };

    this.render();
  },

  template: _.template($('#informerTpl').html()),

  render: function() {    
    this.$el.html(this.template(this.params));      
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
