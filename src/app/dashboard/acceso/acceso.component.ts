import { Component } from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuarios } from '../../interfaces/usuarios';
import { EmpleadosService } from '../../servicios/empleados.service';
import { RolesService } from '../../servicios/roles.service';
import { Empleados } from '../../interfaces/empleados';
import { Roles } from '../../interfaces/roles';

@Component({
  selector: 'app-acceso',
  standalone: false,
  templateUrl: './acceso.component.html',
  styleUrl: './acceso.component.css'
})
export class AccesoComponent {

  UsuarioOriginal: Usuarios | null = null;
  filtro: string = '';
  mostrarForm = false;
  editando = false;
  verPassword: boolean = false;

  toggleVerPassword() {
    this.verPassword = !this.verPassword;
  }


  constructor(
    private usuarioService: UsuariosService,
    private empleadoService: EmpleadosService,
    private rolService: RolesService
  ) { }


  usuario: Usuarios = {
    id: 0,
    id_empleado: 0,
    nombre_usuario: '',
    password: '',
    id_rol: 0,
    estado: true
  }

  get usuarios(): Usuarios[] {
    return this.usuarioService.usuario;
  }

  get empleados(): Empleados[] {
    return this.empleadoService.empleado;
  }

  get roles(): Roles[] {
    return this.rolService.roles;
  }

  getNombreEmpleado(id_empleado: number): string {
    const empleado = this.empleados.find(e => e.id === id_empleado);
    return empleado ? `${empleado.nombre} ${empleado.ape_p} ${empleado.ape_m}` : 'Desconocido';
  }

  getNombreRol(id_rol: number): string {
    const rol = this.roles.find(r => r.id === id_rol);
    return rol ? rol.nombre : 'Desconocido';
  }

  get usuariosFiltrados(): Usuarios[] {
    const termino = this.filtro.trim().toLowerCase();
    return this.usuarios.filter(u =>
      u.nombre_usuario.toLowerCase().includes(termino)
    );
  }

  abrirFormularioAgregar = () => {
    this.usuario = { id: 0, id_empleado: 0, nombre_usuario: '', password: '', id_rol: 0, estado: true };
    this.editando = false;
    this.mostrarForm = true;
  };

  cerrarFormulario = () => {
    this.usuario = { id: 0, id_empleado: 0, nombre_usuario: '', password: '', id_rol: 0, estado: true };
    this.mostrarForm = false;
    this.editando = false;
  };

  add = () => {
    const usuarioNuevo: Usuarios = {
      ...this.usuario,
      nombre_usuario: this.usuario.nombre_usuario.trim(),
      password: this.usuario.password.trim()
    };

    if (
      usuarioNuevo.id_empleado === 0 ||
      usuarioNuevo.nombre_usuario === '' ||
      usuarioNuevo.password === '' ||
      usuarioNuevo.id_rol === 0
    ) {
      alert('Todos los campos son obligatorios. Verifica que ningún campo esté vacío o con valor 0.');
      return;
    }

    const yaExiste = this.usuarios.some(u =>
      u.nombre_usuario.toLowerCase() === usuarioNuevo.nombre_usuario.toLowerCase()
    );

    if (yaExiste) {
      alert('Ya existe un usuario con ese nombre de usuario');
      return;
    }

    this.usuarioService.add(usuarioNuevo);
    this.cerrarFormulario();
  };

  editarUsuario = (usuario: Usuarios) => {
    this.usuario = { ...usuario };
    this.UsuarioOriginal = { ...usuario };
    this.mostrarForm = true;
    this.editando = true;
  };

  actualizar = () => {
    const usuarioNuevo: Usuarios = {
      ...this.usuario,
      nombre_usuario: this.usuario.nombre_usuario.trim(),
      password: this.usuario.password.trim()
    };

    if (
      usuarioNuevo.id_empleado === 0 ||
      usuarioNuevo.nombre_usuario === '' ||
      usuarioNuevo.password === '' ||
      usuarioNuevo.id_rol === 0
    ) {
      alert('Todos los campos son obligatorios. Verifica que ningún campo esté vacío o con valor 0.');
      return;
    }

    const yaExiste = this.usuarios.some(u =>
      u.id !== usuarioNuevo.id &&
      u.nombre_usuario.toLowerCase() === usuarioNuevo.nombre_usuario.toLowerCase()
    );

    if (yaExiste) {
      alert('Ya existe otro usuario con ese nombre');
      return;
    }

    if (
      this.UsuarioOriginal &&
      this.UsuarioOriginal.id_empleado === usuarioNuevo.id_empleado &&
      this.UsuarioOriginal.nombre_usuario.toLowerCase() === usuarioNuevo.nombre_usuario.toLowerCase() &&
      this.UsuarioOriginal.password === usuarioNuevo.password &&
      this.UsuarioOriginal.id_rol === usuarioNuevo.id_rol &&
      this.UsuarioOriginal.estado === usuarioNuevo.estado
    ) {
      alert('No se realizaron cambios');
      return;
    }

    this.usuarioService.actualizar(usuarioNuevo);
    this.cerrarFormulario();
  };

  activarUsuario(usuario: Usuarios): void {
    this.usuarioService.cambiarEstado(usuario.id, true);
    usuario.estado = true;
  }

  desactivarUsuario(usuario: Usuarios): void {
    this.usuarioService.cambiarEstado(usuario.id, false);
    usuario.estado = false;
  }

}
