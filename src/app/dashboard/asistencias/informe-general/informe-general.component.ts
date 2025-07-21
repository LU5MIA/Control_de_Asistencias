import { Component, OnInit } from '@angular/core';
import { Asistencia } from '../../../interfaces/asistencia';
import { AsistenciaService } from '../../../servicios/asistencia.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { EmpleadosService } from '../../../servicios/empleados.service';
import { Empleados } from '../../../interfaces/empleados';

@Component({
  selector: 'app-informe-general',
  standalone: false,
  templateUrl: './informe-general.component.html',
  styleUrls: ['./informe-general.component.css']
})
export class InformeGeneralComponent implements OnInit {
  tipoSeleccionado: '' | 'Entrada' | 'Salida' | 'Completas' = 'Entrada';
  fechaSeleccionada: string = '';
  asistenciasFiltradas: Asistencia[] = [];

  constructor(
    private asistenciaService: AsistenciaService,
    private empleadoService: EmpleadosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarAsistencias();

    // Refrescar al volver a este componente
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.cargarAsistencias();
      });
  }

  get empleados(): Empleados[] {
      return this.empleadoService.empleado;
    }

  getNombreEmpleado(id_empleado: number): string {
    const empleado = this.empleados.find(e => e.id === id_empleado);
    return empleado ? `${empleado.nombre} ${empleado.ape_p} ${empleado.ape_m}` : 'Desconocido';
  }

  cargarAsistencias() {
    // Obtenemos todas las asistencias
    let asistencias = this.asistenciaService.asistencias;

    if (!this.tipoSeleccionado || this.tipoSeleccionado === 'Completas') {
      const asistenciasPorFechaEmpleado: {
        [clave: string]: { entrada?: Asistencia; salida?: Asistencia };
      } = {};

      for (const a of asistencias) {
        const fecha = a.marcacion.substring(0, 10);
        const clave = `${a.id_empleado}-${fecha}`;

        if (!asistenciasPorFechaEmpleado[clave]) {
          asistenciasPorFechaEmpleado[clave] = {};
        }

        if (a.tipo === 'Entrada' && !asistenciasPorFechaEmpleado[clave].entrada) {
          asistenciasPorFechaEmpleado[clave].entrada = a;
        }

        if (a.tipo === 'Salida' && !asistenciasPorFechaEmpleado[clave].salida) {
          asistenciasPorFechaEmpleado[clave].salida = a;
        }
      }

      asistencias = Object.values(asistenciasPorFechaEmpleado)
        .filter(dia => dia.entrada && dia.salida)
        .flatMap(dia => [dia.entrada!, dia.salida!]);
    } else {
      asistencias = asistencias.filter(a => a.tipo === this.tipoSeleccionado);
    }

    

    if (this.fechaSeleccionada) {
      asistencias = asistencias.filter(a =>
        a.marcacion.startsWith(this.fechaSeleccionada)
      );
    }

    this.asistenciasFiltradas = asistencias;
  }
}
