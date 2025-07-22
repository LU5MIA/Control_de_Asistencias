import { Injectable } from '@angular/core';
import { Departamentos } from '../interfaces/departamentos';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  private _next_id = 1;

  private _departamentos: Departamentos[] = [];

  constructor() {
    const stored = localStorage.getItem('departamentos');
    this._departamentos = stored ? JSON.parse(stored) : [
      { id: 1, nombre: "Contabilidad", estado: true },
      { id: 2, nombre: "Administracion", estado: true },
      { id: 3, nombre: "RR.HH", estado: true },
      { id: 4, nombre: "Finanzas", estado: true }
    ];

    this._next_id = this._departamentos.length
      ? Math.max(...this._departamentos.map(d => d.id)) + 1
      : 1;

    this.guardarLocalStorage();
    console.log("Servicio de departamentos inicializado");
  }

  // Método para obtener departamentos
  get departamentos(): Departamentos[] {
    return [...this._departamentos];
  }

  // Método para guardar en localStorage
  private guardarLocalStorage() {
    localStorage.setItem('departamentos', JSON.stringify(this._departamentos));
  }

  // Método para agregar departamentos
  add = (departamento: Departamentos) => {
    departamento.id = this._next_id++;
    this._departamentos.push(departamento);
    this.guardarLocalStorage();
  }

  // Actualizar un departamento completo (nombre, estado, etc.)
  actualizar = (departamentoActualizado: Departamentos): void => {
    const index = this._departamentos.findIndex(c => c.id === departamentoActualizado.id);
    if (index !== -1) {
      this._departamentos[index] = { ...departamentoActualizado };
      this.guardarLocalStorage();
    }
  }

  // Cambiar estado (activar o desactivar)
  cambiarEstado = (id: number, nuevoEstado: boolean): void => {
    const dpto = this._departamentos.find(c => c.id === id);
    if (dpto) {
      dpto.estado = nuevoEstado;
      this.guardarLocalStorage();
    }
  }
}
