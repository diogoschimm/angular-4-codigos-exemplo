import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'body',
  templateUrl: './app.component.html'
})
export class AppComponent {
  
  @HostBinding('class') public cssClass = 'gray-bg';
  
    setClassePadrao(){
      this.cssClass = 'gray-bg';
    }
    setClasseEmBranco(){
      this.cssClass = '';
    }
}
