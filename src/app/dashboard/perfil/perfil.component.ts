import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../../interfaces/usuarios';
import { Empleados } from '../../interfaces/empleados';
import { UsuariosService } from '../../servicios/usuarios.service';
import { EmpleadosService } from '../../servicios/empleados.service';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  nombreArchivo: string = '';
  fotoBase64: string | null = localStorage.getItem('fotoUsuario');
  usuarioLogueado: Usuarios | null = null;
  empleadoLogueado: Empleados | null = null;
  modoEdicion: boolean = false;
  mostrarPassword: boolean = false;
  fotoOriginal: string | null = null;
  usuarioOriginal: any = null;
  empleadoOriginal: any = null;



  constructor(
    private usuarioService: UsuariosService,
    private empleadosService: EmpleadosService,
  ) { }

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');
    const empleadoGuardado = localStorage.getItem('empleadoLogueado');

    if (usuarioGuardado && empleadoGuardado) {
      this.usuarioLogueado = JSON.parse(usuarioGuardado);
      this.empleadoLogueado = JSON.parse(empleadoGuardado);

      if (this.usuarioLogueado) {
        const claveFoto = 'fotoUsuario_' + this.usuarioLogueado.id;
        this.fotoBase64 = localStorage.getItem(claveFoto);
      }
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0 && this.usuarioLogueado) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result as string;
        const claveFoto = 'fotoUsuario_' + this.usuarioLogueado!.id;

        this.fotoBase64 = base64;
        localStorage.setItem(claveFoto, base64);
        this.nombreArchivo = file.name;
      };

      reader.readAsDataURL(file);
    }
  }

  activarEdicion() {
    this.modoEdicion = true;
  }

  actualizarPerfil() {
    const usuarioActual = JSON.stringify(this.usuarioLogueado);
    const empleadoActual = JSON.stringify(this.empleadoLogueado);

    const cambiosUsuario = usuarioActual !== this.usuarioOriginal;
    const cambiosEmpleado = empleadoActual !== this.empleadoOriginal;
    const cambiosFoto = this.fotoBase64 !== this.fotoOriginal;

    if (cambiosUsuario || cambiosEmpleado || cambiosFoto) {
      if (this.usuarioLogueado && this.empleadoLogueado) {
        this.usuarioService.actualizar(this.usuarioLogueado);
        this.empleadosService.actualizar(this.empleadoLogueado);

        localStorage.setItem('usuarioLogueado', JSON.stringify(this.usuarioLogueado));
        localStorage.setItem('empleadoLogueado', JSON.stringify(this.empleadoLogueado));

        // Actualiza backups
        this.usuarioOriginal = usuarioActual;
        this.empleadoOriginal = empleadoActual;
        this.fotoOriginal = this.fotoBase64;

        alert('✅ Perfil actualizado correctamente');
        console.log('Perfil actualizado correctamente');
      }
    } else {
      alert('ℹ️ No se detectaron cambios');
    }

    this.modoEdicion = false;
  }

}
