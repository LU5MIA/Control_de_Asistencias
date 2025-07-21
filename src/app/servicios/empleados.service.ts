import { Injectable } from '@angular/core';
import { Empleados } from '../interfaces/empleados';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  private _nextId = 5;
  private _empleados: Empleados[] = [];

  constructor() {
    const storedData = localStorage.getItem('empleados');
    this._empleados = storedData ? JSON.parse(storedData) : [
      {
        id: 1,
        dni: 60778807,
        nombre: "Lucero",
        ape_p: "Rodriguez",
        ape_m: "Estacio",
        correo: "lucerorodriguezestacio@gmail.com",
        id_horario: 1,
        id_departamento: 1,
        id_cargo: 2,
        estado: true,
      },
      {
        id: 2,
        dni: 74859612,
        nombre: "Elizabet",
        ape_p: "Estacio",
        ape_m: "Loyola",
        correo: "eliza@gmail.com",
        id_horario: 2,
        id_departamento: 2,
        id_cargo: 3,
        estado: true,
      },
      {
        id: 3,
        dni: 78945632,
        nombre: "Carmen",
        ape_p: "Rodriguez",
        ape_m: "Estacio",
        correo: "carmen@gmail.com",
        id_horario: 3,
        id_departamento: 3,
        id_cargo: 4,
        estado: true,
      },
      {
        id: 4,
        dni: 78945632,
        nombre: "Luis",
        ape_p: "Alvarez",
        ape_m: "Ruiz",
        correo: "luis@gmail.com",
        id_horario: 3,
        id_departamento: 3,
        id_cargo: 2,
        estado: true,
      },
    ];

    this.guardarLocalStorage();
    console.log("Servicio inicializado de Empleados");
  }

  private guardarLocalStorage() {
    localStorage.setItem('empleados', JSON.stringify(this._empleados));
  }

  get empleado(): Empleados[] {
    return [...this._empleados];
  }

  add = (empleado: Empleados) => {
    empleado.id = this._nextId++;
    this._empleados.push(empleado);
    this.guardarLocalStorage();
  }

  actualizar = (EmpleadoActualizado: Empleados): void => {
    const index = this._empleados.findIndex(e => e.id === EmpleadoActualizado.id);
    if (index !== -1) {
      this._empleados[index] = { ...EmpleadoActualizado };
      this.guardarLocalStorage();
    }
  }

  cambiarEstado = (id: number, nuevoEstado: boolean): void => {
    const empleado = this._empleados.find(e => e.id === id);
    if (empleado) {
      empleado.estado = nuevoEstado;
      this.guardarLocalStorage();
    }
  }
}
