import {
  Injectable
} from '@angular/core';

@Injectable()
export class TokenUsuarioLocalStorage {
  access_token: string;
  expires_in: number;
  creation_date: Date;
  Found: boolean;
}
