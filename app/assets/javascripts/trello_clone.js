window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $mainEl = $("div#main")

    var boards = new TrelloClone.Collections.Boards();
    boards.fetch();

    new TrelloClone.Routers.AppRouter(boards, $mainEl);
    Backbone.history.start(boards);
  }
};

$(TrelloClone.initialize);
