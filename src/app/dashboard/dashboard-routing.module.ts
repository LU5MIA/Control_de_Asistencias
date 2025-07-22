// dashboard-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { CargosComponent } from './cargos/cargos.component';
import { DepartamentosComponent } from './departamentos/departamentos.component';
import { DiasComponent } from './dias/dias.component';
import { HorariosComponent } from './horarios/horarios.component';
import { PanelControlComponent } from './panel-control/panel-control.component';
import { RolesComponent } from './roles/roles.component';
import { PermisosComponent } from './permisos/permisos.component';
import { HorariosDiasComponent } from './horarios-dias/horarios-dias.component';
import { RolesPermisosComponent } from './roles-permisos/roles-permisos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: 'panel-control', pathMatch: 'full' },
      {
        path: 'panel-control',
        component: PanelControlComponent,
        canActivate: [AuthGuard],
        data: { rol: 'Administrador' }
      },
      { path: 'roles', component: RolesComponent },
      { path: 'permisos', component: PermisosComponent },
      { path: 'roles-permisos', component: RolesPermisosComponent },
      { path: 'cargos', component: CargosComponent },
      { path: 'departamentos', component: DepartamentosComponent },
      { path: 'horarios-dias', component: HorariosDiasComponent },
      { path: 'dias', component: DiasComponent },
      { path: 'horarios', component: HorariosComponent },
      { path: 'perfil', component: PerfilComponent },
      {
        path: 'asistencias',
        loadChildren: () => import('./asistencias/asistencias.module').then(m => m.AsistenciasModule)
      },
      {
        path: 'acceso',
        loadChildren: () => import('./acceso/acceso.module').then(m => m.AccesoModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
