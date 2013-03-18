define([
    'backbone',
    'viewmanager',
    'data',
    'views'
], function(Backbone, ViewManager, Data, Views) {

    var homeTitle = 'Mysterious Animals';

    var Router = Backbone.Router.extend({
        routes: {
            '!/animals': 'listView',
            '!/animals/:id': 'detailView',
            '': 'listView'
        },

        initialize: function(options) {
            this.viewManager = new ViewManager(options.main);
            this.headerbar = new Views.Headerbar({
                el: options.header,
                model: new Data.Headerbar.Model({ title: homeTitle })
            }).render();

            this.animals = new Data.Animals.Collection();
        },

        fetchAnimals: function(options) {
            this.animals.fetch(options);
        },

        listView: function() {
            this.headerbar.model.set('title', homeTitle);

            this.viewManager.changeView(new Views.List({ collection: this.animals }));
            this.fetchAnimals();
        },

        detailView: function(id) {
            var animal = this.animals.get(id);
            if(animal) {
                this.headerbar.model.set('title', animal.get('name'));
                this.viewManager.changeView(new Views.Detail({ model: animal }));
            } else {
                this.navigate('', { trigger: true });
            }

        }
    });

    return Router;
});