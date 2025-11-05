import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Nota {
  _id?: string;
  titulo: string;
  contenido: string;
  autor: string;
  categoria: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotasService {
  private apiUrl = 'http://localhost:3000/api/notas';

  constructor(private http: HttpClient) {}

  obtenerNotas(): Observable<Nota[]> {
    return this.http.get<Nota[]>(this.apiUrl);
  }

  crearNota(nota: Nota): Observable<Nota> {
    return this.http.post<Nota>(this.apiUrl, nota);
  }

  actualizarNota(id: string, nota: Nota): Observable<Nota> {
    return this.http.put<Nota>(`${this.apiUrl}/${id}`, nota);
  }

  eliminarNota(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
