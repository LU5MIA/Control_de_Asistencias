import { Injectable } from '@angular/core';
import { Horarios } from '../interfaces/horarios';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  private _horario: Horarios[] = [];
  private _nextid: number = 1;

  constructor() {
    console.log("Servicio inicializado de horarios");
    this.cargarHorarios();
  }

  // Cargar desde localStorage o usar datos por defecto
  private cargarHorarios(): void {
    const data = localStorage.getItem('horarios');
    if (data) {
      this._horario = JSON.parse(data);
    } else {
      this._horario = this.horariosPorDefecto();
      this.guardarHorarios();
    }

    this._nextid = this._horario.length
      ? Math.max(...this._horario.map(h => h.id)) + 1
      : 1;
  }

  // Guardar en localStorage
  private guardarHorarios(): void {
    localStorage.setItem('horarios', JSON.stringify(this._horario));
  }

  // Datos por defecto
  private horariosPorDefecto(): Horarios[] {
    return [
      {
        id: 1,
        turno: 'Mañana',
        modalidad: 'Presencial',
        hora_entrada: '08:00',
        tolerancia: 10,
        hora_salida: '12:00',
        estado: true,
      },
      {
        id: 2,
        turno: 'Tarde',
        modalidad: 'Virtual',
        hora_entrada: '14:00',
        tolerancia: 5,
        hora_salida: '22:00',
        estado: true,
      },
      {
        id: 3,
        turno: 'Noche',
        modalidad: 'Presencial',
        hora_entrada: '20:00',
        tolerancia: 15,
        hora_salida: '23:00',
        estado: true,
      },
    ];
  }

  // Listar horarios
  get horario(): Horarios[] {
    return [...this._horario];
  }

  // Obtener solo horarios activos
  get horariosActivos(): Horarios[] {
    return this._horario.filter(h => h.estado);
  }

  // Agregar nuevo horario
  add = (horario: Horarios): void => {
    horario.id = this._nextid++;
    this._horario.push(horario);
    this.guardarHorarios();
  }

  // Actualizar un horario existente
  actualizar = (horarioActualizado: Horarios): void => {
    const index = this._horario.findIndex(h => h.id === horarioActualizado.id);
    if (index !== -1) {
      this._horario[index] = { ...horarioActualizado };
      this.guardarHorarios();
    }
  }

  // Cambiar estado (activar o desactivar)
  cambiarEstado = (id: number, nuevoEstado: boolean): void => {
    const horario = this._horario.find(h => h.id === id);
    if (horario) {
      horario.estado = nuevoEstado;
      this.guardarHorarios();
    }
  }

}
