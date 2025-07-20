import { Component } from '@angular/core';
import { DepartamentosService } from '../../servicios/departamentos.service';
import { Departamentos } from '../../interfaces/departamentos';

@Component({
  selector: 'app-departamentos',
  standalone: false,
  templateUrl: './departamentos.component.html',
  styleUrl: './departamentos.component.css'
})
export class DepartamentosComponent {

  DepartamentoOriginal: Departamentos | null = null;
  filtro: string = '';
  mostrarForm = false; // controla la visibilidad
  editando: boolean = false;

  constructor(private departamentosService: DepartamentosService) { }

  dpto: Departamentos = {
    id: 0,
    nombre: "",
    estado: true
  }

  abrirFormularioAgregar = () => {
    this.dpto = { id: 0, nombre: '', estado: true }; // limpia los campos
    this.editando = false;                            // cambia a modo agregar
    this.mostrarForm = true;                          // muestra el formulario
  };

  cerrarFormulario = () => {
    this.dpto = { id: 0, nombre: '', estado: true };
    this.mostrarForm = false;
    this.editando = false;
  };

  get departamentos(): Departamentos[] {
    return this.departamentosService.departamentos
  }

  get dptoFiltrados(): Departamentos[] {
    const termino = this.filtro.trim().toLowerCase();
    return this.departamentosService.departamentos.filter(dpto =>
      dpto.nombre.toLowerCase().includes(termino)
    );
  }

  add = () => {
    const nombre = this.dpto.nombre.trim();

    if (nombre.length === 0) return;

    // Verificar si el nombre ya existe (ignorando mayúsculas/minúsculas)
    const yaExiste = this.departamentosService.departamentos.some(d => d.nombre.toLowerCase() === nombre.toLowerCase());

    if (yaExiste) {
      alert('Ya existe un cargo con ese nombre');
      return;
    }

    this.departamentosService.add(this.dpto);
    this.cerrarFormulario();
  };


  editarDpto = (dpto: Departamentos) => {
    this.dpto = { ...dpto }; // copia los datos del cargo a editar
    this.DepartamentoOriginal = { ...dpto };
    this.mostrarForm = true;
    this.editando = true;
  };

  actualizar = () => {
    const nombre = this.dpto.nombre.trim();

    if (nombre.length === 0) return;
    const yaExiste = this.departamentosService.departamentos.some(c =>
      c.id !== this.dpto.id && c.nombre.toLowerCase() === nombre.toLowerCase()
    );

    if (
      this.DepartamentoOriginal &&
      nombre.toLowerCase() === this.DepartamentoOriginal.nombre.toLowerCase()
    ) {
      alert('No se realizaron cambios');
      return;
    }

    if (yaExiste) {
      alert('Ya existe otro cargo con ese nombre');
      return;
    }

    this.departamentosService.actualizar(this.dpto);
    this.cerrarFormulario();
  };

  activarDpto(dpto: Departamentos): void {
    this.departamentosService.cambiarEstado(dpto.id, true);
    dpto.estado = true;
  }

  desactivarDpto(dpto: Departamentos): void {
    this.departamentosService.cambiarEstado(dpto.id, false);
    dpto.estado = false;
  }

}
