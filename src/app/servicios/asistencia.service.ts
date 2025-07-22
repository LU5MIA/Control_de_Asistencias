import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
      marcacion: "11/05/2025 08:00:00",
      tipo: "Entrada",
      foto: "foto5.jpg",
      estado: 'Registrado'
    },
    {
      id_asistencia: 2,
      id_empleado: 2,
      marcacion: "11/05/2025 08:00:00",
      tipo: "Salida",
      foto: "foto2.jpg",
      estado: 'Tarde'
    },
    {
      id_asistencia: 3,
      id_empleado: 3,
      marcacion: "11/05/2025 20:00:00",
      tipo: "Salida",
      foto: "foto3.jpg",
      estado: 'Tarde'
    },
    {
      id_asistencia: 4,
      id_empleado: 4,
      marcacion: "11/05/2025 08:30:00",
      tipo: "Entrada",
      foto: "foto4.jpg",
      estado: 'Tarde'
    },
  ];

  // BehaviorSubject para emitir cambios en las asistencias
  private _asistenciaSubject = new BehaviorSubject<Asistencia[]>(this._asistencia);
  public asistencias$ = this._asistenciaSubject.asObservable();


  // Getter
  get asistencias(): Asistencia[] {
    return [...this._asistencia];
  }

  // Obtener cantidad de entradas
  get cantidadEntradas(): number {
    return this._asistencia.filter(a => a.tipo === 'Entrada').length;
  }

  // Obtener cantidad de salidas
  get cantidadSalidas(): number {
    return this._asistencia.filter(a => a.tipo === 'Salida').length;
  }

  // Obtener cantidad de asistencias completas
  get cantidadCompletas(): number {
    const entradas = this._asistencia.filter(a => a.tipo === 'Entrada');
    const salidas = this._asistencia.filter(a => a.tipo === 'Salida');

    const completados = new Set<string>();

    for (const entrada of entradas) {
      const empId = entrada.id_empleado;
      const [day, month, year] = entrada.marcacion.split(' ')[0].split('/');
      const fechaEntrada = `${year}-${month}-${day}`; // Convertir a YYYY-MM-DD
      const tieneSalida = salidas.some(salida => {
        const [sDay, sMonth, sYear] = salida.marcacion.split(' ')[0].split('/');
        const fechaSalida = `${sYear}-${sMonth}-${sDay}`;
        return salida.id_empleado === empId && fechaSalida === fechaEntrada;
      });

      if (tieneSalida) {
        completados.add(`${empId}-${fechaEntrada}`);
      }
    }

    return completados.size;
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
    this._asistenciaSubject.next([...this._asistencia]); // Notificar cambios
    this.guardarAsistenciasEnLocalStorage();
  }

  // Guardar en localStorage
  private guardarAsistenciasEnLocalStorage(): void {
    localStorage.setItem('asistencias', JSON.stringify(this._asistencia));
  }

  // Cargar desde localStorage y fusionar con las existentes
  public cargarAsistenciasDesdeLocalStorage(): void {
    const asistenciasLocal: Asistencia[] = JSON.parse(localStorage.getItem('asistencias') || '[]');
    console.log('Asistencias desde localStorage:', asistenciasLocal);

    // Fusionar sin duplicados basados en id_asistencia
    const existingIds = new Set(this._asistencia.map(a => a.id_asistencia));
    this._asistencia = [
      ...this._asistencia.filter(a => !asistenciasLocal.some(al => al.id_asistencia === a.id_asistencia)),
      ...asistenciasLocal
    ];
    console.log('Asistencias fusionadas:', this._asistencia);

    // Actualizar _nextId basado en el mayor id_asistencia
    const maxId = Math.max(...this._asistencia.map(a => a.id_asistencia), this._nextId);
    this._nextId = maxId + 1;
    console.log('Nuevo _nextId:', this._nextId);

    // Notificar cambios
    this._asistenciaSubject.next([...this._asistencia]);
  }

  // Llamar al cargar el servicio
  constructor(
    private empleadoService: EmpleadosService,
    private horarioService: HorariosService
  ) {
    this.cargarAsistenciasDesdeLocalStorage();
  }
}