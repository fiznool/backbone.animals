define([
    'jquery',
    'backbone'
], function($, Backbone) {

    var ViewManager = function(container) {
        if (this instanceof ViewManager) {
            this.$el = $(container);
            this.currentView = new Backbone.View();
        } else {
            return new ViewManager(container);
        }
    };

    ViewManager.prototype.changeView = function(newView, onRender) {
        this.currentView.stopListening();
        this.currentView.off('render');

        this.currentView = newView;

        this.currentView.on('render', function(view) {
            this.$el.html(view.el);
            onRender();
        }, this);

        this.currentView.data.fetch();
    };

    return ViewManager;

});