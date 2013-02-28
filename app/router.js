define([
    'backbone',
    'viewmanager',
    'modules/headerbar',
    'modules/list',
    'modules/detail'
], function(Backbone, ViewManager, Headerbar, List, Detail) {

    var Router = Backbone.Router.extend({
        routes: {
            '!/animals': 'listView',
            '!/animals/:id': 'detailView',
            '': 'listView'
        },

        initialize: function(options) {
            this.viewManager = new ViewManager(options.main);
            this.headerbar = new Headerbar.View({ el: options.header });
        },

        _changeView: function(newView) {
            var self = this;
            this.viewManager.changeView(newView, function() {
                self.headerbar.model.set({ title: newView.title() });
            });
        },

        listView: function() {
            this._changeView(new List.View());
        },

        detailView: function(id) {
            this._changeView(new Detail.View({ id: id }));
        }
    });

    return Router;
});