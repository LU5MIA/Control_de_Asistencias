import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccesoRoutingModule } from './acceso-routing.module';
import { AccesoComponent } from './acceso.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AccesoComponent,
    EmpleadosComponent,
     
  ],
  imports: [
    CommonModule,
    AccesoRoutingModule,
    FormsModule
  ] 
})
export class AccesoModule { }
