define([
    'backbone',
    'backbone.basicauth'
],

function(Backbone) {
    //var urlRoot = 'api/';
    var urlRoot = 'https://baas.kinvey.com/appdata/kid_VTfo6Ts8j5/';

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
        },
        parse: function(resp) {
            resp.id = resp._id;
            return resp;
        }
    });

    Data.Animals.Collection = Backbone.Collection.extend({
        model: Data.Animals.Model,
        url: urlRoot + 'animals'
    });

    return Data;

});