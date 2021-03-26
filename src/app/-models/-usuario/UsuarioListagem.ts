import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioListagem {
     idUsuario: number;
     nomeUsuario: string;
     loginUsuario: string;
     idEmpresa?: number;
     isContrato: boolean;
     
}