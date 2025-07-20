import { Component } from '@angular/core';
import { HorariosService } from '../../servicios/horarios.service';
import { Horarios } from '../../interfaces/horarios';

@Component({
  selector: 'app-horarios',
  standalone: false,
  templateUrl: './horarios.component.html',
  styleUrl: './horarios.component.css'
})
export class HorariosComponent {

  horarioOriginal: Horarios | null = null;
  filtro: string = '';
  mostrarForm = false; // controla la visibilidad
  editando: boolean = false;

  constructor(private horarioService: HorariosService) { }

  horario: Horarios = {
    id: 0,
    turno: '',
    modalidad: '',
    hora_entrada: '',
    tolerancia: 0,
    hora_salida: '',
    estado: true,
  }

  get horarios(): Horarios[] {
    return this.horarioService.horario
  }

  get horariosFiltrados(): Horarios[] {
    const termino = this.filtro.trim().toLowerCase();
    return this.horarioService.horario.filter(horario =>
      horario.turno.toLowerCase().includes(termino)
    );
  }

  add = () => {
    const modalidad = this.horario.modalidad.trim();
    const turno = this.horario.turno.trim();
    const hora_entrada = this.horario.hora_entrada.trim();
    const tolerancia = this.horario.tolerancia;
    const hora_salida = this.horario.hora_salida.trim();
    if (turno.length === 0 || modalidad.length === 0 || hora_entrada.length === 0 || hora_salida.length === 0) {
      alert('Debes completar todos los campos del formulario');
      return;
    };

    if (hora_salida <= hora_entrada) {
      alert('La hora de salida debe ser posterior a la hora de entrada');
      return;
    }

    if (tolerancia <= 0) {
      alert('La tolerancia debe ser mayor a 0');
      return;
    }

    const yaExiste = this.horarioService.horario.some(h =>
      h.hora_entrada === this.horario.hora_entrada &&
      h.hora_salida === this.horario.hora_salida
    );

    if (yaExiste) {
      alert('Ya existe un horario con esa hora de entrada y salida');
      return;
    }

    this.horarioService.add(this.horario);
    this.cerrarFormulario();
  };

  editarhorario = (horario: Horarios) => {
    this.horario = { ...horario }; // copia los datos del horario a editar
    this.horarioOriginal = { ...horario };
    this.mostrarForm = true;
    this.editando = true;
  };

  actualizar = () => {
    const turno = this.horario.turno.trim();
    const modalidad = this.horario.modalidad.trim();
    const hora_entrada = this.horario.hora_entrada.trim();
    const hora_salida = this.horario.hora_salida.trim();
    const tolerancia = this.horario.tolerancia;

    if (
      turno.length === 0 ||
      modalidad.length === 0 ||
      hora_entrada.length === 0 ||
      hora_salida.length === 0
    ) {
      alert('Debes completar todos los campos del formulario');
      return;
    }

    if (tolerancia <= 0) {
      alert('La tolerancia debe ser mayor a 0');
      return;
    }

    if (hora_salida <= hora_entrada) {
      alert('La hora de salida debe ser posterior y diferente a la hora de entrada');
      return;
    }

    if (
      this.horarioOriginal &&
      this.horario.turno === this.horarioOriginal.turno &&
      this.horario.modalidad === this.horarioOriginal.modalidad &&
      this.horario.hora_entrada === this.horarioOriginal.hora_entrada &&
      this.horario.tolerancia === this.horarioOriginal.tolerancia &&
      this.horario.hora_salida === this.horarioOriginal.hora_salida &&
      this.horario.estado === this.horarioOriginal.estado
    ) {
      alert('No se realizaron cambios');
      return;
    }

    const yaExiste = this.horarioService.horario.some(h =>
      h.id !== this.horario.id &&
      h.hora_entrada === hora_entrada &&
      h.hora_salida === hora_salida
    );

    if (yaExiste) {
      alert('Ya existe otro horario con esa hora de entrada y salida');
      return;
    }

    this.horarioService.actualizar(this.horario);
    this.cerrarFormulario();
    this.horarioOriginal = null;
  };


  activarHorario(horario: Horarios): void {
    this.horarioService.cambiarEstado(horario.id, true);
    horario.estado = true;
  }

  desactivarHorario(horario: Horarios): void {
    this.horarioService.cambiarEstado(horario.id, false);
    horario.estado = false;
  }

  abrirFormularioAgregar = () => {
    this.horario = { id: 0, turno: '', modalidad: '', hora_entrada: '', tolerancia: 0, hora_salida: '', estado: true };
    this.editando = false;
    this.mostrarForm = true;
  };

  cerrarFormulario = () => {
    this.horario = { id: 0, turno: '', modalidad: '', hora_entrada: '', tolerancia: 0, hora_salida: '', estado: true };
    this.mostrarForm = false;
    this.editando = false;
  };


}
