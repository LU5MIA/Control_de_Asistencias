import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../../interfaces/usuarios';
import { Empleados } from '../../interfaces/empleados';

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

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');
    const empleadoGuardado = localStorage.getItem('empleadoLogueado');

    if (usuarioGuardado && empleadoGuardado) {
      this.usuarioLogueado = JSON.parse(usuarioGuardado);
      this.empleadoLogueado = JSON.parse(empleadoGuardado);
    }
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result as string;
        this.fotoBase64 = base64; // <- Esto permite que se muestre
        localStorage.setItem('fotoUsuario', base64);
        this.nombreArchivo = file.name;
      };

      reader.readAsDataURL(file); // convierte la imagen a base64
    }
  }



}
