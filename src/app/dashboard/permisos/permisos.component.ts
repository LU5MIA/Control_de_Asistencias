import { Component } from '@angular/core';
import { PermisosService } from '../../servicios/permisos.service';
import { Permisos } from '../../interfaces/permisos';

@Component({
  selector: 'app-permisos',
  standalone: false,
  templateUrl: './permisos.component.html',
  styleUrl: './permisos.component.css'
})
export class PermisosComponent {

  PermisosOriginal: Permisos | null = null;
  filtro: string = '';
  mostrarForm = false; // controla la visibilidad
  editando: boolean = false;

  constructor(private permisosService: PermisosService) { }

  permiso: Permisos = {
    id: 0,
    nombre: "",
    estado: true
  }

  get permisos(): Permisos[] {
    return this.permisosService.permisos
  }

  get PermisosFiltrados(): Permisos[] {
    const termino = this.filtro.trim().toLowerCase();
    return this.permisosService.permisos.filter(permiso =>
      permiso.nombre.toLowerCase().includes(termino)
    );
  }

  editarPermiso = (permiso: Permisos) => {
    this.permiso = { ...permiso }; // copia los datos del rol al editar
    this.PermisosOriginal = { ...permiso };
    this.mostrarForm = true;
    this.editando = true;
  };

  actualizar = () => {
    const nombre = this.permiso.nombre.trim();

    if (nombre.length === 0) return;
    const yaExiste = this.permisosService.permisos.some(p =>
      p.id !== this.permiso.id && p.nombre.toLowerCase() === nombre.toLowerCase()
    );

    if (
      this.PermisosOriginal &&
      nombre.toLowerCase() === this.PermisosOriginal.nombre.toLowerCase()
    ) {
      alert('No se realizaron cambios');
      return;
    }

    if (yaExiste) {
      alert('Ya existe otro rol con ese nombre');
      return;
    }

    this.permisosService.actualizar(this.permiso);
    this.cerrarFormulario();
  };

  cerrarFormulario = () => {
    this.permiso = { id: 0, nombre: '', estado: true };
    this.mostrarForm = false;
    this.editando = false;
  };

}
