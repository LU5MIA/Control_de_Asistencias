import { INavbarData } from "./helper";

//Añadir INavarData[]

export const navbarData:INavbarData[] = [
    {
        routeLink: 'panel-control',
        icon: 'fal fa-home',
        label: 'Panel_de_control',
        rolesPermitidos: ['Administrador']

        
    },
    {
        routeLink: 'asistencias',
        icon: 'bi bi-clock-fill',
        label: 'Asistencias',
        items: [
            {
                routeLink:'asistencias/registro',
                label:'Registro',
                rolesPermitidos: ['Empleado']
            },
            {
                routeLink:'asistencias/informe',
                label:'Informe',
                rolesPermitidos: ['Empleado']
            },
            {
                routeLink:'asistencias/informe-general',
                label:'Informe General',
                rolesPermitidos: ['Administrador']
            },
            {
                routeLink:'asistencias/justificaciones-generales',
                label:'Justificaciones',
                rolesPermitidos: ['Administrador']
            },
            {
                routeLink:'asistencias/justificaciones',
                label:'Justificaciones',
                rolesPermitidos: ['Empleado']
            },
            
        ]
    },
    {
        routeLink: 'departamentos',
        icon: 'bi bi-building',
        label: 'Departamentos',
        rolesPermitidos: ['Administrador']
    },
    {
        routeLink: 'cargos',
        icon: 'bi bi-briefcase-fill',
        label: 'Cargos',
        rolesPermitidos: ['Administrador']
    },
    {
        routeLink: 'roles',
        icon: 'bi bi-people-fill',
        label: 'Roles',
        rolesPermitidos: ['Administrador']
    },
    {
        routeLink: 'permisos',
        icon: 'bi bi-key-fill',
        label: 'Permisos',
        rolesPermitidos: ['Administrador']
    },
    {
        routeLink: 'roles-permisos',
        icon: 'bi bi-shield-lock-fill',
        label: 'Roles_Permisos',
        rolesPermitidos: ['Administrador']
    },
    {
        routeLink: 'horarios',
        icon: 'bi bi-calendar-check-fill',
        label: 'Horarios',
        rolesPermitidos: ['Administrador']
    },
    {
        routeLink: 'horarios-dias',
        icon: 'bi bi-calendar-day-fill',
        label: 'Horarios_dias',
        rolesPermitidos: ['Administrador']
    },
    {
        routeLink: 'dias',
        icon: 'bi bi-calendar-event-fill',
        label: 'Dias',
        rolesPermitidos: ['Administrador']

    },
    {
        routeLink: 'acceso',
        icon: 'bi bi-door-open-fill',
        label: 'Acceso',
        rolesPermitidos: ['Administrador'],
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
        label: 'Perfil',
        rolesPermitidos: ['Empleado']
    },
    
]