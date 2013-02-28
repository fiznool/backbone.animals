require([
        'jquery',
        'backbone',
        'fastclick',
        'router',
        'tappivate'
    ],
    function($, Backbone, FastClick, Router) {

        $(function() {
            // Setup FastClick to prevent 300ms button delay
            new FastClick(document.getElementById('app'));

            // Setup tappivate to mimic native button taps
            $('#app').tappivate();

            // Start the app
            var router = new Router({
                header: '#headerbar',
                main: '#main'
            });
            Backbone.history.start({ pushState: false });
        });

});