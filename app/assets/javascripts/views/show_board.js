TrelloClone.Views.ShowBoard = Backbone.View.extend({
  template: JST["boards/show"],

  render: function() {
    var content = this.template({
      board: this.model
    });

    this.$el.html(content);
    return this;
  },

  events: {
    "click button#new-list-form": "newListForm",
    "submit form#new-list-form": "submitNewList"
  },

  newListForm: function(event) {
    var form = JST["lists/new"];
    var content = form({
      board: this.model
    });

    if (this.$("form").length === 0) {
      this.$el.append(content);
    }
  },

  submitNewList: function(event) {
    event.preventDefault();

    var attrs = $(event.target).serializeJSON();

    var lists = new TrelloClone.Collections.Lists();
    var list = new TrelloClone.Models.List();

    console.log(lists);

    list.set(attrs);

    lists.create(list, {
      success: function() {
        Backbone.history.navigate("boards", { trigger: true })
      }
    });
  }
});