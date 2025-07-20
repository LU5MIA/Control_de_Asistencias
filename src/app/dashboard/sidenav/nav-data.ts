import { INavbarData } from "./helper";

//Añadir INavarData[]

export const navbarData:INavbarData[] = [
    {
        routeLink: 'panel-control',
        icon: 'fal fa-home',
        label: 'Panel_de_control'
    },
    {
        routeLink: 'asistencias',
        icon: 'bi bi-clock-fill',
        label: 'Asistencias',
        items: [
            {
                routeLink:'asistencias/registro',
                label:'Registro',
            },
            {
                routeLink:'asistencias/informe',
                label:'Informe',
            },
            {
                routeLink:'asistencias/informe-general',
                label:'Informe General',
            },
            {
                routeLink:'asistencias/justificaciones-generales',
                label:'Justificaciones',
            },
            {
                routeLink:'asistencias/justificaciones',
                label:'Justificaciones',
            },
            
        ]
    },
    {
        routeLink: 'departamentos',
        icon: 'bi bi-building',
        label: 'Departamentos'
    },
    {
        routeLink: 'cargos',
        icon: 'bi bi-briefcase-fill',
        label: 'Cargos'
    },
    {
        routeLink: 'roles',
        icon: 'bi bi-people-fill',
        label: 'Roles'
    },
    {
        routeLink: 'permisos',
        icon: 'bi bi-key-fill',
        label: 'Permisos'
    },
    {
        routeLink: 'roles-permisos',
        icon: 'bi bi-shield-lock-fill',
        label: 'Roles_Permisos',
    },
    {
        routeLink: 'horarios',
        icon: 'bi bi-calendar-check-fill',
        label: 'Horarios'
    },
    {
        routeLink: 'horarios-dias',
        icon: 'bi bi-calendar-day-fill',
        label: 'Horarios_dias',
    },
    {
        routeLink: 'dias',
        icon: 'bi bi-calendar-event-fill',
        label: 'Dias'
    },
    {
        routeLink: 'acceso',
        icon: 'bi bi-door-open-fill',
        label: 'Acceso',
        items: [
            {
                routeLink:'acceso/empleados',
                label:'Empleados',
            },
            {
                routeLink:'acceso/usuarios',
                label:'Usuarios',
            },
            
        ]
    },
    {
        routeLink: 'perfil',
        icon: '	bi bi-person-circle',
        label: 'Perfil'
    },
    
]