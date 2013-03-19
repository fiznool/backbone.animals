(function(sinon, console, undefined) {

    var ENABLE_FAKE_SERVER = false;

    if(ENABLE_FAKE_SERVER) {
        // Log out Sinon statements to console
        sinon.log = console.log.bind(console);

        var server = sinon.fakeServer.create();

        // Auto respond to requests
        server.autoRespond = true;
        server.autoRespondAfter = 200;  // Increase this to model server latency

        // Response JSON
        var getAnimalsJSON = function() {
            return {
                "lion": {
                    "name": "Lion",
                    "description": "A lion can run up to 65 km/h at full speed.",
                    "img":"lion.jpg"
                },
                "hippo": {
                    "name": "Hippopotamus",
                    "description": "Hippos excrete a pink oily like substance which helps to act as a sunscreen during the day.",
                    "img": "hippo.jpg"
                },
                "elephant": {
                    "name": "Elephant",
                    "description": "Elephants can smell water from 5km away!",
                    "img": "elephant.jpg"
                },
                "crocodile": {
                    "name": "Crocodile",
                    "description": "Crocodiles can live to 100 years old.",
                    "img":"crocodile.jpg"
                },
                "komodo_dragon": {
                    "name": "Komodo Dragon",
                    "description": "The carniverous Komodo Dragon can smell blood from over 3km away!",
                    "img":"komodo_dragon.jpg"
                },
                "honey_badger": {
                    "name": "Honey Badger",
                    "description": "Honey badgers have been known to take on venom-spitting cobras - and win.",
                    "img": "honey_badger.jpg"
                }
            };
        };

        // Setup Sinon to respond accordingly
        server.respondWith('GET', /api\/animals(.+)?/, function(xhr, splat) {
            var body = getAnimalsJSON();
            var n, a = [];
            if (splat) {
                // Grab the correct animal
                body = body[splat.split('/')[1]];
                if (!body) {
                    xhr.respond(404);
                }
            } else {
                // Create an array of animals
                for (n in body) {
                    if (body.hasOwnProperty(n)) {
                        a.push({
                            'id': n,
                            'name': body[n].name,
                            'description': body[n].description,
                            'img': body[n].img
                        });
                    }
                }

                body = a;
            }

            xhr.respond(200, { contentType: 'application/json' }, JSON.stringify(body));
        });
    }



})(window.sinon, window.console);