import { Injectable } from '@angular/core';
import { Asistencia } from '../interfaces/asistencia';
import { EmpleadosService } from './empleados.service';
import { HorariosService } from './horarios.service';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  private _nextId = 5;

  private _asistencia: Asistencia[] = [
    {
      id_asistencia: 1,
      id_empleado: 1,
      marcacion: "2025-05-11 08:00:00",
      tipo: "Entrada",
      foto: "foto5.jpg",
      estado: 'Registrado'
    },
    {
      id_asistencia: 2,
      id_empleado: 2,
      marcacion: "2025-05-11 08:00:00",
      tipo: "Salida",
      foto: "foto2.jpg",
      estado: 'Tarde'
    },
    {
      id_asistencia: 3,
      id_empleado: 3,
      marcacion: "2025-05-11 20:00:00",
      tipo: "Salida",
      foto: "foto3.jpg",
      estado: 'Tarde'
    },
    {
      id_asistencia: 4,
      id_empleado: 4,
      marcacion: "2025-05-11 08:30:00",
      tipo: "Entrada",
      foto: "foto4.jpg",
      estado: 'Tarde'
    },
  ];

  constructor(
    private empleadoService: EmpleadosService,
    private horarioService: HorariosService
  ) {
    this.cargarAsistenciasDesdeLocalStorage();
  }

  // Getter
  get asistencias(): Asistencia[] {
    return [...this._asistencia];
  }

  // Agregar nueva asistencia
  addAsistencia(idEmpleado: number, tipo: 'Entrada' | 'Salida', fotoBase64: string) {
    const empleado = this.empleadoService.empleado.find(e => e.id === idEmpleado);
    const horario = this.horarioService.horario.find(h => h.id === empleado?.id_horario);
    if (!empleado || !horario) return;

    const ahora = new Date();
    const horaActual = ahora.toTimeString().substring(0, 5); // HH:mm

    let estado: '' | 'Registrado' | 'Tarde' | 'Justificacion' = 'Registrado';
    if (tipo === 'Entrada') {
      estado = horaActual <= horario.hora_entrada ? 'Registrado' : 'Tarde';
    } else if (tipo === 'Salida') {
      estado = horaActual >= horario.hora_salida ? 'Registrado' : 'Tarde';
    }

    const nuevaAsistencia: Asistencia = {
      id_asistencia: this._nextId++,
      id_empleado: empleado.id,
      marcacion: ahora.toISOString(),
      tipo,
      foto: fotoBase64,
      estado
    };

    this._asistencia.push(nuevaAsistencia);
    this.guardarAsistenciasEnLocalStorage();
  }

  // Guardar en localStorage
  private guardarAsistenciasEnLocalStorage(): void {
    localStorage.setItem('asistencias', JSON.stringify(this._asistencia));
  }

  // Cargar desde localStorage y fusionar con las existentes
  private cargarAsistenciasDesdeLocalStorage(): void {
    const datos = localStorage.getItem('asistencias');
    const asistenciasLocal: Asistencia[] = JSON.parse(localStorage.getItem('asistencias') || '[]');


    // Fusionar sin duplicados
    this._asistencia = [
      ...this._asistencia,
      ...asistenciasLocal.filter(aLocal =>
        !this._asistencia.some(aExistente => aExistente.id_asistencia === aLocal.id_asistencia)
      )
    ];
  }
}
