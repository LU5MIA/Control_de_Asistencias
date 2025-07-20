import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { SublevelMenuComponent } from './sidenav/sublevel-menu.component';
import { CargosComponent } from './cargos/cargos.component';
import { DepartamentosComponent } from './departamentos/departamentos.component';
import { DiasComponent } from './dias/dias.component';
import { HorariosComponent } from './horarios/horarios.component';
import { RouterModule } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { HorariosDiasComponent } from './horarios-dias/horarios-dias.component';
import { PermisosComponent } from './permisos/permisos.component';
import { RolesComponent } from './roles/roles.component';
import { RolesPermisosComponent } from './roles-permisos/roles-permisos.component';
import { PanelControlComponent } from './panel-control/panel-control.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SidenavComponent,
    SublevelMenuComponent,
    DashboardLayoutComponent,
    CargosComponent,
    DepartamentosComponent,
    DiasComponent,
    HorariosComponent,
    HorariosDiasComponent,
    PermisosComponent,
    RolesComponent,
    RolesPermisosComponent,
    BodyComponent,
    DashboardLayoutComponent,
    PanelControlComponent,
    PerfilComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    DashboardRoutingModule
  ],
  exports: [
    CargosComponent,
    DepartamentosComponent,
    DiasComponent,
    HorariosComponent,
    BodyComponent
  ]
  
})
export class DashboardModule { }
