(function(sinon, console, undefined) {

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
                "description": "The lion (Panthera leo) is one of the four big cats in the genus Panthera, and a member of the family Felidae. With some males exceeding 250 kg (550 lb) in weight,[4] it is the second-largest living cat after the tiger. Wild lions currently exist in Sub-Saharan Africa and in Asia with an endangered remnant population in Gir Forest National Park in India, having disappeared from North Africa and Southwest Asia in historic times. Until the late Pleistocene, about 10,000 years ago, the lion was the most widespread large land mammal after humans. They were found in most of Africa, across Eurasia from western Europe to India, and in the Americas from the Yukon to Peru.[5] The lion is a vulnerable species, having seen a possibly irreversible population decline of thirty to fifty percent over the past two decades in its African range.[2] Lion populations are untenable outside designated reserves and national parks. Although the cause of the decline is not fully understood, habitat loss and conflicts with humans are currently the greatest causes of concern. Within Africa, the West African lion population is particularly endangered.",
                "img":"http://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Lion_waiting_in_Namibia.jpg/250px-Lion_waiting_in_Namibia.jpg"
            },
            "honey-badger": {
                "name": "Honey Badger",
                "description": "The honey badger (Mellivora capensis), also known as the ratel, is a species of mustelid native to Africa, Southwest Asia, and the Indian Subcontinent. Despite its name, the honey badger does not closely resemble other badger species, instead it bears more anatomical similarities to weasels. It is classed as Least Concern by the IUCN owing to its extensive range and general environmental adaptations. It is primarily a carnivorous species, and has few natural predators because of its thick skin and ferocious defensive abilities.",
                "img": "http://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Honey_badger.jpg/220px-Honey_badger.jpg"
            },
            "elephant": {
                "name": "Elephant",
                "description": "Elephants are large land mammals in two extant genera of the family Elephantidae: Elephas and Loxodonta, with the third genus Mammuthus extinct.[1] Three species of elephant are recognized: the African bush elephant, the African forest elephant and the Indian or Asian elephant;[2] although some group the two African species into one[3] and some researchers also postulate the existence of a fourth species in West Africa.[4] All other species and genera of Elephantidae are extinct. Most have been extinct since the last ice age, although dwarf forms of mammoths might have survived as late as 2,000 BCE.[5] Elephants and other Elephantidae were once classified with other thick-skinned animals in a now invalid order, Pachydermata.",
                "img": "http://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/180px-African_Bush_Elephant.jpg"
            },
            "black-rhino": {
                "name": "Black Rhinoceros",
                "description": "The black rhinoceros (Diceros bicornis) is a large, thick-skinned herbivore having one or two upright horns on the nasal bridge. Rhinoceros may refer to either black or white rhinoceros. Among Big Five game hunters, the black rhinoceroses are preferred, although it is now critically endangered.",
                "img":"http://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Black_rhinos_in_crater.jpg/320px-Black_rhinos_in_crater.jpg"
            },
            "cape-buffalo": {
                "name": "Cape Buffalo",
                "description": "The African or Cape buffalo (Syncerus caffer) is a large horned bovid. Buffalo are sometimes reported to kill more people in Africa than any other animal, although the same claim is also made of hippos and crocodiles.[6] It is considered the most dangerous of the Big Five, reportedly causing the most hunter deaths, with wounded animals reported to ambush and attack pursuers.",
                "img":"http://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/African_Buffalo.JPG/320px-African_Buffalo.JPG"
            },
            "leopard": {
                "name": "Leopard",
                "description": "The leopard (Panthera pardus) is a large, carnivorous feline having either tawny fur with dark rosette-like markings or black fur. Of the Big Five, it is most difficult to acquire hunting licenses for leopards. The leopard is sometimes considered the most difficult of the Big Five to hunt because of their nocturnal and secretive nature. They are wary of humans and will take flight in the face of danger. The leopard is solitary by nature, and is most active between sunset and sunrise, although it may hunt during the day in some areas. Leopards can be found in the savanna grasslands, brush land and forested areas in Africa.",
                "img": "http://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Leopard_africa.jpg/360px-Leopard_africa.jpg"
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
                        'name': body[n].name
                    });
                }
            }

            body = a;
        }

        xhr.respond(200, { contentType: 'application/json' }, JSON.stringify(body));
    });

})(window.sinon, window.console);