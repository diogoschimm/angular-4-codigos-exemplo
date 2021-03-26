
import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';

declare function CarregarScripts(): any;
declare function CarregarScripts2(): any;

@Component({
  selector: 'app-adm',
  templateUrl: './adm.component.html'
})
export class AdmComponent implements OnInit {


  constructor(
    private _appComponent: AppComponent
  ) { 
    this._appComponent.setClasseEmBranco();
  }
  
  ngOnInit() {  
   this.ativarScripts();  
  }
 
  private ativarScripts(){
    CarregarScripts();
    CarregarScripts2(); 
  }
}

