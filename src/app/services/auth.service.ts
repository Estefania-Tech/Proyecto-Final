import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  _id: string;
  nombre: string;
  correo: string;
}

@Injectable({
  providedIn: 'root'
  
})
export class AuthService {
  private usuario: Usuario | null = null;
  private apiUrl = 'http://localhost:4200/register'; 

  constructor(private http: HttpClient) {}
  

  login(usuario: { correo: string, contrasena: string }): Observable<any> {
  return this.http.post('http://localhost:3000/api/usuarios/login', usuario);
  }



  guardarToken(token: string): void {
    localStorage.setItem('token', token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  guardarUsuario(user: Usuario) {
    this.usuario = user;
    localStorage.setItem('usuario', JSON.stringify(user));
  }

  getUsuario(): Usuario | null {
  if (!this.usuario) {
    const userString = localStorage.getItem('usuario');
    if (userString) {
      this.usuario = JSON.parse(userString);
    }
  }
  return this.usuario;
}
estaLogueado(): boolean {
    return this.getUsuario() !== null;
  }


  obtenerUsuario(): any {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  cerrarSesion(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
}


  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }
}
