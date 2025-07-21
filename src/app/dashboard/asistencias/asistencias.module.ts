import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsistenciasRoutingModule } from './asistencias-routing.module';
import { AsistenciasComponent } from './asistencias.component';
import { InformeComponent } from './informe/informe.component';
import { RegistroComponent } from './registro/registro.component';
import { InformeGeneralComponent } from './informe-general/informe-general.component';
import { JustificacionesComponent } from './justificaciones/justificaciones.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AsistenciasComponent,
    InformeComponent,
    RegistroComponent,
    InformeGeneralComponent,
    JustificacionesComponent,
     
  ],
  imports: [
    CommonModule,
    AsistenciasRoutingModule,
    FormsModule
  ]
})
export class AsistenciasModule { }
