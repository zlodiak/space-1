APP.SpaceView = Backbone.View.extend({  

  initialize: function() {   

    this.render();
  },    

  template: _.template($('#spaceTpl').html()),

  render: function () {    
    this.$el.html(this.template());  
    this.$el.find('#fieldContainer').html(this.fieldView.render().el);  
    return this;
  }

});

