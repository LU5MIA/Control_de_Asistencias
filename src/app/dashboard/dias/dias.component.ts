import { Component } from '@angular/core';
import { DiasService } from '../../servicios/dias.service';
import { Dias } from '../../interfaces/dias';

@Component({
  selector: 'app-dias',
  standalone: false,
  templateUrl: './dias.component.html',
  styleUrl: './dias.component.css'
})
export class DiasComponent {

  filtro: string = '';

  constructor(private diasService: DiasService) { }

  get dia(): Dias[] {
    return this.diasService.dia
  }

  get diasFiltrados(): Dias[] {
    const termino = this.filtro.trim().toLowerCase();
    return this.diasService.dia.filter(dias =>
      dias.nombre.toLowerCase().includes(termino)
    );
  }

  activarDia(dia: Dias): void {
    this.diasService.cambiarEstado(dia.id, true);
    dia.estado = true;
  }

  desactivarDia(dia: Dias): void {
    this.diasService.cambiarEstado(dia.id, false);
    dia.estado = false;
  }

}
