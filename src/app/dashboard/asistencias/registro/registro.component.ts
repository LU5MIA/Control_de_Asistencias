import { Component, OnInit } from '@angular/core';
import { Asistencia } from '../../../interfaces/asistencia';

@Component({
  selector: 'app-registro',
  standalone: false,
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {
  horarioEmpleado: any = null;
  horaActual: string = '';
  private intervalId: any;
  nombreArchivo: string = '';
  yaMarcoEntrada: boolean = false;
  asistenciaCompletaHoy: boolean = false;
  registroAbierto: boolean = true;


  asistencia: Asistencia = {
    id_asistencia: 0, // lo generaremos dinámicamente
    id_empleado: 0,
    marcacion: '',
    tipo: 'Entrada',
    foto: '',
    estado: 'Registrado'
  };

  ngOnInit(): void {
    this.obtenerEmpleadoDesdeStorage();     // 👈 PRIMERO: obtén al empleado
    this.obtenerHorarioEmpleado();          // 👈 DESPUÉS: ya tienes el id, ahora sí puedes buscar el horario
    this.verificarAsistenciaDeHoy();        // (esto depende del horario, así que también después)
    this.generarIdAsistencia();
    this.actualizarHora();
    this.verificarHorarioPermitido();
    this.intervalId = setInterval(() => {
      this.actualizarHora();
      this.verificarHorarioPermitido();
    }, 1000);
  }


  obtenerHorarioEmpleado(): void {
    const empleados = JSON.parse(localStorage.getItem('empleados') || '[]');
    const empleado = empleados.find((e: any) => e.id === this.asistencia.id_empleado);

    if (!empleado) {
      console.warn('⚠️ No se encontró al empleado con id:', this.asistencia.id_empleado);
      return;
    }

    const horarios = JSON.parse(localStorage.getItem('horarios') || '[]');
    this.horarioEmpleado = horarios.find((h: any) => h.id === empleado.id_horario);

    if (!this.horarioEmpleado) {
      console.warn('⚠️ No se encontró un horario para el empleado con id_horario:', empleado.id_horario);
    }
  }

  verificarAsistenciaDeHoy(): void {
    const asistencias = JSON.parse(localStorage.getItem('asistencias') || '[]');
    const hoy = new Date();
    const hoyStr = `${this.padCero(hoy.getDate())}/${this.padCero(hoy.getMonth() + 1)}/${hoy.getFullYear()}`;

    const entradasHoy = asistencias.filter((a: Asistencia) =>
      a.id_empleado === this.asistencia.id_empleado &&
      a.tipo === 'Entrada' &&
      a.marcacion.startsWith(hoyStr)
    );

    const salidasHoy = asistencias.filter((a: Asistencia) =>
      a.id_empleado === this.asistencia.id_empleado &&
      a.tipo === 'Salida' &&
      a.marcacion.startsWith(hoyStr)
    );

    this.yaMarcoEntrada = entradasHoy.length > 0;
    this.asistenciaCompletaHoy = entradasHoy.length > 0 && salidasHoy.length > 0;

    // Determinar el tipo según si ya marcó entrada
    if (this.asistenciaCompletaHoy) {
      this.asistencia.tipo = ''; // ya no se necesita
    } else if (this.yaMarcoEntrada) {
      this.asistencia.tipo = 'Salida';
    } else {
      this.asistencia.tipo = 'Entrada';
    }
  }

  verificarHorarioPermitido(): void {
    const ahora = new Date();
    const hora = ahora.getHours();

    // 🕐 Permitir marcar asistencia solo entre 5:00 AM y 11:00 PM
    if (hora < 10 || hora >= 24) {
      this.registroAbierto = false;
    } else {
      this.registroAbierto = true;
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  obtenerEmpleadoDesdeStorage(): void {
    const empleado = JSON.parse(localStorage.getItem('empleadoLogueado') || '{}');
    if (empleado && empleado.id) {
      this.asistencia.id_empleado = empleado.id;
    } else {
      console.warn('No se encontró información del empleado en el localStorage.');
    }
  }

  generarIdAsistencia(): void {
    const asistencias = JSON.parse(localStorage.getItem('asistencias') || '[]');
    const nuevoId = asistencias.length > 0
      ? Math.max(...asistencias.map((a: Asistencia) => a.id_asistencia)) + 1
      : 1;

    this.asistencia.id_asistencia = nuevoId;
  }

  actualizarHora(): void {
    const ahora = new Date();
    const dia = this.padCero(ahora.getDate());
    const mes = this.padCero(ahora.getMonth() + 1);
    const anio = ahora.getFullYear();
    const horas = this.padCero(ahora.getHours());
    const minutos = this.padCero(ahora.getMinutes());
    const segundos = this.padCero(ahora.getSeconds());

    this.horaActual = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
    this.asistencia.marcacion = this.horaActual;
  }

  padCero(valor: number): string {
    return valor < 10 ? '0' + valor : valor.toString();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const archivo = input.files[0];
      this.nombreArchivo = archivo.name;

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        this.asistencia.foto = base64.startsWith('data:image') ? base64 : `data:image/jpeg;base64,${base64}`;
      };
      reader.readAsDataURL(archivo);
    } else {
      this.nombreArchivo = '';
      this.asistencia.foto = '';
    }
  }

  marcarAsistencia(): void {
    if (!this.asistencia.id_empleado) {
      alert('No se encontró al empleado. Vuelve a iniciar sesión.');
      return;
    }

    if (!this.asistencia.foto) {
      alert('Por favor selecciona una foto.');
      return;
    }

    const horaActual = new Date();
    const horaActualStr = `${this.padCero(horaActual.getHours())}:${this.padCero(horaActual.getMinutes())}`;

    const horario = this.horarioEmpleado; // asegúrate de tenerlo cargado

    if (this.asistencia.tipo === 'Entrada') {
      this.asistencia.estado = (horaActualStr > horario.hora_entrada) ? 'Tarde' : 'Registrado';
    } else if (this.asistencia.tipo === 'Salida') {
      this.asistencia.estado = (horaActualStr > horario.hora_salida) ? 'Tarde' : 'Registrado';
    }

    // Guardar en localStorage
    const asistencias = JSON.parse(localStorage.getItem('asistencias') || '[]');
    asistencias.push({ ...this.asistencia });
    localStorage.setItem('asistencias', JSON.stringify(asistencias));

    console.log('✅ Asistencia registrada:', this.asistencia);
    alert('✅ Asistencia registrada correctamente.');

    // Limpiar campos
    this.nombreArchivo = '';
    this.asistencia.foto = '';
    this.generarIdAsistencia();
  }

}
