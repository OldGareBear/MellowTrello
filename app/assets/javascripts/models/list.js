TrelloClone.Models.List = Backbone.Model.extend({
  parse: function(resp) {
    if (resp.cards) {
      this.cards().set(resp.cards, { parse: true });
      delete resp.cards;
    }
    return resp;
  },

  cards: function() {
    if (!this._cards) {
      this._cards = new TrelloClone.Collections.Cards([], {
        list: this
      });
    }
    return this._cards;
  },

  nextOrd: function() {
    return this._cards.length + 1;
  }
});