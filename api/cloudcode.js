// Called on every object retrieval
var factCount = this.facts && this.facts.length;
if (factCount) {
    // We have facts - pick one at random
    factNumber = Math.floor(Math.random() * factCount);
    this.description = this.facts[factNumber];
    
    // Don't send the facts array to the client
    hide('facts');
}