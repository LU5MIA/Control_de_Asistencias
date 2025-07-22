import { Component } from '@angular/core';
import { Empleados } from '../../../interfaces/empleados';
import { EmpleadosService } from '../../../servicios/empleados.service';
import { HorariosService } from '../../../servicios/horarios.service';
import { DepartamentosService } from '../../../servicios/departamentos.service';
import { CargosService } from '../../../servicios/cargos.service';
import { Horarios } from '../../../interfaces/horarios';
import { Departamentos } from '../../../interfaces/departamentos';
import { Cargos } from '../../../interfaces/cargos';

@Component({
  selector: 'app-empleados',
  standalone: false,
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent {
  EmpleadoOriginal: Empleados | null = null;
  filtro: string = '';
  mostrarForm = false;
  editando = false;

  constructor(
    private empleadosService: EmpleadosService,
    private horarioService: HorariosService,
    private dptoService: DepartamentosService,
    private cargosService: CargosService
  ) { }

  empleado: Empleados = {
    id: 0,
    dni: 0,
    nombre: '',
    ape_p: '',
    ape_m: '',
    correo: '',
    id_horario: 0,
    id_departamento: 0,
    id_cargo: 0,
    estado: true
  };

  get horario(): Horarios[] {
    return this.horarioService.horario;
  }

  get dpto(): Departamentos[] {
    return this.dptoService.departamentos;
  }

  get cargo(): Cargos[] {
    return this.cargosService.cargos;
  }

  getHorarioTexto(id: number): string {
    const h = this.horario.find(h => h.id === id);
    return h ? `${h.hora_entrada} - ${h.hora_salida}` : 'Sin horario';
  }

  getNombreDepartamento(id: number): string {
    const d = this.dpto.find(d => d.id === id);
    return d ? d.nombre : 'Sin departamento';
  }

  getNombreCargo(id: number): string {
    const c = this.cargo.find(c => c.id === id);
    return c ? c.nombre : 'Sin cargo';
  }

  get empleadosFiltrados(): Empleados[] {
    const termino = this.filtro.trim().toLowerCase();
    return this.empleadosService.empleado.filter(e =>
      `${e.nombre} ${e.ape_p} ${e.ape_m}`.toLowerCase().includes(termino) ||
      e.dni.toString().includes(termino) ||
      e.correo.toLowerCase().includes(termino)
    );
  }

  abrirFormularioAgregar = () => {
    this.empleado = {
      id: 0,
      dni: 0,
      nombre: '',
      ape_p: '',
      ape_m: '',
      correo: '',
      id_horario: 0,
      id_departamento: 0,
      id_cargo: 0,
      estado: true
    };
    this.editando = false;
    this.mostrarForm = true;
  };

  cerrarFormulario = () => {
    this.empleado = {
      id: 0,
      dni: 0,
      nombre: '',
      ape_p: '',
      ape_m: '',
      correo: '',
      id_horario: 0,
      id_departamento: 0,
      id_cargo: 0,
      estado: true
    };
    this.editando = false;
    this.mostrarForm = false;
  };

  add = () => {
    const { dni, nombre, ape_p, ape_m, correo, id_horario, id_departamento, id_cargo } = this.empleado;

    if (
      !dni || !nombre.trim() || !ape_p.trim() || !ape_m.trim() || !correo.trim() ||
      id_horario === 0 || id_departamento === 0 || id_cargo === 0
    ) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    const yaExiste = this.empleadosService.empleado.some(e =>
      e.dni === dni || e.correo.toLowerCase() === correo.toLowerCase()
    );

    if (yaExiste) {
      alert('Ya existe un empleado con ese DNI o correo.');
      return;
    }

    this.empleadosService.add({ ...this.empleado });
    this.cerrarFormulario();
  };


  editarEmpleado = (empleado: Empleados) => {
    this.empleado = { ...empleado };
    this.EmpleadoOriginal = { ...empleado };
    this.editando = true;
    this.mostrarForm = true;
  };

  actualizar = () => {
    const { id, dni, nombre, ape_p, ape_m, correo, id_horario, id_departamento, id_cargo } = this.empleado;

    if (
      !dni || !nombre.trim() || !ape_p.trim() || !ape_m.trim() || !correo.trim() ||
      id_horario === 0 || id_departamento === 0 || id_cargo === 0
    ) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    // Verificar si el correo ya está siendo usado por otro empleado
    const correoExistente = this.empleadosService.empleado.some(e =>
      e.correo.toLowerCase() === correo.toLowerCase() && e.id !== id
    );

    if (correoExistente) {
      alert('El correo ya está registrado por otro empleado.');
      return;
    }

    // Verificar si no hubo cambios
    if (
      this.EmpleadoOriginal &&
      JSON.stringify(this.EmpleadoOriginal) === JSON.stringify(this.empleado)
    ) {
      alert('No se realizaron cambios.');
      return;
    }

    // Actualizar
    this.empleadosService.actualizar({ ...this.empleado });
    this.cerrarFormulario();
  };


  activarEmpleado(empleado: Empleados): void {
    this.empleadosService.cambiarEstado(empleado.id, true);
    empleado.estado = true;
  }

  desactivarEmpleado(empleado: Empleados): void {
    this.empleadosService.cambiarEstado(empleado.id, false);
    empleado.estado = false;
  }
}
