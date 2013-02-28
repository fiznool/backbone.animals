define([
        'backbone'
    ],
    function(Backbone) {

        var List = {};

        List.Model = Backbone.Model.extend({
            defaults: {
                id: null,
                name: ''
            }
        });

        List.Collection = Backbone.Collection.extend({
            model: List.Model,
            url: 'api/animals'
        });

        List.ItemView = Backbone.View.extend({
            tagName: 'li',
            template: _.template('<a href="#!/animals/<%- id %>"><%- name %></a>'),

            render: function() {
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            }

        });

        List.View = Backbone.View.extend({
            tagName: 'ul',
            className: 'list',
            attributes: {
                'data-tap': 'list'
            },

            initialize: function() {
                this.data = this.collection = this.collection || new List.Collection();
                //this.updateHeaderbar('Animals');  // TODO add translation
                this.startListening();
            },

            startListening: function() {
                this.listenTo(this.collection, 'reset', this.render);
            },

            render: function() {
                this.collection.each(this.renderOne, this);
                this.trigger('render', this);
                return this;
            },

            renderOne: function(item) {
                var itemView = new List.ItemView({ model: item });
                itemView.render();
                this.$el.append(itemView.el);
            }

        });

        return List;

});