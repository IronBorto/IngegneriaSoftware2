import { Component } from '@angular/core';

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

}

