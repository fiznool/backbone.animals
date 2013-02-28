define([
    'backbone',
    'modules/list',
    'modules/detail'
], function(Backbone, List, Detail) {

        var Router = Backbone.Router.extend({
            routes: {
                '!/animals': 'listView',
                '!/animals/:id': 'detailView',
                '': 'listView'
            },

            initialize: function(options) {
                this.$el = $(options.el);
                this.currentView = new Backbone.View();
            },

            changeView: function(newView) {
                this.currentView.stopListening();
                this.currentView.off('render');

                this.currentView = newView;

                this.currentView.on('render', function(view) {
                    this.$el.html(view.el);
                }, this);
            },

            listView: function() {
                var listData = new List.Collection();
                var listView = new List.View({ collection: listData });

                this.changeView(listView);
                listData.fetch();
            },

            detailView: function(id) {
                var detailData = new Detail.Model({ id: id });
                var detailView = new Detail.View({ model: detailData });

                this.changeView(detailView);
                detailData.fetch();
            }
        });

        return Router;
});