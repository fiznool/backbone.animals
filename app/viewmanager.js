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

        this.currentView = newView;

        this.currentView.render();
        this.$el.html(this.currentView.el);

    };

    return ViewManager;

});