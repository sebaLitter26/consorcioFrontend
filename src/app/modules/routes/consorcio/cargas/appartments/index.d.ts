export interface FilterCupos {
    fechadesde: string | null,
    fechahasta: string | null,
    sucursal: string | null,
}

export interface CuposUpdatePayload {
    cuponuevo: number;
    //ntuser: string;
    tipo: string;
    idhecf: number;
    //ip: string;
}


export interface CupoSeleccionado {
    SUCURSAL: string;
    TIPO: string;
    BANDAS: number[];
}

export interface CupoSucursal{
    idhorariosentregacuposfecha: number;
    nomfecha:string;
    dia: number;
    hora: number;
    cupomaximo: number;
    cupomaximonuevo: number;
    cupoutilizado: number;
    error: boolean;
}

export interface CupoSelection{
    selected?: boolean;
    idhorariosentregacuposfecha: number;
    nomfecha:string;
    dia: number;
    hora: number;
    cupomaximo: number;
    cupomaximonuevo: number;
    cupoutilizado: number;
    error: boolean;
}

export interface UpdateResponse{
    error: number[];
    ok: number[];
}

export interface CuposHistorico{
    cuposofrecidos: number;
    cuposvendidos: number;
    diasemana:string;
    fecha: string;
    horacupo: string;
    nrosemana: string;
    promediosemanalcuposofrecidos: number;
    promediosemanalcuposvendidos: number;
    semanafin: string;
    semanainicio: string;
    sucursal: number;
    vendidosofrecidos: number;
}

export interface Sucursal{
    id_suc: number;
    localidad: string;
    direccion: string;
    descripcion: string;
}
