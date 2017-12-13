const KGSearch = require('google-kgsearch');
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
      else if(items == undefined){
        console.log("Some problems with the google search call");
      }
      else
        {
        console.log(items[0].result.name);
        results.push(items[0].result.name);
        var name = items[0].result.name.split(" ").join("_");
        if (items[0].result.detailedDescription != undefined) {
          var url = decodeURIComponent(items[0].result.detailedDescription.url);
          console.log(url);
          var suffix = url.split("/");
          console.log(suffix[suffix.length - 1]);
          results.push(suffix[suffix.length - 1]);
          results.push(url);
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