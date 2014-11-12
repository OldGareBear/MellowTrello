TrelloClone.Views.ShowBoard = Backbone.View.extend({
  initialize: function() {
    this.subViews = [];
    this.lists = this.model.lists();

    this.listenTo(this.model, "sync add change", this.render);
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

    this.lists.each(function(list) {
      var newView = new TrelloClone.Views.IndexCards({
        collection: list.cards()
      });

      this.$('div#insert-cards-' + list.id).html(newView.render().$el);
      that.subViews.push(newView);
    });

    this.$(".sortable").sortable();

    // debugger
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
    "click button.new-card": "newCardForm",
    "submit form.new-card": "submitNewCard"
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
    event.preventDefault();

    var attrs = $(event.target).serializeJSON();
    var list = new TrelloClone.Models.List();
    list.set(attrs);

    this.lists.create(list);
  },

  newCardForm: function(event) {
    var list_id = $(event.target).parent().attr("id");
    // save list as ivar; can be reused in submitNewCard
    this.list = this.lists.get(list_id);

    var form = JST["cards/new"];
    var content = form({
      list: this.list
    });

    if (this.$("form.new-card").length === 0) {
      this.$("div.one-list#"+list_id).append(content);
    } else {
      this.$("form.new-card").remove();
    }
  },

  submitNewCard: function(event) {
    event.preventDefault();

    var attrs = $(event.target).serializeJSON();
    var card = new TrelloClone.Models.Card();
    card.set(attrs);

    this.list.cards().create(card);
		this.$("form.new-card").remove();
  }
});
