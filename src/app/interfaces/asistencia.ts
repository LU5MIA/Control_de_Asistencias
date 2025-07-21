export interface Asistencia {
    id_asistencia: number,
    id_empleado: number,
    marcacion: string,
    tipo: '' | 'Entrada' | 'Salida',
    foto: string,
    estado:''| 'Registrado' | 'Tarde' | 'Justificacion'
}
