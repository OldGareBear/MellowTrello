TrelloClone.Views.NewBoards = Backbone.View.extend({
  // have access to collection and (blank) model from router

  events: {
    "submit form": "submit"
  },

  template: JST["boards/new"],

  render: function() {
    var content = this.template({
      board: this.model
    });
    this.$el.html(content);

    return this;
  },

  submit: function(event) {
    event.preventDefault();

    var attrs = $(event.target).serializeJSON();
    this.model.set(attrs);
    // no logic yet for if this view/template is for editing as well
    // when that is added, a conditional will need to go here checking
    // for whether or not this model.isNew()
    this.collection.create(this.model, {
      success: success,

      wait: true
    });

    function success() {
      Backbone.history.navigate("boards", { trigger: true })
      // redirect to index upon successful creation
      // I forget exactly what trigger:true does
    };
  }
});