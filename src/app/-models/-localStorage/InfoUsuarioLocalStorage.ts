import {
  Injectable
} from '@angular/core';

@Injectable()
export class InfoUsuarioLocalStorage {
  idUsuario: number;
  nomeUsuario: string;
  loginUsuario: string;
  idEmpresa ? : number;
  isContrato: boolean;
  Found: boolean;
}
