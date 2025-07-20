import { Injectable } from '@angular/core';
import { RolesPermisos } from '../interfaces/roles-permisos';

@Injectable({
  providedIn: 'root'
})
export class RolesPermisosService {

  private _asignaciones: RolesPermisos[] = [];

  constructor() {
    this.cargarAsignaciones();
  }

  private cargarAsignaciones() {
    const data = localStorage.getItem('rolesPermisos');
    if (data) {
      this._asignaciones = JSON.parse(data);
    } else {
      // Asignaciones por defecto
      this._asignaciones = [
        { idRol: 1, idPermiso: 1 }, // Admin tiene permiso 1
        { idRol: 1, idPermiso: 2 },
        { idRol: 2, idPermiso: 3 }, // Usuario tiene permiso 3
      ];
      this.guardarAsignaciones(); // guardamos por única vez
    }
  }


  private guardarAsignaciones() {
    localStorage.setItem('rolesPermisos', JSON.stringify(this._asignaciones));
  }

  // Obtener todos los permisos de un rol
  getPermisosPorRol(idRol: number): number[] {
    return this._asignaciones
      .filter(rp => rp.idRol === idRol)
      .map(rp => rp.idPermiso);
  }

  // Asignar o quitar permisos a un rol
  asignarPermisos(idRol: number, nuevosPermisos: number[]) {
    // 1. Eliminar todos los permisos anteriores del rol
    this._asignaciones = this._asignaciones.filter(rp => rp.idRol !== idRol);

    // 2. Agregar los nuevos permisos seleccionados
    nuevosPermisos.forEach(idPermiso => {
      this._asignaciones.push({ idRol, idPermiso });
    });

    // 3. Guardar cambios
    this.guardarAsignaciones();
  }


  get asignaciones(): RolesPermisos[] {
    return [...this._asignaciones];
  }

  eliminarAsignacion(idRol: number, idPermiso: number) {
    this._asignaciones = this._asignaciones.filter(
      a => !(a.idRol === idRol && a.idPermiso === idPermiso)
    );
    this.guardarAsignaciones(); // Si tienes persistencia
  }

}
