import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.components.html',
  styleUrls: ['./navbar.components.css']
})
export class NavbarComponent implements OnInit {
  usuario: any = null;

  constructor(private authService: AuthService, private router: Router) {}

   ngOnInit() {
    const usuario = this.authService.getUsuario();
    if (usuario) {
      this.usuario = usuario.nombre;
    } else {
      this.router.navigate(['/login']);
    }
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
