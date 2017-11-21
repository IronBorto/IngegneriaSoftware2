"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
require("rxjs/add/operator/map");
let AppComponent = class AppComponent {
    constructor(http) {
        this.http = http;
        this.name = 'Angular';
        this.slideIndex = 0;
        // Da qua in giù funzione DBpedia
        this.sparkqlData = null;
    }
    carousel() {
        let i;
        let x = document.getElementsByClassName("SlideShow");
        for (i = 0; i < x.length; i++) {
            //x[i].style.display = "none"; 
        }
        this.slideIndex++;
        if (this.slideIndex > x.length) {
            this.slideIndex = 1;
        }
        //x[this.slideIndex-1].style.display = "block"; 
        setTimeout(3000); // Change image every 2 seconds
    }
    sparkql() {
        let headers = new http_1.Headers({
            'Content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        });
        let params = new http_1.URLSearchParams();
        params.append('query', 'SELECT * WHERE { <http://dbpedia.org/resource/Awolnation> ?pref ?obj } LIMIT 10'); //al posto di Awolnation va inserita la stringa
        params.append('format', 'json');
        let options = {
            headers: headers,
            params: http_1.URLSearchParams
        };
        this.http.get('http://dbpedia.org/sparql', options) // 1
            .map(response => response.json())
            .subscribe(data => {
            console.log(data);
            this.sparkqlData = data; // 3
        });
        console.log(this.sparkqlData); // 2
    }
};
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app.component.html'
    }),
    __metadata("design:paramtypes", [http_1.Http])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map