import { Component } from '@angular/core';
import { Asistencia } from '../../../interfaces/asistencia';
import { AsistenciaService } from '../../../servicios/asistencia.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-informe',
  standalone: false,
  templateUrl: './informe.component.html',
  styleUrl: './informe.component.css'
})
export class InformeComponent {
  tipoSeleccionado: '' | 'Entrada' | 'Salida' | 'Completas' = 'Entrada';
  fechaSeleccionada: string = '';
  asistenciasFiltradas: Asistencia[] = [];
  asistenciasEmpleado: Asistencia[] = [];

  constructor(private asistenciaService: AsistenciaService, private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarAsistencias();

    // 🔁 Refrescar cuando se vuelve a este componente
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.cargarAsistencias();
      });
  }

  cargarAsistencias() {
    const empleadoStr = localStorage.getItem('empleadoLogueado');
    if (empleadoStr) {
      const empleado = JSON.parse(empleadoStr);
      const idEmpleado = empleado.id;

      this.asistenciasEmpleado = this.asistenciaService.asistencias.filter(
        asistencia => asistencia.id_empleado === idEmpleado
      );
    }

    this.filtrarAsistencias();
  }

  filtrarAsistencias() {
    let filtradas: Asistencia[] = this.asistenciasEmpleado;

    if (!this.tipoSeleccionado || this.tipoSeleccionado === 'Completas') {
      const asistenciasPorFecha: {
        [fecha: string]: { entrada?: Asistencia; salida?: Asistencia };
      } = {};

      for (const a of filtradas) {
        const fecha = a.marcacion.substring(0, 10);
        if (!asistenciasPorFecha[fecha]) {
          asistenciasPorFecha[fecha] = {};
        }

        if (a.tipo === 'Entrada' && !asistenciasPorFecha[fecha].entrada) {
          asistenciasPorFecha[fecha].entrada = a;
        }

        if (a.tipo === 'Salida' && !asistenciasPorFecha[fecha].salida) {
          asistenciasPorFecha[fecha].salida = a;
        }
      }

      filtradas = Object.values(asistenciasPorFecha)
        .filter(dia => dia.entrada && dia.salida)
        .flatMap(dia => [dia.entrada!, dia.salida!]);
    } else {
      filtradas = filtradas.filter(a => a.tipo === this.tipoSeleccionado);
    }

    if (this.fechaSeleccionada) {
      filtradas = filtradas.filter(a =>
        a.marcacion.startsWith(this.fechaSeleccionada)
      );
    }

    this.asistenciasFiltradas = filtradas;
  }





}
