import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccesoRoutingModule } from './acceso-routing.module';
import { AccesoComponent } from './acceso.component';
import { EmpleadosComponent } from './empleados/empleados.component';


@NgModule({
  declarations: [
    AccesoComponent,
    EmpleadosComponent,
    
  ],
  imports: [
    CommonModule,
    AccesoRoutingModule
  ] 
})
export class AccesoModule { }
