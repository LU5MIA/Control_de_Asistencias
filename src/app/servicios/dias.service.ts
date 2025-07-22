import { Injectable } from '@angular/core';
import { Dias } from '../interfaces/dias';

@Injectable({
  providedIn: 'root'
})
export class DiasService {

  private _dias: Dias[] = [];

  constructor() {
    console.log("Servicio de días Inicializado");
    this.cargarDias();
  }

  // Obtener copia de los días
  get dia(): Dias[] {
    return [...this._dias];
  }

  // Obtener solo dias activos
  get diasActivos(): Dias[] {
    return this._dias.filter(d => d.estado);
  }

  // Cargar desde localStorage o usar los valores por defecto
  private cargarDias(): void {
    const data = localStorage.getItem('dias');
    if (data) {
      this._dias = JSON.parse(data);
    } else {
      this._dias = this.diasPorDefecto();
      this.guardarDias();
    }
  }

  // Guardar en localStorage
  private guardarDias(): void {
    localStorage.setItem('dias', JSON.stringify(this._dias));
  }

  // Valores por defecto
  private diasPorDefecto(): Dias[] {
    return [
      { id: 1, nombre: "Lunes", estado: true },
      { id: 2, nombre: "Martes", estado: true },
      { id: 3, nombre: "Miércoles", estado: true },
      { id: 4, nombre: "Jueves", estado: true },
      { id: 5, nombre: "Viernes", estado: true },
    ];
  }

  // Cambiar estado (activar/desactivar un día)
  cambiarEstado = (id: number, nuevoEstado: boolean): void => {
    const dia = this._dias.find(d => d.id === id);
    if (dia) {
      dia.estado = nuevoEstado;
      this.guardarDias();
    }
  }
}
