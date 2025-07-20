import { Component, OnInit } from '@angular/core';
import { Roles } from '../../interfaces/roles';
import { Permisos } from '../../interfaces/permisos';
import { RolesService } from '../../servicios/roles.service';
import { PermisosService } from '../../servicios/permisos.service';
import { RolesPermisosService } from '../../servicios/roles-permisos.service';

@Component({ 
  selector: 'app-roles-permisos',
  standalone: false,
  templateUrl: './roles-permisos.component.html',
  styleUrl: './roles-permisos.component.css'
})
export class RolesPermisosComponent implements OnInit {

  roles: Roles[] = [];
  filtro: string = '';
  permisos: Permisos[] = [];
  idRolSeleccionado: number = 0;
  rolSeleccionadoId: number = 0;
  permisosSeleccionados: number[] = [];
  mostrarForm = false; // Mostrar u ocultar el modal
  permisosSeleccionadosMap: { [id: number]: boolean } = {}; // Para los checkboxes

  constructor(
    private rolesService: RolesService,
    private permisosService: PermisosService,
    private rolesPermisosService: RolesPermisosService
  ) { }

  get rol(): Roles[] {
    return this.rolesService.roles;
  }

  get permiso(): Permisos[] {
    return this.permisosService.permisos;
  }

  permisosFiltradosDelRolSeleccionado(): Permisos[] {
    if (!this.rolSeleccionadoId) return [];

    const idsPermisosAsignados = this.rolesPermisosService.getPermisosPorRol(this.rolSeleccionadoId);

    return this.permisos
      .filter(p =>
        idsPermisosAsignados.includes(p.id) &&
        p.nombre.toLowerCase().includes(this.filtro.trim().toLowerCase())
      );
  }

  ngOnInit() {
    this.roles = this.rolesService.roles;
    this.permisos = this.permisosService.permisos;

    const rolAdmin = this.roles.find(r => r.nombre.toLowerCase() === 'administrador');
    if (rolAdmin) {
      this.rolSeleccionadoId = rolAdmin.id;
      this.seleccionarRol(+this.rolSeleccionadoId);
    }
  }

  seleccionarRol(idRol: number) {
    this.idRolSeleccionado = idRol;
    this.rolSeleccionadoId = idRol;
    this.permisosSeleccionados = this.rolesPermisosService.getPermisosPorRol(idRol);

    this.permisosSeleccionadosMap = {};
    for (const idPermiso of this.permisosSeleccionados) {
      this.permisosSeleccionadosMap[idPermiso] = true;
    }

    this.filtro = '';
  }


  togglePermiso(idPermiso: number) {
    if (this.permisosSeleccionados.includes(idPermiso)) {
      this.permisosSeleccionados = this.permisosSeleccionados.filter(p => p !== idPermiso);
    } else {
      this.permisosSeleccionados.push(idPermiso);
    }
  }

  editarAsignacion(idRol: number) {
    this.rolSeleccionadoId = idRol;
    this.mostrarForm = true;

    // Cargar los permisos asignados al rol en el mapa de checkboxes
    const permisosAsignados = this.rolesPermisosService.getPermisosPorRol(idRol);
    this.permisosSeleccionadosMap = {};

    for (const permiso of this.permisos) {
      this.permisosSeleccionadosMap[permiso.id] = permisosAsignados.includes(permiso.id);
    }
  }

  guardarAsignacion() {
    const permisosSeleccionados: number[] = Object.keys(this.permisosSeleccionadosMap)
      .filter(id => this.permisosSeleccionadosMap[+id]) // +id para convertir string a number
      .map(id => +id);

    this.rolesPermisosService.asignarPermisos(this.rolSeleccionadoId, permisosSeleccionados);
    this.mostrarForm = false;
    alert("Permisos actualizados correctamente");
  }

  eliminarPermiso(idRol: number, idPermiso: number) {
    const confirmado = confirm('¿Estás segura de que deseas eliminar este permiso?');

    if (confirmado) {
      this.rolesPermisosService.eliminarAsignacion(idRol, idPermiso);
      // Refresca los permisos seleccionados y la vista
      this.permisosSeleccionados = this.rolesPermisosService.getPermisosPorRol(idRol);
      
    }
  }

  cerrarFormulario() {
    this.mostrarForm = false;
    this.permisosSeleccionadosMap = {};

  }

}
