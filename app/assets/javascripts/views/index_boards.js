TrelloClone.Views.IndexBoards = Backbone.View.extend({
  initialize: function() {
    // install listeners
  },

  template: JST["boards/index"],

  render: function() {
    var content = this.template({
      boards: this.collection
    });

    this.$el.html(content)
    return this
  }
});