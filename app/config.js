require.config({

    deps: ["main"],

    paths: {
        "jquery": "../assets/js/jquery",
        "underscore": "../assets/js/underscore",
        "backbone": "../assets/js/backbone",
        "backbone.basicauth": "../assets/js/backbone.basicauth",
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
        "backbone.basicauth": {
            "deps": [ "backbone" ],
            "exports": "Backbone"
        },
        "tappivate": {
            "deps": [ "jquery" ]
        }
    }

});