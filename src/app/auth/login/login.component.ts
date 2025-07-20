import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  usuario: string = '';
  password: string = '';

  usuariosValidos = [
    { usuario: 'lucero', password: '1234' },
    { usuario: 'juan', password: 'admin123' },
    { usuario: 'maria', password: 'maria2025' },
    { usuario: 'carlos', password: 'pass456' }
  ];

  constructor(private router: Router) {}

  onSubmit(form: any) {

    if (form.invalid) {
      alert('Por favor, completa todos los campos');
      return;
    }

    const usuarioEncontrado = this.usuariosValidos.find(
      u => u.usuario === this.usuario && u.password === this.password
    );

    if (usuarioEncontrado) {
      console.log('Login correcto. Redirigiendo...');
      localStorage.setItem('nombreUsuario', usuarioEncontrado.usuario); // <--- Guardar el nombre
      window.location.href = '/dashboard/cargos';
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }

}
