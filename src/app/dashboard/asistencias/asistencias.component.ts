import { Component } from '@angular/core';

@Component({
  selector: 'app-asistencias',
  standalone: false,
  templateUrl: './asistencias.component.html',
  styleUrl: './asistencias.component.css'
})
export class AsistenciasComponent {
  mostrarArchivados: boolean = false;

  cambiarVistaArchivados() {
    this.mostrarArchivados = !this.mostrarArchivados;
  }

}
