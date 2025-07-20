import { Injectable } from '@angular/core';
import { HorariosDias } from '../interfaces/horarios-dias';

@Injectable({
  providedIn: 'root'
})
export class HorariosDiasService {

  private _asignaciones: HorariosDias[] = [];

  constructor() {
    this.cargarAsignaciones();
  }

  private cargarAsignaciones() {
    const data = localStorage.getItem('horariosDias');
    if (data) {
      this._asignaciones = JSON.parse(data);
    } else {
      this._asignaciones = [
        { idDia: 1, idHorario: 1 },
        { idDia: 1, idHorario: 2 },
        { idDia: 2, idHorario: 3 },
      ];
      this.guardarAsignaciones();
    }
  }

  private guardarAsignaciones() {
    localStorage.setItem('horariosDias', JSON.stringify(this._asignaciones));
  }

  // 🔍 Obtener los horarios de un día específico
  getHorariosPorDia(idDia: number): number[] {
    return this._asignaciones
      .filter(hd => hd.idDia === idDia)
      .map(hd => hd.idHorario);
  }

  // 💾 Asignar nuevos horarios a un día (reemplazando los anteriores)
  asignarHorarios(idDia: number, nuevosHorarios: number[]) {
    this._asignaciones = this._asignaciones.filter(hd => hd.idDia !== idDia);

    nuevosHorarios.forEach(idHorario => {
      this._asignaciones.push({ idDia, idHorario });
    });

    this.guardarAsignaciones();
  }

  // ❌ Eliminar una asignación específica
  eliminarAsignacion(idDia: number, idHorario: number) {
    this._asignaciones = this._asignaciones.filter(
      a => !(a.idDia === idDia && a.idHorario === idHorario)
    );
    this.guardarAsignaciones();
  }

  // 🔁 Obtener una copia para mostrar o debuggear
  get asignaciones(): HorariosDias[] {
    return [...this._asignaciones];
  }

}
