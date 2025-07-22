import { Injectable } from '@angular/core';
import { Cargos } from '../interfaces/cargos';

@Injectable({
  providedIn: 'root'
})
export class CargosService {

  private _nextid = 1;
  private _cargos: Cargos[] = [];

  constructor() {
    const stored = localStorage.getItem('cargos');
    this._cargos = stored ? JSON.parse(stored) : [
      { id: 1, nombre: "Gerente General", estado: true },
      { id: 2, nombre: "Jefe de Departamento", estado: true },
      { id: 3, nombre: "Analista de Sistemas", estado: true },
      { id: 4, nombre: "Asistente Administrativo", estado: true }
    ];

    this._nextid = this._cargos.length
      ? Math.max(...this._cargos.map(c => c.id)) + 1
      : 1;

    this.guardarLocalStorage();
    console.log("Servicio cargos inicializado");
  }

  // Obtener copia de los cargos
  get cargos(): Cargos[] {
    return [...this._cargos];
  }

  // Obtener solo cargos activos
  get cargosActivos(): Cargos[] {
    return this._cargos.filter(c => c.estado);
  }


  // Guardar en localStorage
  private guardarLocalStorage() {
    localStorage.setItem('cargos', JSON.stringify(this._cargos));
  }

  // Agregar nuevo cargo
  add = (cargo: Cargos) => {
    cargo.id = this._nextid++;
    this._cargos.push(cargo);
    this.guardarLocalStorage();
  }

  // Actualizar cargo existente
  actualizar = (cargoActualizado: Cargos): void => {
    const index = this._cargos.findIndex(c => c.id === cargoActualizado.id);
    if (index !== -1) {
      this._cargos[index] = { ...cargoActualizado };
      this.guardarLocalStorage();
    }
  }

  // Cambiar estado (activar o desactivar)
  cambiarEstado = (id: number, nuevoEstado: boolean): void => {
    const cargo = this._cargos.find(c => c.id === id);
    if (cargo) {
      cargo.estado = nuevoEstado;
      this.guardarLocalStorage();
    }
  }
}
