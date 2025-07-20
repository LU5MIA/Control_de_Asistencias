import { Component } from '@angular/core';
import { RolesService } from '../../servicios/roles.service';
import { Roles } from '../../interfaces/roles';

@Component({
  selector: 'app-roles',
  standalone: false,
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {

  RolesOriginal: Roles | null = null;
  filtro: string = '';
  mostrarForm = false; // controla la visibilidad
  editando: boolean = false;

  constructor(private rolService: RolesService) { }

  rol: Roles = {
    id: 0,
    nombre: "",
    estado: true
  }

  get roles(): Roles[] {
    return this.rolService.roles
  }

  get rolesFiltrados(): Roles[] {
    const termino = this.filtro.trim().toLowerCase();
    return this.rolService.roles.filter(roles =>
      roles.nombre.toLowerCase().includes(termino)
    );
  }

  editarRol = (rol: Roles) => {
    this.rol = { ...rol }; // copia los datos del rol al editar
    this.RolesOriginal = { ...rol };
    this.mostrarForm = true;
    this.editando = true;
  };

  actualizar = () => {
    const nombre = this.rol.nombre.trim();

    if (nombre.length === 0) return;
    const yaExiste = this.rolService.roles.some(c =>
      c.id !== this.rol.id && c.nombre.toLowerCase() === nombre.toLowerCase()
    );

    if (
      this.RolesOriginal &&
      nombre.toLowerCase() === this.RolesOriginal.nombre.toLowerCase()
    ) {
      alert('No se realizaron cambios');
      return;
    }

    if (yaExiste) {
      alert('Ya existe otro rol con ese nombre');
      return;
    }

    this.rolService.actualizar(this.rol);
    this.cerrarFormulario();
  };

  cerrarFormulario = () => {
    this.rol = { id: 0, nombre: '', estado: true };
    this.mostrarForm = false;
    this.editando = false;
  };


}
