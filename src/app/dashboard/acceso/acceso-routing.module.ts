import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccesoComponent } from './acceso.component';
import { EmpleadosComponent } from './empleados/empleados.component';

const routes: Routes = [
  {
    path: 'empleados',
    component: EmpleadosComponent
  },
  {
    path: 'usuarios',
    component: AccesoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccesoRoutingModule {
}
