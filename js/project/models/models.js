APP.PlayerModel = Backbone.Model.extend({

  defaults: {
    rockets: 100,
    energy: 100,
    speed: 10,
    score: 0,
    xCoord: undefined,
    yCoord: undefined    
  }        

});


APP.EnemyModel = Backbone.Model.extend({

  defaults: {
    xCoord: undefined,
    yCoord: undefined
  }        

});


APP.RocketModel = Backbone.Model.extend({
  
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

