import { Injectable } from '@angular/core';
import { Roles } from '../interfaces/roles';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private _roles: Roles[] = [];

  constructor() {
    console.log("Servicio inicializado de Roles");
    this.cargarRoles();
  }

  // Cargar desde localStorage, o usar roles por defecto si no hay
  private cargarRoles() {
    const data = localStorage.getItem('roles');
    if (data) {
      this._roles = JSON.parse(data);
    } else {
      this._roles = this.rolesPorDefecto();
      this.guardarRoles();
    }
  }

  // Guardar en localStorage
  private guardarRoles() {
    localStorage.setItem('roles', JSON.stringify(this._roles));
  }

  // Roles por defecto (si no hay en localStorage)
  private rolesPorDefecto(): Roles[] {
    return [
      { id: 1, nombre: "Administrador", estado: true },
      { id: 2, nombre: "Empleado", estado: true },
    ];
  }

  // Listar roles
  get roles(): Roles[] {
    return [...this._roles];
  }

  // Actualizar o agregar un rol
  actualizar = (RolActualizado: Roles): void => {
    const index = this._roles.findIndex(r => r.id === RolActualizado.id);
    if (index !== -1) {
      this._roles[index] = { ...RolActualizado };
    } else {
      RolActualizado.id = this.generarNuevoId();
      this._roles.push({ ...RolActualizado });
    }
    this.guardarRoles();
  }


  // Generar ID único
  private generarNuevoId(): number {
    return this._roles.length > 0
      ? Math.max(...this._roles.map(r => r.id)) + 1
      : 1;
  }
}
