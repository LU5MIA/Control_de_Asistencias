import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformeComponent } from './informe/informe.component';
import { AsistenciasComponent } from './asistencias.component';
import { RegistroComponent } from './registro/registro.component';
import { InformeGeneralComponent } from './informe-general/informe-general.component';
import { JustificacionesComponent } from './justificaciones/justificaciones.component';

const routes: Routes = [
  {
    path: 'justificaciones',
    component: AsistenciasComponent
  },
  {
    path: 'justificaciones-generales',
    component: JustificacionesComponent
  },
  {
    path: 'informe',
    component: InformeComponent
  },
  {
    path: 'informe-general',
    component: InformeGeneralComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsistenciasRoutingModule { }
