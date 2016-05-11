APP.SpaceView = Backbone.View.extend({  

  initialize: function() {   
    this.informer = new APP.InformerView();
    this.render();
  },    

  template: _.template($('#spaceTpl').html()),

  render: function () {    
    this.$el.html(this.template());  
    this.$el.find('#informerCont').html(this.informer.render().el);  

    return this;
  }

});


APP.InformerView = Backbone.View.extend({  

  template: _.template($('#informerTpl').html()),

  render: function () {    
    this.$el.html(this.template());      
    return this;
  }

});



