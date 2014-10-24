TrelloClone.Collections.Lists = Backbone.Collection.extend({
  url: "api/lists", //idk
  model: TrelloClone.Models.List,
  comparator: function(list){
    return list.get("ord");
  }
});