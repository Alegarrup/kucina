import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent {

  nomUsuario: string = '';
  contrasenia: string = '';
  errorMessage: string = '';
  isLoggedIn: boolean = false;
  username: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.nomUsuario, this.contrasenia).subscribe(response => {
      if (response.token) {
        localStorage.setItem('token', response.token);
        alert('Inicio de sesion Correcto');
        this.router.navigate(['/']);
      }
    }, error => {
      alert('Invalid credentials');
    });
  }

}
