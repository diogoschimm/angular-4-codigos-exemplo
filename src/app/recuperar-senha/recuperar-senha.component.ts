import { RecuperarSenhaService } from './../-services/-acesso/recuperar-senha.service';
import { HardCodeService } from './../-services/-utilitario/hard-code.service';
import { Router } from '@angular/router'; 
import { Component, OnInit } from '@angular/core'; 

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html'
})
export class RecuperarSenhaComponent implements OnInit {

  ano: number;
  mensagemDireitos: string ="";
  isLoading: boolean = false;
  
  model: any = { EmailUsuario: '' };

  constructor(
    private _hardCode: HardCodeService,
    private _recuperarSenhaService: RecuperarSenhaService,
    private _rota: Router
  ) { 
    this.ano = _hardCode.ano;
    this.mensagemDireitos = _hardCode.mensagemDireitos;
  }

  ngOnInit() {
  }

  recuperarSenha(){
    this._recuperarSenhaService.recuperarSenha(this.model.EmailUsuario).subscribe(
      data => {
        if (data && data.IsSucesso){
          this._rota.navigate(['/emailenviado']);
        }
      },
      error => {

      }
    );
  }

}
