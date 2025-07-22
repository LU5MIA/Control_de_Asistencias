import { Component, OnInit } from '@angular/core';
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
export class InformeComponent implements OnInit {
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

      const asistencias = JSON.parse(localStorage.getItem('asistencias') || '[]');
      this.asistenciasEmpleado = asistencias.filter(
        (asistencia: any) => asistencia.id_empleado === idEmpleado
      );
    }

    this.filtrarAsistencias();
  }


  filtrarAsistencias() {
    let filtradas: Asistencia[] = this.asistenciasEmpleado;

    // Filtrar por fecha seleccionada
    if (this.fechaSeleccionada) {
      filtradas = filtradas.filter(a => {
        if (!a.marcacion) return false;

        // Extraer la parte de la fecha de a.marcacion (dd/MM/yyyy)
        const fechaMarcacion = a.marcacion.split(' ')[0]; // "21/07/2025"

        // Convertir this.fechaSeleccionada (YYYY-MM-DD) a dd/MM/yyyy
        const fechaSeleccionadaParts = this.fechaSeleccionada.split('-'); // ["YYYY", "MM", "DD"]
        const fechaSeleccionadaFormatted = `${fechaSeleccionadaParts[2]}/${fechaSeleccionadaParts[1]}/${fechaSeleccionadaParts[0]}`; // dd/MM/yyyy

        return fechaMarcacion === fechaSeleccionadaFormatted;
      });
    }

    // Filtrar por tipo
    if (!this.tipoSeleccionado) {
      const asistenciasPorFecha: {
        [fecha: string]: { entrada?: Asistencia; salida?: Asistencia };
      } = {};

      for (const a of filtradas) {
        if (!a.marcacion) continue;
        // Usar la fecha original (dd/MM/yyyy) para agrupar
        const fecha = a.marcacion.split(' ')[0]; // "21/07/2025"
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

    this.asistenciasFiltradas = filtradas;

    // Depuración
    console.log('Fecha seleccionada (dd/MM/yyyy):', this.fechaSeleccionada ?
      `${this.fechaSeleccionada.split('-')[2]}/${this.fechaSeleccionada.split('-')[1]}/${this.fechaSeleccionada.split('-')[0]}` : null);
    console.log('Asistencias filtradas:', filtradas);
  }

}
