TrelloClone.Routers.AppRouter = Backbone.Router.extend({
  initialize: function(boards, $mainEl) {
    this.boards = boards;
    this.$mainEl = $mainEl;
  },

  routes: {
    "": "indexBoards",
    "boards/new": "newBoards",
    "boards/:id": "showBoard"
  },

  indexBoards: function() {
    this.boards.fetch();

    var indexBoardsView = new TrelloClone.Views.IndexBoards({
      collection: this.boards
    });

    this.$mainEl.html(indexBoardsView.render().$el)
  },

  newBoards: function() {
    var board = new TrelloClone.Models.Board();

    var newBoardsView = new TrelloClone.Views.NewBoards({
      collection: this.boards,
      model: board
    });

    this.$mainEl.html(newBoardsView.render().$el)
  },

  showBoard: function(id) {
    var board = this.boards.getOrFetch(id);

    var showBoardView = new TrelloClone.Views.ShowBoard({
      collection: this.boards,
      model: board
    });

    this.$mainEl.html(showBoardView.render().$el);
  }
});