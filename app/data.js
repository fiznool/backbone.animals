define([
    'backbone',
    'backbone.basicauth;'
],

function(Backbone) {
    var urlRoot = 'api/';

    Backbone.BasicAuth.set('animals', 'animals');

    var Data = {
        Headerbar: {},
        Animals: {}
    };

    Data.Headerbar.Model = Backbone.Model.extend({
        defaults: {
            title: ''
        }
    });

    Data.Animals.Model = Backbone.Model.extend({
        defaults: {
            name: '',
            description: '',
            img: ''
        }
    });

    Data.Animals.Collection = Backbone.Collection.extend({
        model: Data.Animals.Model,
        url: urlRoot + 'animals'
    });

    return Data;

});