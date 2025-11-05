import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  correo = '';
  contrasena = '';
  error: string | null = null;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  login() {
    const usuario = { correo: this.correo, contrasena: this.contrasena };
    console.log('Enviando login:', usuario);
    this.http.post('http://localhost:3000/api/usuarios/login', usuario).subscribe({
      next: (res: any) => {
        this.authService.guardarUsuario(res.usuario);
        this.router.navigate(['/notas']);
      },
      error: () => {
        this.error = 'Correo o contraseña incorrectos';
      }
    });
  }
}

