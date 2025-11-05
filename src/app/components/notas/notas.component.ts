import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotasService } from '../../services/notas.service';
import { AuthService } from '../../services/auth.service';

interface Nota {
  _id?: string;
  titulo: string;
  contenido: string;
  autor: string;
  categoria: string;
  estado: string;
}

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {
  notas: Nota[] = [];
  nuevaNota: Nota = {
    titulo: '',
    contenido: '',
    autor: '',
    categoria: 'personal',
    estado: 'activo'
  };
  editandoId: string | null = null;
  cargando = false;
  mensaje = '';

  constructor(private notasService: NotasService, private authService: AuthService) {}

  ngOnInit(): void {
    this.obtenerNotas();
  }

  obtenerNotas(): void {
    this.cargando = true;
    this.notasService.obtenerNotas().subscribe({
      next: (res) => {
        this.notas = res;
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.cargando = false;
      }
    });
  }

  guardarNota(): void {
    const usuario = this.authService.getUsuario();

    if (!usuario) {
      alert('Error: no hay usuario logueado.');
      return;
    }

    const notaAEnviar: Nota = {
      ...this.nuevaNota,
      autor: usuario._id 
    };

    this.notasService.crearNota(notaAEnviar).subscribe({
      next: () => {
        this.obtenerNotas();
        this.mensaje = 'Nota creada correctamente 🎉';
        this.resetFormulario();
      },
      error: (err) => {
        console.error(err);
        this.mensaje = 'Error al crear la nota ❌';
      }
    });

    console.log('Nota a enviar al backend:', notaAEnviar);
  }

  editarNota(nota: Nota): void {
    this.nuevaNota = { ...nota };
    this.editandoId = nota._id || null;
  }

  eliminarNota(id: string): void {
    if (confirm('¿Seguro que deseas eliminar esta nota?')) {
      this.notasService.eliminarNota(id).subscribe({
        next: () => this.obtenerNotas(),
        error: (err) => console.error(err)
      });
    }
  }

  resetFormulario(): void {
    this.nuevaNota = {
      titulo: '',
      contenido: '',
      autor: '',
      categoria: 'personal',
      estado: 'activo'
    };
    this.editandoId = null;
  }
}
