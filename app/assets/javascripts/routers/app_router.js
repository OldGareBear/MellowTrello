TrelloClone.Routers.AppRouter = Backbone.Router.extend({
  initialize: function(boards, $mainEl) {
    this.boards = boards;
    this.$mainEl = $mainEl;
  },

  routes: {
    "boards": "indexBoards",
    "board/:id": "showBoard",
    "boards/new": "newBoards"
  },

  indexBoards: function() {
    var indexBoardsView = new TrelloClone.Views.IndexBoards({
      collection: this.boards
    });

    this.$mainEl.html(indexBoardsView.render().$el)
  },

  newBoards: function() {
    var post = new TrelloClone.Models.Board();

    var newBoardsView = new TrelloClone.Views.NewBoards({
      collection: this.boards,
      model: post
    });

    this.$mainEl.html(newBoardsView.render().$el)
  },

  showBoard: function(id) {
    //
  }
});