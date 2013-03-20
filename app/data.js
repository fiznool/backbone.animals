define([
    'backbone'
],

function(Backbone) {
    //var urlRoot = 'api/';
    var apiKey = 'Q14WG6VbwprFAQn7JcaMAytxFjmw9dyXrzimg87c';
    var restKey = '13raxBKBoUbIHgNoOsRmMu9oV34MUDRk0LUFEw7c';
    var urlRoot = 'https://api.parse.com/1/classes/';
    var imgRoot = 'api/images/';

    var originalSync = Backbone.sync;

    // Override Backbone.sync for all future requests,
    // setting the Parse headers before the sync is performed.
    Backbone.sync = function(method, model, options) {
        options.headers = options.headers || {};
        _.extend(options.headers, {
            'X-Parse-Application-Id': apiKey,
            'X-Parse-REST-API-Key': restKey
        });
        return originalSync.call(model, method, model, options);
    };

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
            resp.id = resp.objectId;
            resp.img = imgRoot + resp.img;
            return resp;
        }
    });

    Data.Animals.Collection = Backbone.Collection.extend({
        model: Data.Animals.Model,
        url: urlRoot + 'animals',
        parse: function(resp) {
            return resp && resp.results;
        }
    });

    return Data;

});