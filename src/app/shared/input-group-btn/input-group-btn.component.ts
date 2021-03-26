import { inject } from '@angular/core/testing';
import { Component, OnInit, Input, Output, ContentChild, AfterContentInit, EventEmitter } from '@angular/core';
import {NgModel} from '@angular/forms'

@Component({
  selector: 'app-input-group-btn',
  templateUrl: './input-group-btn.component.html',
  styleUrls: ['./input-group-btn.component.css']
})
export class InputGroupBtnComponent implements OnInit {

  @Input() label: string
  @Input() errorMessage: string
  @Input() errorMessagePreenchido: string
  @Input() buttonText: string
  @Output() clickButton = new EventEmitter()

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

  emitClickButton(){
    this.clickButton.emit();
  }

}
