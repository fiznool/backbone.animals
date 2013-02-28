define([
        'backbone'
    ],
    function(Backbone) {

        var Detail = {};

        Detail.Model = Backbone.Model.extend({
            defaults: {
                id: null,
                name: '',
                description: '',
                img: ''
            },

            url: function() {
                return 'api/animals/' + this.get('id');
            }
        });

        Detail.View = Backbone.View.extend({
            className: 'detail',

            template: _.template('<img src="<%- img %>" height="177px"><p><%- description %></p>'),

            initialize: function() {
                this.model = this.model || new Detail.Model();
                this.startListening();
            },

            startListening: function() {
                this.listenTo(this.model, 'change', this.render);
            },

            render: function() {
                this.$el.html(this.template(this.model.toJSON()));
                this.trigger('render', this);
                return this;
            }
        });

        return Detail;
});