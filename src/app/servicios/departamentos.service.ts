import { Injectable } from '@angular/core';
import { Departamentos } from '../interfaces/departamentos';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  private _next_id = 5

  private _departamentos: Departamentos[] =[
    {
      id: 1,
      nombre: "Contabilidad",
      estado: true,
    },
    {
      id: 2,
      nombre: "Administracion",
      estado: true,
    },
    {
      id: 3,
      nombre: "RR.HH",
      estado: true,
    },
    {
      id: 4,
      nombre: "Finanzas",
      estado: true,
    }
  ]

  //metodo para obtener departamentos

  get departamentos(): Departamentos[]{
    return [...this._departamentos]
  }

  //metodo para agregar departamentos

  add = (departamentos:Departamentos) =>{
    departamentos.id = this._next_id++
    this._departamentos.push(departamentos)
  }

  // Actualizar un departamento completo (nombre, estado, etc.)
  actualizar = (departamentoActualizado: Departamentos): void => {
    const index = this._departamentos.findIndex(c => c.id === departamentoActualizado.id);
    if (index !== -1) {
      this._departamentos[index] = { ...departamentoActualizado };
    }
  }

  // Cambiar estado (activar o desactivar)
  cambiarEstado = (id: number, nuevoEstado: boolean): void => {
    const dpto = this._departamentos.find(c => c.id === id);
    if (dpto) {
      dpto.estado = nuevoEstado;
    }
  }

  constructor() {
    console.log("Servicio de departamentos inicializado")
   }
}
