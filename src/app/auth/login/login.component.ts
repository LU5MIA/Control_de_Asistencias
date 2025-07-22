import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuarios } from '../../interfaces/usuarios';
import { Empleados } from '../../interfaces/empleados';
import { UsuariosService } from '../../servicios/usuarios.service';
import { EmpleadosService } from '../../servicios/empleados.service';
import { HorariosService } from '../../servicios/horarios.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  usuario: string = '';
  password: string = '';

  usuarios: Usuarios[] = [];
  empleados: Empleados[] = [];

  constructor(
    private router: Router,
    private usuariosService: UsuariosService,
    private empleadosService: EmpleadosService,
    private horariosService: HorariosService
  ) { }

  ngOnInit(): void {
    // Cargar los datos desde los servicios
    this.usuarios = this.usuariosService.usuario; // o getUsuarios() si usas métodos
    this.empleados = this.empleadosService.empleado; // o getEmpleados()
  }

  onSubmit(form: any): void {
    if (form.invalid) {
      alert('Por favor, completa todos los campos');
      return;
    }

    const usuarioEncontrado = this.usuarios.find(
      u => u.nombre_usuario === this.usuario &&
        u.password === this.password &&
        u.estado === true
    );

    if (usuarioEncontrado) {
      const empleado = this.empleados.find(e => e.id === usuarioEncontrado.id_empleado);

      localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioEncontrado));

      // ✅ Traducción de id_rol a texto
      let rolTexto = '';
      switch (usuarioEncontrado.id_rol) {
        case 1:
          rolTexto = 'Administrador';
          this.router.navigate(['/dashboard/panel-control']);
          break;
        case 2:
          rolTexto = 'Empleado';
          this.router.navigate(['/dashboard/asistencias/registro']);
          break;
        default:
          rolTexto = 'desconocido';
          break;
      }

      localStorage.setItem('rolUsuario', rolTexto);

      if (empleado) {
        const nombreCompleto = `${empleado.nombre} ${empleado.ape_p} ${empleado.ape_m}`;
        localStorage.setItem('nombreUsuario', nombreCompleto);
        localStorage.setItem('empleadoLogueado', JSON.stringify(empleado));

        const horarioEmpleado = this.horariosService.horario.find(
          h => h.id === empleado.id_horario
        );

        if (horarioEmpleado) {
          localStorage.setItem('horarioEmpleado', JSON.stringify(horarioEmpleado));
        }
      }

      console.log('Login correcto. Redirigiendo...');
    } else {
      alert('Usuario o contraseña incorrectos, o cuenta desactivada.');
    }
  }





}
