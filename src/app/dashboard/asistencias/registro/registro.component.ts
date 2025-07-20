import { Component } from '@angular/core';

@Component({
  selector: 'app-registro',
  standalone: false,
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  horaActual: string = '';
  private intervalId: any;
  nombreArchivo: string = '';

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.nombreArchivo = input.files[0].name;
    } else {
      this.nombreArchivo = '';
    }
  }

  ngOnInit(): void {
    this.actualizarHora();
    this.intervalId = setInterval(() => {
      this.actualizarHora();
    }, 1000); // cada segundo
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId); // limpiar al destruir componente
  }

  actualizarHora(): void {
    const ahora = new Date();

    const dia = this.padCero(ahora.getDate());
    const mes = this.padCero(ahora.getMonth() + 1); // Los meses empiezan desde 0
    const anio = ahora.getFullYear();

    const horas = this.padCero(ahora.getHours());
    const minutos = this.padCero(ahora.getMinutes());
    const segundos = this.padCero(ahora.getSeconds());

    this.horaActual = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
  }

  padCero(valor: number): string {
    return valor < 10 ? '0' + valor : valor.toString();
  }



  marcarAsistencia(): void {
    // Lógica para enviar asistencia
    console.log("Asistencia registrada a las:", this.horaActual);
  }
}
