define([
    'backbone'
],

function(Backbone) {
    //var urlRoot = 'api/';
    var urlRoot = 'http://localhost:2403/';
    var imgRoot = 'api/images/';

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
            resp.img = imgRoot + resp.img;
            return resp;
        }
    });

    Data.Animals.Collection = Backbone.Collection.extend({
        model: Data.Animals.Model,
        url: urlRoot + 'animals'
    });

    return Data;

});