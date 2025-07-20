import { Injectable } from '@angular/core';
import { Cargos } from '../interfaces/cargos';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargosService {

  private _nextid = 5
  private _cargos: Cargos[] = [
    {
      id: 1,
      nombre: "Gerente General",
      estado: true,
    },
    {
      id: 2,
      nombre: "Jefe de Departamento",
      estado: true,
    },
    {
      id: 3,
      nombre: "Analista de Sistemas",
      estado: true,
    },
    {
      id: 4,
      nombre: "Asistente Administrativo",
      estado: true,
    }
  ]

  //metodo para listar cargos

  get cargos():Cargos[] {
    return [...this._cargos]
  }

  //metodo para agregar cargos

  add = (cargos:Cargos) => {
    cargos.id = this._nextid++
    this._cargos.push(cargos)
  }

  // Actualizar un cargo completo (nombre, estado, etc.)
  actualizar = (cargoActualizado: Cargos): void => {
    const index = this._cargos.findIndex(c => c.id === cargoActualizado.id);
    if (index !== -1) {
      this._cargos[index] = { ...cargoActualizado };
    }
  }

  
  // Cambiar estado (activar o desactivar)
  cambiarEstado = (id: number, nuevoEstado: boolean): void => {
    const cargo = this._cargos.find(c => c.id === id);
    if (cargo) {
      cargo.estado = nuevoEstado;
    }
  }

  //metodo para borrar cargos

  /* remover = (cargos:Cargos) => {
    this._cargos = this._cargos.filter(s => s.id != cargos.id)
  } */


  constructor() {
    console.log("Servicio cargos inicializado")
  }
}
