import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../inicio-sesion/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nomUsuario: string = '';
  contrasenia: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.nomUsuario, this.contrasenia).subscribe(
      (response) => {
        this.router.navigate(['/inicio-sesion']);
      },
      (error) => {
        this.errorMessage = 'Error registrando usuario';
      }
    );
  }
}
