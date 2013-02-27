require([
        'jquery',
        'backbone',
        'fastclick',
        'modules/list',
        'modules/detail',
        'tappivate'
    ],
    function($, Backbone, FastClick, List, Detail) {

        var Router = Backbone.Router.extend({
            routes: {
                '': 'listView'
            },

            initialize: function() {

            },

            changeView: function() {

            },

            listView: function() {
                var listView = new List.View();
                listView.on('render', function(view) {
                    $('#main').html(view.el);
                });

                listView.data.fetch();

            },

            detailView: function(id) {

            }
        });

        $(function() {
            // Setup FastClick to prevent 300ms button delay
            new FastClick(document.getElementById('app'));

            // Setup tappivate to mimic native button taps
            $('#app').tappivate();

            // Start the app
            var router = new Router();
            Backbone.history.start({ pushState: false });
        });

});