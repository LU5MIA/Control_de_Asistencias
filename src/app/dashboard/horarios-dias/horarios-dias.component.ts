import { Component, OnInit } from '@angular/core';
import { Dias } from '../../interfaces/dias';
import { Horarios } from '../../interfaces/horarios';
import { DiasService } from '../../servicios/dias.service';
import { HorariosService } from '../../servicios/horarios.service';
import { HorariosDiasService } from '../../servicios/horarios-dias.service';

@Component({
  selector: 'app-horarios-dias',
  standalone: false,
  templateUrl: './horarios-dias.component.html',
  styleUrl: './horarios-dias.component.css'
})
export class HorariosDiasComponent implements OnInit {

  dias: Dias[] = [];
  filtro: string = '';
  horarios: Horarios[] = [];
  idDiaSeleccionado: number = 0;
  diaSeleccionadoId: number = 0;
  horariosSeleccionados: number[] = [];
  mostrarForm = false; // Mostrar u ocultar el modal
  horariosSeleccionadosMap: { [id: number]: boolean } = {}; // Para los checkboxes

  constructor(
    private diasService: DiasService,
    private horariosService: HorariosService,
    private diasHorariosService: HorariosDiasService
  ) { }

  get dia(): Dias[] {
    return this.diasService.dia;
  }

  get horario(): Horarios[] {
    return this.horariosService.horario;
  }

  horariosFiltradosDelDiaSeleccionado(): Horarios[] {
    if (!this.diaSeleccionadoId) return [];

    const idsHorariosAsignados = this.diasHorariosService.getHorariosPorDia(this.diaSeleccionadoId);

    return this.horarios
      .filter(h =>
        idsHorariosAsignados.includes(h.id) &&
        h.turno.toLowerCase().includes(this.filtro.trim().toLowerCase())
      );
  }

  ngOnInit() {
    // Filtrar solo días y horarios activos
    this.dias = this.dia.filter(d => d.estado);
    this.horarios = this.horario.filter(h => h.estado);

    // Buscar lunes o el primer día activo disponible
    const diaLunes = this.dias.find(d => d.nombre.toLowerCase() === 'lunes');
    const diaInicial = diaLunes || this.dias[0]; // Usa lunes si existe, si no el primero

    if (diaInicial) {
      this.diaSeleccionadoId = diaInicial.id;
      this.seleccionarDia(diaInicial.id);
    }
  }


  seleccionarDia(idDia: number) {
    this.idDiaSeleccionado = idDia;
    this.diaSeleccionadoId = idDia;
    this.horariosSeleccionados = this.diasHorariosService.getHorariosPorDia(idDia);

    this.horariosSeleccionadosMap = {};
    for (const idHorario of this.horariosSeleccionados) {
      this.horariosSeleccionadosMap[idHorario] = true;
    }

    this.filtro = '';
  }

  toggleHorario(idHorario: number) {
    if (this.horariosSeleccionados.includes(idHorario)) {
      this.horariosSeleccionados = this.horariosSeleccionados.filter(h => h !== idHorario);
    } else {
      this.horariosSeleccionados.push(idHorario);
    }
  }

  editarAsignacion(idDia: number) {
    this.diaSeleccionadoId = idDia;
    this.mostrarForm = true;

    // Cargar los horarios asignados al día en el mapa de checkboxes
    const horariosAsignados = this.diasHorariosService.getHorariosPorDia(idDia);
    this.horariosSeleccionadosMap = {};

    for (const horario of this.horarios) {
      this.horariosSeleccionadosMap[horario.id] = horariosAsignados.includes(horario.id);
    }
  }

  guardarAsignacion() {
    const horariosSeleccionados: number[] = Object.keys(this.horariosSeleccionadosMap)
      .filter(id => this.horariosSeleccionadosMap[+id])
      .map(id => +id);

    this.diasHorariosService.asignarHorarios(this.diaSeleccionadoId, horariosSeleccionados);
    this.mostrarForm = false;
    alert("Horarios actualizados correctamente");
  }

  eliminarHorario(idDia: number, idHorario: number) {
    const confirmado = confirm('¿Estás segura de que deseas eliminar este horario?');

    if (confirmado) {
      this.diasHorariosService.eliminarAsignacion(idDia, idHorario);
      this.horariosSeleccionados = this.diasHorariosService.getHorariosPorDia(idDia);
    }
  }

  cerrarFormulario() {
    this.mostrarForm = false;
    this.horariosSeleccionadosMap = {};
  }
}
