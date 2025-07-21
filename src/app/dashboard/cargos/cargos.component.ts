import { Component, Input } from '@angular/core';
import { CargosService } from '../../servicios/cargos.service';
import { Cargos } from '../../interfaces/cargos';

@Component({
  selector: 'app-cargos',
  standalone: false,
  templateUrl: './cargos.component.html',
  styleUrl: './cargos.component.css'
})
export class CargosComponent {

  CargoOriginal: Cargos | null = null;
  filtro: string = '';
  mostrarForm = false; // controla la visibilidad
  editando: boolean = false;

  constructor(private cargosService: CargosService) { }

  cargo: Cargos = {
    id: 0,
    nombre: "",
    estado: true
  }

  get cargos(): Cargos[] {
    return this.cargosService.cargos
  }

  get cargosFiltrados(): Cargos[] {
    const termino = this.filtro.trim().toLowerCase();
    return this.cargosService.cargos.filter(cargo =>
      cargo.nombre.toLowerCase().includes(termino)
    );
  }

  add = () => {
    const nombre = this.cargo.nombre.trim();

    if (nombre.length === 0) return;

    // Verificar si el nombre ya existe (ignorando mayúsculas/minúsculas)
    const yaExiste = this.cargosService.cargos.some(c => c.nombre.toLowerCase() === nombre.toLowerCase());

    if (yaExiste) {
      alert('Ya existe un cargo con ese nombre');
      return;
    }

    this.cargosService.add(this.cargo);
    this.cerrarFormulario();
  };


  editarCargo = (cargo: Cargos) => {
    this.cargo = { ...cargo }; // copia los datos del cargo a editar
    this.CargoOriginal = { ...cargo };
    this.mostrarForm = true;
    this.editando = true;
  };

  actualizar = () => {
    const nombre = this.cargo.nombre.trim();

    if (nombre.length === 0) return;
    const yaExiste = this.cargosService.cargos.some(c =>
      c.id !== this.cargo.id && c.nombre.toLowerCase() === nombre.toLowerCase()
    );

    if (
      this.CargoOriginal &&
      nombre.toLowerCase() === this.CargoOriginal.nombre.toLowerCase()
    ) {
      alert('No se realizaron cambios');
      return;
    }


    if (yaExiste) {
      alert('Ya existe otro cargo con ese nombre');
      return;
    }

    this.cargosService.actualizar(this.cargo);
    this.cerrarFormulario();
  };

  activarCargo(cargo: Cargos): void {
    this.cargosService.cambiarEstado(cargo.id, true);
    cargo.estado = true;
  }
 
  desactivarCargo(cargo: Cargos): void {
    this.cargosService.cambiarEstado(cargo.id, false);
    cargo.estado = false;
  }

  abrirFormularioAgregar = () => {
    this.cargo = { id: 0, nombre: '', estado: true }; // limpia los campos
    this.editando = false;                            // cambia a modo agregar
    this.mostrarForm = true;                          // muestra el formulario
  };

  cerrarFormulario = () => {
    this.cargo = { id: 0, nombre: '', estado: true };
    this.mostrarForm = false;
    this.editando = false;
  };

  /* remover(cargos:Cargos){
    this.cargosService.remover(cargos);
    return this.cargosService.cargos
  } */


}
