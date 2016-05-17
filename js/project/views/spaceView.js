APP.SpaceView = Backbone.View.extend({  

  initialize: function() {   
    var self = this;

    APP.TIME_UNIT_MS = 100;
    APP.STARS_CNT = 100;
    APP.STONES_CNT = 10;

    this._modelsInitialize();
    this._collectionsInitialize();
    this._viewsInitialize();

    if(this.render()) {
      this._starsInitialize();    
      this._stonesInitialize();    
    };        

    $('body').on('click', function() {
      self._setFocus('player');
    });      

    APP.infoLineView.addMessage('Полёт нормальный');
  },    

  template: _.template($('#spaceTpl').html()),

  render: function() {    
    this.$el.html(this.template());  
    this.$el.find('#informerWrap').html(this.informerView.el);  
    this.$el.find('#infoLineWrap').html(APP.infoLineView.render().el);  
    this.$el.find('#fieldWrap').html(APP.fieldView.render().el);  

    this.$el.find('#field').append(APP.playerShipView.render().el);  
    this._setFocus('player');

    return this;
  },

  _setFocus: function(elemId) { 
    this.$el.find('#' + elemId).attr('tabindex', 1).focus(); 
  },

  _starsInitialize: function() {   
    for(var i = 0; i < APP.STARS_CNT; i++) {
      new APP.StarView();
    };
  },

  _stonesInitialize: function() {   
    for(var i = 0; i < APP.STONES_CNT; i++) {
      new APP.StoneView();
    };
  },  

  _modelsInitialize: function() { 
    APP.playerModel = new APP.PlayerModel();
  },

  _collectionsInitialize: function() { 
    APP.playerRocketCollection =  new APP.PlayerRocketsCollection();
    APP.starsCollection =         new APP.StarsCollection();    
    APP.stonesCollection =        new APP.StonesCollection();    
    this.infolinesCollection =    new APP.InfolinesCollection();
  },

  _viewsInitialize: function() { 
    APP.infoLineView =   new APP.InfolineView({collection: this.infolinesCollection});
    APP.fieldView =      new APP.FieldView();
    this.informerView =  new APP.InformerView({model: APP.playerModel});
    APP.playerShipView = new APP.PlayerShipView({model: APP.playerModel});
  },

  _gameOver: function() { 
    alert('Вы погибли');
  }    
 
});


