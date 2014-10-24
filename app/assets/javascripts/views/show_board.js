TrelloClone.Views.ShowBoard = Backbone.View.extend({
  initialize: function() {
    this.subViews = [];
    this.lists = this.model.lists();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.lists, "add sync", this.render);
  },

  template: JST["boards/show"],

  className: "display-lists",

  render: function() {
    var content = this.template({
      board: this.model
    });

    this.$el.html(content);

    this.lists.forEach(function(list) {
      var newView = new TrelloClone.Views.IndexCards({
        collection: list.cards()
      });
      this.$('.insert-cards').html(newView.render().$el);
      this.subViews.push(newView);
    });

    return this;
  },

  remove: function () {
    _(this.subViews).each(function (view) {
      view.remove();
    });

    Backbone.View.prototype.remove.call(this);
    this.remove()
  },

  events: {
    "click button.new-list": "newListForm",
    "submit form.new-list": "submitNewList",
    "click button.destroy-list": "destroyList",
    "click button.new-card": "newCardForm"
  },

  newListForm: function(event) {
    console.log("wtf?")
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
    var list = new TrelloClone.Models.List();
    list.set(attrs);

    this.lists.create(list);
  },

  destroyList: function(event) {
    event.preventDefault();

    var id = $(event.target).attr("id");
    var list = this.lists.get(id);
    list.destroy();
  },

  newCardForm: function(event) {
    alert("you're adding a card. Cool!")
  }
});