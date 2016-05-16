APP.PlayerRocketsCollection = Backbone.Collection.extend({

  model: APP.PlayerRocketModel

});

APP.EnemiesCollection = Backbone.Collection.extend({

  model: APP.EnemyModel,

});


APP.StarsCollection = Backbone.Collection.extend({

  model: APP.StarModel,

});


APP.InfolinesCollection = Backbone.Collection.extend({

  model: APP.InfoMessageModel,

});


APP.StonesCollection = Backbone.Collection.extend({

  model: APP.StoneModel,

});