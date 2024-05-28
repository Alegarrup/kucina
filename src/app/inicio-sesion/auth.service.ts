import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private currentUserSubject: BehaviorSubject<any>;
   isLoggedIn: boolean = false;
   username: string = '';
  
   

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(null);
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  register(nomUsuario: string, contrasenia: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { nomUsuario, contrasenia });
  }

  login(nomUsuario: string, contrasenia: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { nomUsuario, contrasenia }).pipe(
      map(response => {
        if (response && response.token) {
          this.isLoggedIn =true;
          this.username = nomUsuario;
        }
        return response;
      })
    );
  }

  logout(): void {
    // eliminar usuario del local storage para cerrar sesión
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isLoggedIn = false;
    this.username = '';
  }

  
  getToken(): string | null {
    return this.currentUserSubject.value ? this.currentUserSubject.value.token : null;
  }

  getUsername(): string {
    return this.username;
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  
}
