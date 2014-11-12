TrelloClone.Views.NewList = Backbone.View.extend({
  template: JST["newlist"],
  events: {
    "click add-list": "addList"
  },

  render: function() {
    var newListView = this.template({
      board: this.model
    });
    debugger
    this.$el.html(newListView);
    return this;
  },

  addList: function(event) {
    event.preventDefault();
    var params = $(event.currentTarget).parent().serializeJSON()
    var newList = new TrelloClone.Models.List(params["list"]);
    var that = this;
    var lists = TrelloClone.boards.getOrFetch(params.list.board_id).lists();
    lists.create(newList, {
      success: function() {
        Backbone.history.navigate("#/boards/"+ newList.attributes.board_id, true)
      }
    });
  }

})
