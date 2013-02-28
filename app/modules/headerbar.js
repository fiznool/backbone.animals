define([
        'backbone'
    ],
    function(Backbone) {

        var Headerbar = {};

        Headerbar.Model = Backbone.Model.extend({
            defaults: {
                title: ''
            },

            url: function() {
                return 'api/animals/' + this.get('id');
            }
        });

        Headerbar.View = Backbone.View.extend({
            template: _.template('<h1 class="headerbar-title"><%- title %></h1>'),

            initialize: function() {
                this.model = this.model || new Headerbar.Model();
                this.startListening();
            },

            startListening: function() {
                this.listenTo(this.model, 'change', this.render);
            },

            render: function() {
                this.$el.html(this.template(this.model.toJSON()));
                this.trigger('render', this);
                return this;
            },

            title: function() {
                return this.model.get('name');
            }
        });

        return Headerbar;
});