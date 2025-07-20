import { Component } from '@angular/core';

@Component({
  selector: 'app-justificaciones',
  standalone: false,
  templateUrl: './justificaciones.component.html',
  styleUrl: './justificaciones.component.css'
})
export class JustificacionesComponent {
  mostrarArchivados: boolean = false;

  cambiarVistaArchivados() {
    this.mostrarArchivados = !this.mostrarArchivados;
  }
}
