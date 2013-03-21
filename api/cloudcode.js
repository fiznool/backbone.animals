function onPostFetch(request, response, modules){
 var i, len, factCount, factNumber;
  
  // If this is an animals request, randomly select a fact to populate the description.
  if(request.collectionName === 'animals') {
    for (i = 0, len = response.body.length; i < len; i++) {
      // Check if we even have any facts
      factCount = response.body[i].facts && response.body[i].facts.length;
      if (factCount) {
        // We have facts - pick one at random
        factNumber = Math.floor(Math.random() * factCount);
        response.body[i].description = response.body[i].facts[factNumber];
        
        delete response.body[i].facts;
      }
    }
  }
  
  // Tell Kinvey to continue with the response
  response.continue();
}