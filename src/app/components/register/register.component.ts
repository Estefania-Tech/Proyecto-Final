import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nombre: string = '';
  correo: string = '';
  contrasena: string = '';
  mensaje: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  registrar() {
    if (!this.nombre || !this.correo || !this.contrasena) {
      this.mensaje = 'Por favor complete todos los campos.';
      return;
    }

    const nuevoUsuario = {
      nombre: this.nombre,
      correo: this.correo,
      contrasena: this.contrasena
    };

    this.http.post('http://localhost:3000/api/usuarios', nuevoUsuario).subscribe({
      next: (res: any) => {
        console.log('Usuario registrado:', res);
        this.mensaje = 'Registro exitoso. Redirigiendo al login...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        console.error('Error en el registro:', err);
        this.mensaje = 'Error al registrar. Intente nuevamente.';
      }
    });
  }
}
