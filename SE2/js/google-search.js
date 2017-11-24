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
class googlesearch {
  constructor() { }

  gsearchv2() {
    KGSearch.kGraph = KGSearch(process.env.KGSEARCH_API_KEY = "AIzaSyAkLk07xOAE7j0SqXbMttOOXFdwAN9YikI");

    let params = {
      query: 'Taylor Swift',
      types: 'Person',
      limit: 1
    }

    KGSearch.kGraph.search(params, (err, items) => {
      if (err) console.error(err)
      console.log(items)
    })
  }


  googlesearch(param) {
    param = "Cristiano Ronaldo";
    var service_url = 'https://kgsearch.googleapis.com/v1/entities:search';
    var params = {
      'query': param,
      'limit': 10,
      'indent': true,
      'key': 'AIzaSyAkLk07xOAE7j0SqXbMttOOXFdwAN9YikI',
    };
    getJSON(service_url + '?callback=?', params, function (response) {
      console.log(response);
    }, function (err, user) {
      console.log('Result: ' + (err ? err.message : user.displayName));
    });
  }

}
module.exports = new googlesearch();

//type of google knowledge: https://schema.org/docs/full.html