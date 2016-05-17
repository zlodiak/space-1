APP.PlayerModel = Backbone.Model.extend({

  defaults: {
    rockets: 15,
    energy: 100,
    speed: 10,
    score: 0,
    xCoord: 10,
    yCoord: 40    
  }        

});


APP.EnemyModel = Backbone.Model.extend({

  defaults: {
    xCoord: undefined,
    yCoord: undefined
  }        

});


APP.PlayerRocketModel = Backbone.Model.extend({
  
  defaults: {
    xCoord: undefined,
    yCoord: undefined,
    damage: 20
  }        

});


APP.InformerModel = Backbone.Model.extend({
  
  defaults: {
    score: 0,
    hiScore: 10000,
    bulletsCnt: 100
  }        

});


APP.StarModel = Backbone.Model.extend({
  
  defaults: {
    xCoord: undefined,
    yCoord: undefined,
    speed: undefined
  }        

});


APP.InfoMessageModel = Backbone.Model.extend({
  
  defaults: {
    idInfoMessage: undefined,
    message: undefined
  }        

});


APP.StoneModel = Backbone.Model.extend({
  
  defaults: {
    xCoord: undefined,
    yCoord: undefined,
    shapeClass: undefined,
    size: undefined,
    speed: 4,
    rangeHoriz: 2
  }        

});


