require.config({

    deps: ["main"],

    paths: {
        "jquery": "../assets/js/jquery",
        "underscore": "../assets/js/underscore",
        "backbone": "../assets/js/backbone",
        "fastclick": "../assets/js/fastclick",
        "tappivate": "../assets/js/tappivate"
    },

    shim: {
        "underscore": {
            "exports": "_"
        },
        "backbone": {
            "deps": [ "underscore" ],
            "exports": "Backbone"
        },
        "tappivate": {
            "deps": [ "jquery" ]
        }
    }

});