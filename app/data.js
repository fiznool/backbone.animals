define([
    'backbone'
],

function(Backbone) {
    var urlRoot = 'api/';

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