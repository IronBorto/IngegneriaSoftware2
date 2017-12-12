/*var google = require('googleapis');
var plus = google.plus('v1');

var API_KEY = 'AIzaSyAkLk07xOAE7j0SqXbMttOOXFdwAN9YikI'; // specify your API key here
// Ricerca Google Knowledge https://kgsearch.googleapis.com/v1/entities:search?query=pantheon+london&key=AIzaSyAkLk07xOAE7j0SqXbMttOOXFdwAN9YikI&limit=1&indent=True
plus.people.get({
  auth: API_KEY,
  userId: '+google'
}, function (err, user) {
  console.log('Result: ' + (err ? err.message : user.displayName));
});
*/

const KGSearch = require('google-kgsearch');
//const dbPedia = require('./dbPediaSearch');
class googlesearch {
  constructor() { }

  async googlesearch(param) {
    KGSearch.kGraph = KGSearch(process.env.KGSEARCH_API_KEY = "AIzaSyAkLk07xOAE7j0SqXbMttOOXFdwAN9YikI");
    let params = {
      query: param,
      limit: 1
    }
    var results = new Array();
    KGSearch.kGraph.search(params, (err, items) => {
      if (err) {
        console.error(err);
        const par = params.query.slice(0, -1);
        const string = googlesearch(par);
        results.push(string);
      }
      else {
        console.log(items[0].result.name);
        results.push(items[0].result.name);
        var name = items[0].result.name.split(" ").join("_");
        console.log(items[0].result['@type']);
        results.push(items[0].result['@type']);
        if (items[0].result.detailedDescription != undefined) {
          var url = decodeURIComponent(items[0].result.detailedDescription.url);
          console.log(url);
          var suffix = url.split("/");
          console.log(suffix[suffix.length - 1]);
          //var result = dbPedia.dbpedia(suffix[suffix.length-1]);
          results.push(suffix[suffix.length - 1]);
        }
        else
          results.push(name);
      }
    });
    await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    return results;
  }

}
module.exports = new googlesearch();

//type of google knowledge: https://schema.org/docs/full.html