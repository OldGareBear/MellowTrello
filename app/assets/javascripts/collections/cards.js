TrelloClone.Collections.Cards = Backbone.Collection.extend({
  url: "api/cards",
  model: TrelloClone.Models.List,
  comparator: function(card) {
    return card.get("ord");
  }
});