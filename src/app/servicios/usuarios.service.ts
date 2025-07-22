import { Injectable } from '@angular/core';
import { Usuarios } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private _usuarios: Usuarios[] = [];
  private _nextid = 1;

  constructor() {
    console.log("Servicio de usuarios inicializado");
    const datos = localStorage.getItem('usuarios');
    if (datos) {
      this._usuarios = JSON.parse(datos);
      this._nextid = Math.max(...this._usuarios.map(u => u.id), 0) + 1;
    } else {
      this._usuarios = [
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
      ];
      this._nextid = 5;
      this.guardarEnLocalStorage(); // Guardar por primera vez
    }
  }

  private guardarEnLocalStorage() {
    localStorage.setItem('usuarios', JSON.stringify(this._usuarios));
  }

  get usuario(): Usuarios[] {
    return [...this._usuarios];
  }

  add = (usuario: Usuarios) => {
    usuario.id = this._nextid++;
    this._usuarios.push(usuario);
    this.guardarEnLocalStorage();
  }

  actualizar = (usuarioActualizado: Usuarios): void => {
    const index = this._usuarios.findIndex(u => u.id === usuarioActualizado.id);
    if (index !== -1) {
      this._usuarios[index] = { ...usuarioActualizado };
      this.guardarEnLocalStorage();
    }
  }

  cambiarEstado = (id: number, nuevoEstado: boolean): void => {
    const usuario = this._usuarios.find(u => u.id === id);
    if (usuario) {
      usuario.estado = nuevoEstado;
      this.guardarEnLocalStorage();
    }
  }

  getUsuarioActivoPorNombreYPassword(nombre: string, password: string): Usuarios | null {
    const usuario = this._usuarios.find(
      u => u.nombre_usuario === nombre && u.password === password && u.estado
    );
    return usuario || null;
  }

}
