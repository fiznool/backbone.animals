Parse.Cloud.define("animals", function(request, response) {
  var query = new Parse.Query("animals");
  query.find({
    success: function(results) {
      for (i = 0, len = results.length; i < len; i++) {
        // Check if we even have any facts
        factCount = results[i].get('facts') && results[i].get('facts').length;
        if (factCount) {
          // We have facts - pick one at random
          factNumber = Math.floor(Math.random() * factCount);
          results[i].set('description', results[i].get('facts')[factNumber]);
          
          delete results[i].facts;
        }
      }
      
      response.success(results);
    },
    error: function() {
      response.error("animals lookup failed");
    }
  });
});