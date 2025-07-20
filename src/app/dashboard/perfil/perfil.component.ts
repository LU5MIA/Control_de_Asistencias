import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  nombreArchivo: string = '';

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.nombreArchivo = input.files[0].name;
    } else {
      this.nombreArchivo = '';
    }
  }

}
