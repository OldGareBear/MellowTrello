TrelloClone.Views.CardIndex = Backbone.View.extend({
  template: JST[""],

  render: function() {
    content = this.template({
      cards: this.collection
    });

    this.$el.html(content);

    return this;
  }
});