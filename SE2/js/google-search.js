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

const  KGSearch = require('google-kgsearch');
const dbPedia = require('./dbPediaSearch');
class googlesearch {
  constructor() { }

  async googlesearch(param) {
    KGSearch.kGraph = KGSearch(process.env.KGSEARCH_API_KEY = "AIzaSyAkLk07xOAE7j0SqXbMttOOXFdwAN9YikI");
    let params = {
      query: param,
      limit: 1
    }

    KGSearch.kGraph.search(params, (err, items) => {
      if (err) console.error(err)
      if(items[0].result.detailedDescription != undefined) {
        var url = items[0].result.detailedDescription.url;
        console.log(url);
        var suffix = url.split("/");
        var result = dbPedia.dbpedia(suffix[suffix.length-1]);
        return result;
      }
      console.log(items[0].result.name);
      console.log(items[0].result['@type']);
    })
  }

}
module.exports = new googlesearch();

//type of google knowledge: https://schema.org/docs/full.html