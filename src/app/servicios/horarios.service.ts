import { Injectable } from '@angular/core';
import { Dias } from '../interfaces/dias';
import { Horarios } from '../interfaces/horarios';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  private _nextid = 4;
  private _horario: Horarios[] = [
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
  ]

  //metodo para listar horarios

  get horario(): Horarios[] {
    return [...this._horario]
  }

  //metodo para agregar horarios

  add = (horario: Horarios) => {
    horario.id = this._nextid++
    this._horario.push(horario)
  }

  // Actualizar un horario completo
  actualizar = (horarioActualizado: Horarios): void => {
    const index = this._horario.findIndex(h => h.id === horarioActualizado.id);
    if (index !== -1) {
      this._horario[index] = { ...horarioActualizado };
    }
  }

  // Cambiar estado (activar o desactivar)
  cambiarEstado = (id: number, nuevoEstado: boolean): void => {
    const horario = this._horario.find(h => h.id === id);
    if (horario) {
      horario.estado = nuevoEstado;
    }
  }

  constructor() {
    console.log("Servicio inicializado de horarios");

    // Guardar los horarios en localStorage al iniciar
    localStorage.setItem('horarios', JSON.stringify(this._horario));
  }

}
