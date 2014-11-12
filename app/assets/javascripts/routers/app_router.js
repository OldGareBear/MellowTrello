TrelloClone.Routers.AppRouter = Backbone.Router.extend({
  initialize: function(boards, $mainEl) {
    this.boards = boards;
    this.$mainEl = $mainEl;
  },

  routes: {
    "": "indexBoards",
    "boards/new": "newBoards",
    "boards/:id": "showBoard",
    "boards/:id/new": "newList"
  },

  indexBoards: function() {
    TrelloClone.boards.fetch();
    console.log(TrelloClone.boards);

    var indexBoardsView = new TrelloClone.Views.IndexBoards({
      collection: this.boards
    });

    this._swapView(indexBoardsView);
  },

  newBoards: function() {
    var board = new TrelloClone.Models.Board();

    var newBoardsView = new TrelloClone.Views.NewBoards({
      collection: this.boards,
      model: board
    });

    this._swapView(newBoardsView);
  },

  showBoard: function(id) {
    var board = this.boards.getOrFetch(id);

    var showBoardView = new TrelloClone.Views.ShowBoard({
      collection: this.boards,
      model: board
    });

    this._swapView(showBoardView);
  },

  listNew: function(id) {
    var board = TrelloClone.boards.getOrFetch(id);
    var newListView = new TrelloClone.Views.NewList({
      model: board
    })
    this._swapView(newListView);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$mainEl.html(view.render().$el);

  }
});
