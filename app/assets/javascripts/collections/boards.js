TrelloClone.Collections.Boards = Backbone.Collection.extend({
  url: "api/boards",
  model: TrelloClone.Models.Board,

  getOrFetch: function(id) {
    var model = this.get(id);
    var posts = this;

    if(model) {
      model.fetch();
    } else {
      model = new TrelloClone.Models.Board({ id: id });
      model.fetch({
        success: function() {
          posts.add(model);
        }
      });
    }

    return model;
  }
});