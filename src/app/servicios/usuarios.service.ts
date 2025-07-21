import { Injectable } from '@angular/core';
import { Usuarios } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private _nextid = 5;
  private _usuarios: Usuarios[] = [
    {
      id: 1,
      id_empleado: 1,
      nombre_usuario: "lucero08",
      password: "1234",
      id_rol: 1,
      estado: true
    },
    {
      id: 2,
      id_empleado: 2,
      nombre_usuario: "eli05",
      password: "555",
      id_rol: 2,
      estado: true
    },
    {
      id: 3,
      id_empleado: 3,
      nombre_usuario: "car91",
      password: "789",
      id_rol: 2,
      estado: true
    },
    {
      id: 4,
      id_empleado: 4,
      nombre_usuario: "lin45",
      password: "456",
      id_rol: 2,
      estado: true
    }
  ]

  //metodo para listar usuarios

  get usuario(): Usuarios[] {
    return [...this._usuarios]
  }

  //metodo para agregar usuarios

  add = (usuario: Usuarios) => {
    usuario.id = this._nextid++
    this._usuarios.push(usuario)
  }

  // Actualizar un usuario completo (nombre, estado, etc.)
  actualizar = (UsuarioActualizado: Usuarios): void => {
    const index = this._usuarios.findIndex(u => u.id === UsuarioActualizado.id);
    if (index !== -1) {
      this._usuarios[index] = { ...UsuarioActualizado };
    }
  }

  // Cambiar estado (activar o desactivar)
  cambiarEstado = (id: number, nuevoEstado: boolean): void => {
    const usuario = this._usuarios.find(u => u.id === id);
    if (usuario) {
      usuario.estado = nuevoEstado;
    }
  }

  constructor() { 
    console.log("Servicio de usuarios inicializado")
  }
}
