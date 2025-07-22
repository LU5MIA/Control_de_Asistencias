import { Component, OnInit, OnDestroy } from '@angular/core';
import { AsistenciaService } from '../../servicios/asistencia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-panel-control',
  standalone: false,
  templateUrl: './panel-control.component.html',
  styleUrls: ['./panel-control.component.css']
})
export class PanelControlComponent implements OnInit, OnDestroy {
  cantidadEntradas: number = 0;
  cantidadSalidas: number = 0;
  cantidadCompletas: number = 0;
  private subscription: Subscription = new Subscription();

  constructor(public asitenciasService: AsistenciaService) {}

  ngOnInit(): void {
    // Forzar recarga inicial
    this.asitenciasService.cargarAsistenciasDesdeLocalStorage();
    this.subscription = this.asitenciasService.asistencias$.subscribe(asistencias => {
      console.log('Asistencias recibidas:', asistencias);
      this.cantidadEntradas = asistencias.filter(a => a.tipo === 'Entrada').length;
      this.cantidadSalidas = asistencias.filter(a => a.tipo === 'Salida').length;
      this.cantidadCompletas = this.asitenciasService.cantidadCompletas; // Usar getter del servicio
      console.log('Contadores:', {
        entradas: this.cantidadEntradas,
        salidas: this.cantidadSalidas,
        completas: this.cantidadCompletas
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}