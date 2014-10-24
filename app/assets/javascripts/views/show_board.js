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

    var that = this;
    this.lists.forEach(function(list) {
      var newView = new TrelloClone.Views.IndexCards({
        collection: list.cards()
      });
      this.$('.insert-cards').html(newView.render().$el);
      that.subViews.push(newView);
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
    "click button.new-card": "newCardForm"
  },

  newListForm: function(event) {
    var form = JST["lists/new"];
    var content = form({
      board: this.model
    });

    if (this.$("form.new-list").length === 0) {
      this.$el.append(content);
    } else {
      this.$("form.new-list").remove();
    }
  },

  submitNewList: function(event) {
    event.preventDefault(); // not really necessary

    var attrs = $(event.target).serializeJSON();
    var list = new TrelloClone.Models.List();
    list.set(attrs);

    this.lists.create(list);
  },

  newCardForm: function(event) {
    console.log("the newCardForm even has triggered");
    event.preventDefault(); // not really necessary
    // get list from id of div containing the button
    var list_id = $(event.target).parent().attr("id");
    var list = this.lists.get(list_id);
    console.log("list" + list);

    var form = JST["cards/new"];
    var content = form({
      list: list
    });
    console.log("form" + form)

    this.$("div.one-list#"+list_id).append(content);
  }
});