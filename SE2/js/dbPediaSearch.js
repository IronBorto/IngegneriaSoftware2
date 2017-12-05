class dbPedia {
    constructor() {

    }
    async dbpedia(param) {
        var SparqlClient = require('sparql-client');
        var util = require('util');
        var endpoint = 'http://dbpedia.org/sparql';
        var query = /*"prefix dbpedia: <http://dbpedia.org/resource/>"+*/
            "prefix dbpedia-owl: <http://dbpedia.org/ontology/>" +

            "select ?abstract ?thumbnail where { " +
            "  <http://dbpedia.org/resource/" + param + "> dbpedia-owl:abstract ?abstract ;" +
            "dbpedia-owl:thumbnail ?thumbnail ." +
            "  filter(langMatches(lang(?abstract),\"en\"))" +
            "}";
        var client = new SparqlClient(endpoint);
        console.log("Query to " + endpoint);
        console.log("Query: " + query);
        client.query(query)
            .execute(function (error, results) {
                console.log(results.results.bindings[0].abstract.value);
                console.log(util.inspect(arguments[1].results.bindings[0].abstract.value, null, 20, true) + "\n");
                
                return util.inspect(arguments[1].results.bindings[0].abstract.value, null, 20, true);
                
                //process.stdout.write(util.inspect(arguments, null, 20, true) + "\n");
            });
    }

}

module.exports = new dbPedia();