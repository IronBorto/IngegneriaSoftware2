import { Component } from '@angular/core';
import { Http, RequestOptionsArgs, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent  { 
  name = 'Angular';

  slideIndex = 0;
  
  carousel() {
     let i;
      let x = document.getElementsByClassName("SlideShow");
      for (i = 0; i < x.length; i++) {
        //x[i].style.display = "none"; 
      }
      this.slideIndex++;
      if (this.slideIndex > x.length) {this.slideIndex = 1;} 
      //x[this.slideIndex-1].style.display = "block"; 
      setTimeout(3000); // Change image every 2 seconds
  }

  // Da qua in giù funzione DBpedia

  private sparkqlData = null;
  constructor(private http: Http) { }

  sparkql() { //Inserire testo ricerca
    let headers: Headers = new Headers({
      'Content-type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    });

    let params = new URLSearchParams();
    params.append('query', 'SELECT * WHERE { <http://dbpedia.org/resource/Awolnation> ?pref ?obj } LIMIT 10'); //al posto di Awolnation va inserita la stringa
    params.append('format', 'json');

    let options: RequestOptionsArgs = {
      headers: headers,
      params: URLSearchParams
    };

    this.http.get('http://dbpedia.org/sparql', options) // 1
      .map(response => response.json())
      .subscribe(data => {
          console.log(data);
          this.sparkqlData = data; // 3
       });
     console.log(this.sparkqlData);  // 2
  }
}

