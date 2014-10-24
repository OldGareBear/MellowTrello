TrelloClone.Views.IndexCards = Backbone.View.extend({
  template: JST["cards/index"],

  render: function() {
    var content = this.template({
      cards: this.collection
    });

    this.$el.html(content);

    return this;
  }
});