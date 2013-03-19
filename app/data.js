define([
    'backbone',
    'backbone.basicauth'
],

function(Backbone) {
    //var urlRoot = 'api/';
    var imgRoot = 'api/images/';
    var urlRoot = 'https://baas.kinvey.com/appdata/kid_VTfo6Ts8j5/';
    //var imgRoot = 'https://baas.kinvey.com/blob/kid_VTfo6Ts8j5/upload-loc/';

    Backbone.BasicAuth.set('steve.irwin', 'crochunter');

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