import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './inicio-sesion/auth.service';
import { OktaAuthService } from '@okta/okta-angular';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent implements OnInit {
  title = 'Kucina';
  username: string = '';
  isAuthenticated: boolean = false;
  isLoggedIn: boolean = false;

  constructor(public authService: AuthService) {
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = this.authService.getIsLoggedIn();
    this.username = '';
    window.location.reload();
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.getIsLoggedIn();
    this.username = this.authService.getUsername();
  }


}
