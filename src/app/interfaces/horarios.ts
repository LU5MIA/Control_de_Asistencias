
export interface Horarios {
    id: number
    turno: '' | 'Mañana' | 'Tarde' | 'Noche';
    modalidad: '' | 'Presencial' | 'Virtual';
    hora_entrada: string
    tolerancia: number
    hora_salida: string
    estado: boolean
}
