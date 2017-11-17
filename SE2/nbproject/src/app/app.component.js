"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
        this.name = 'Angular';
        this.slideIndex = 0;
    }
    AppComponent.prototype.carousel = function () {
        var i;
        var x = document.getElementsByClassName("SlideShow");
        for (i = 0; i < x.length; i++) {
            //x[i].style.display = "none"; 
        }
        this.slideIndex++;
        if (this.slideIndex > x.length) {
            this.slideIndex = 1;
        }
        //x[this.slideIndex-1].style.display = "block"; 
        setTimeout(3000); // Change image every 2 seconds
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app.component.html'
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map