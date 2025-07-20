import { Injectable } from '@angular/core';
import { Dias } from '../interfaces/dias';

@Injectable({
  providedIn: 'root'
})
export class DiasService {

  private _dias: Dias[] = [
    {
      id: 1,
      nombre: "Lunes",
      estado: true,
    },
    {
      id: 2,
      nombre: "Martes",
      estado: true,
    },
    {
      id: 3,
      nombre: "Miercoles",
      estado: true,
    },
    {
      id: 4,
      nombre: "Jueves",
      estado: true,
    },
    {
      id: 5,
      nombre: "Viernes",
      estado: true,
    }
  ]

  //metodo para listar dias

  get dia(): Dias[] {
    return [...this._dias]
  }

  // Cambiar estado (activar o desactivar)
  cambiarEstado = (id: number, nuevoEstado: boolean): void => {
    const dia = this._dias.find(d => d.id === id);
    if (dia) {
      dia.estado = nuevoEstado;
    }
  }

  constructor() {
    console.log("Servicio de dias Inicializado")
  }
}
