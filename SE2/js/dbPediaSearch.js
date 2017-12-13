class dbPedia {
    constructor() {

    }
    async dbpedia(param) {
        var SparqlClient = require('sparql-client');
        var util = require('util');
        var endpoint = 'http://dbpedia.org/sparql';
        var query = "prefix dbpedia-owl: <http://dbpedia.org/ontology/>" +
            "select ?abstract where { " +
            "  <http://dbpedia.org/resource/" + param + "> dbpedia-owl:abstract ?abstract ." +
            "  filter(langMatches(lang(?abstract),\"en\"))" +
            "}";
        var client = new SparqlClient(endpoint);
        console.log("Query to " + endpoint);
        console.log("Query: " + query);
        var result;
        client.query(query)
            .execute(function (error, results) {
                if(error)
                    console.log("Problem with dbpedia");
                else
                {
                    console.log(results.results.bindings[0].abstract.value);
                    console.log(util.inspect(arguments[1].results.bindings[0].abstract.value, null, 20, true) + "\n");
                    result = results.results.bindings[0].abstract.value;
                }
            });
        await new Promise((resolve, reject) => setTimeout(resolve, 2000));
        return result;
    }

}

module.exports = new dbPedia();