import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const usuario = localStorage.getItem('usuarioLogueado');
    const rolUsuario = localStorage.getItem('rolUsuario'); // guardado en login

    if (!usuario || !rolUsuario) {
      this.router.navigate(['/login']);
      return false;
    }

    const rolPermitido = route.data['rol'];
    if (rolPermitido && rolUsuario !== rolPermitido) {
      alert('Acceso denegado: No tienes permisos para acceder a esta ruta.');
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
