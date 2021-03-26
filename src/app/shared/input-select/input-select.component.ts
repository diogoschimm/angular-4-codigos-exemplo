import { NgModel } from '@angular/forms';
import { Component, OnInit, Input, ContentChild } from '@angular/core';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.css']
})
export class InputSelectComponent implements OnInit {

  @Input() label: string
  @Input() errorMessage: string
  @Input() errorMessagePreenchido: string
  @Input() valorVazio: string

  input: any

  @ContentChild(NgModel) model: NgModel

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.input = this.model
    if (this.input === undefined){
      throw new Error('Esse conponente precisa ser usado com uma diretiva ngModel')
    }
  }

  hasSuccess(): boolean{
    return (this.input.valid || 
      this.input.value != this.valorVazio)
       && (this.input.dirty || this.input.touched)
  }

  hasError(): boolean{
    return (this.input.invalid  ||
      this.input.value == this.valorVazio)
      && (this.input.dirty || this.input.touched)
  }

  messagemErro(): string {
    let retorno: string = this.errorMessage

    if (this.errorMessagePreenchido)
      if (this.input.value)
        retorno = this.errorMessagePreenchido

    return retorno
  }

}
