import { Injectable } from '@angular/core';
import { Permisos } from '../interfaces/permisos';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  private _permisos: Permisos[] = [];

  constructor() {
    console.log("Servicio de permisos inicializado");
    this.cargarPermisos();
  }

  private cargarPermisos() {
    const data = localStorage.getItem('permisos');

    if (data) {
      this._permisos = JSON.parse(data);
    } else {
      // Si no hay datos, usa los permisos por defecto
      this._permisos = this.permisosPorDefecto();
      this.guardarPermisos();
    }
  }

  private guardarPermisos() {
    localStorage.setItem('permisos', JSON.stringify(this._permisos));
  }

  private permisosPorDefecto(): Permisos[] {
    return [
      { id: 1, nombre: "Ver informe de Asistencias", estado: true },
      { id: 2, nombre: "Ver mis asistencias", estado: true },
      { id: 3, nombre: "Registrar Justificación", estado: true },
      { id: 4, nombre: "Editar Justificación", estado: true },
      { id: 5, nombre: "Archivar Justificación", estado: true },
      { id: 6, nombre: "Eliminar Justificación", estado: true },
      { id: 7, nombre: "Agregar Usuarios", estado: true },
      { id: 8, nombre: "Editar Usuarios", estado: true },
      { id: 9, nombre: "Activar Usuarios", estado: true },
      { id: 10, nombre: "Desactivar Usuarios", estado: true },
    ];
  }

  // Método para listar permisos
  get permisos(): Permisos[] {
    return [...this._permisos];
  }

  // Método para actualizar o agregar un permiso
  actualizar = (PermisoActualizado: Permisos): void => {
    const index = this._permisos.findIndex(r => r.id === PermisoActualizado.id);

    if (index !== -1) {
      this._permisos[index] = { ...PermisoActualizado };
    } else {
      PermisoActualizado.id = this.generarNuevoId();
      this._permisos.push({ ...PermisoActualizado });
    }

    this.guardarPermisos(); // Guarda cada cambio
  }

  private generarNuevoId(): number {
    return this._permisos.length > 0
      ? Math.max(...this._permisos.map(p => p.id)) + 1
      : 1;
  }
}
