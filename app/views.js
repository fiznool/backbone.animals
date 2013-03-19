define([
    'backbone'
],

function(Backbone) {

    // To save us repeating ourselves.
    var BaseView = Backbone.View.extend({
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    var Views = {};

    Views.Headerbar = BaseView.extend({
        template: _.template('<h1 class="headerbar-title"><%- title %></h1>'),

        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        }
    });

    Views.ListItem = BaseView.extend({
        tagName: 'li',
        template: _.template('<a href="#!/animals/<%- id %>"><%- name %></a>')
    });

    Views.List = BaseView.extend({
        tagName: 'ul',
        className: 'list',
        attributes: {
            'data-tap': 'list'
        },

        initialize: function() {
            this.listenTo(this.collection, 'reset', this.render);
        },

        render: function() {
            this.$el.empty();
            this.collection.each(this.renderOne, this);
            return this;
        },

        renderOne: function(item) {
            var itemView = new Views.ListItem({ model: item });
            itemView.render();
            this.$el.append(itemView.el);
        }
    });

    Views.Detail = BaseView.extend({
        className: 'detail',
        template: _.template('<div class="img-wrapper"><img src="<%- img %>"></div><p><%- description %></p>')
    });

    return Views;

});