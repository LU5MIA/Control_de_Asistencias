export interface Usuarios {
    id: number,
    id_empleado: number,
    foto_usuario?: string
    nombre_usuario: string,
    password: string,
    id_rol: number,
    estado: boolean
}
