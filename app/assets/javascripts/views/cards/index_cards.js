TrelloClone.Views.IndexCards = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.collection, "add sync destroy", this.render)
	},
	
  template: JST["cards/index"],
	
	className: "cards-index",

  render: function() {
		//debugger //stops 9 times on page load with 3 lists; this.collection is length 0 always
    var content = this.template({
      cards: this.collection
    });

    this.$el.html(content);

    return this;
  }
});