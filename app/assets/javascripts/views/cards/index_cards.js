TrelloClone.Views.IndexCards = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.collection, "add sync destroy", this.render)
	},
	
  template: JST["cards/index"],
	
	className: "cards-index",

  render: function() {
    var content = this.template({
      cards: this.collection
    });

    this.$el.html(content);

    return this;
  },

	events: {
			"mouseover div.card": "displayCardDelete",
			"mouseleave div.card": "removeCardDelete",
			"click span.delete-button": "destroyCard"
	},

	displayCardDelete: function(event) {
		//second child of event.target should get class 'visible'
		var deleteButton = $(event.target).children().eq(0);
		deleteButton.addClass('visible')
	},
	
	removeCardDelete: function(event) {
		var deleteButton = $(event.target).children().eq(0);
		deleteButton.removeClass('visible')
	},
	
	destroyCard: function(event) {
		var card_id = $(event.target).attr("id");
		var card = this.collection.get(card_id);
		card.destroy();
	}
});