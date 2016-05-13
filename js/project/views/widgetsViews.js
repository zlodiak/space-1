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


APP.FieldView = Backbone.View.extend({  

  className: 'field',

  id: 'field',

  render: function() {    
    this.$el.html();      
    return this;
  }

});


APP.InfolineView = Backbone.View.extend({  

  initialize: function() {   
    this.idInfoMessage = 0;
    this.listenTo(this.collection, 'add', this._displayMessage); 
  },  

  className: 'info_line',

  id: 'infoLine',

  render: function() {    
    this.$el.html();      
    return this;
  },

  addMessage: function(message) {   console.log('addMessage')
    this.idInfoMessage++;

    var infoMessageModel = new APP.InfoMessageModel({
      idInfoMessage: this.idInfoMessage,
      message: message
    });

    this.collection.add(infoMessageModel);
  },

  _displayMessage: function() {   
    var messageModel = this.collection.findWhere({idInfoMessage: this.idInfoMessage}),
        messageText = messageModel.get('message'),
        infomessageView = new APP.InfomessageView(messageText, this.idInfoMessage),
        messageElem = infomessageView.render().el;

    this.$el.append(messageElem);
  }

});


APP.InfomessageView = Backbone.View.extend({  

  initialize: function(messageText, idInfoMessage) {   
    this.messageText = messageText;
    this.idInfoMessage = idInfoMessage;
  },    

  tagName: 'span',

  className: 'info_message',

  render: function() {    
    this.$el.html(this.messageText).attr('data-id-info-message', this.idInfoMessage);      
    return this;
  }

});