import { inject } from '@angular/core/testing';
import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import {NgModel} from '@angular/forms'

@Component({
  selector: 'app-input-container',
  templateUrl: './input-container.component.html'
})
export class InputContainerComponent implements OnInit {

  @Input() label: string
  @Input() errorMessage: string
  @Input() errorMessagePreenchido: string

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
    return this.input.valid && (this.input.dirty || this.input.touched)
  }

  hasError(): boolean{
    return this.input.invalid && (this.input.dirty || this.input.touched)
  }

  messagemErro(): string {
    let retorno: string = this.errorMessage

    if (this.errorMessagePreenchido)
      if (this.input.value)
        retorno = this.errorMessagePreenchido

    return retorno
  }

}
