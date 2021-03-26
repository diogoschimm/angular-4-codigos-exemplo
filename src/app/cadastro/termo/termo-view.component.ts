import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-termo-view',
  templateUrl: './termo-view.component.html'
})
export class TermoViewComponent implements OnInit {

  @Input() texto: string

  constructor() { }

  ngOnInit() {
    
  }

}
