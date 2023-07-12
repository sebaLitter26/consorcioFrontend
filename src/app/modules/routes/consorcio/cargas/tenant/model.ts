/** Los tipos de novedad. */
export enum NoveltyType {
    FALTANTE = 1,
    SOBRANTE = 2,
    DEFECTUOSO = 3,
    NO_APTO = 4,
}

export const NOVELTY_STATES_PRIORITY: {[key: string]: number} = {
    "wip": 0,
    "nok": 1,
    "ok": 2,
}

export interface Novelty {
    id_tipo_novedad: NoveltyType;
    imagen: string;
    estado: ProcessState;
    fecha: string;
    fecha_ult_actualizacion: string;
    hostname: string;
    id_novedad: string;
    id_reserva: string;
    novedad: string;
    nro_expedicion: number;
    nro_viaje: number;
    pallet_wf: string;
    pedido_wf: string;
    solicitud_wf: string;
    usuario: string;
    autorizaciones: NoveltyAuthorization[];
    series: ReservationSerial[];    
    reservasOT: ReservationWorkOrder[];
    altoProducto: number;
    anchoProducto: number;
    cantidadComponentes: number;
    codigoTipoSerializable: SerializableType;
    descripcion: string;
    ean: string;
    longitudProducto: number;
    peso: number;
    plu: string;
    poseeSerie: YesNo | null;
    serializaProducto: YesNo | null;
    stock: number;
    tipoDeElectro: string;
    tipoSerializable: string;
    unidadDePeso: string;
    unidadDeVolumen: string;
    volumen: number;
}

export interface NoveltyAuthorization {
    accion: string | null;
    estado: ProcessState;
    hostname: string | null;
    id_accion: number;
    id_novedad: string;
    id_rol: number;
    id_tipo_novedad: NoveltyType;
    observacion: string | null;
    orden: number;
    roll: string | null;
    permisos: string;
    usuario: string | null;
    tag: string | null;
    nombre: string | null;
}

export interface CurrentNoveltiesResolvedData {
    novelties: Novelty[];
}



export interface NoveltyAction {
    text: string;
    icon: string;
    dialogTitle: string;
    dialogMessage: string;
    dialogColor: "warn" | "accent" | "primary";
    clickFn: (observation: string) => void;
}

export interface NoveltyUpdatePayload {
    novedad: string;
    orden: number;
    aprueba: boolean;
    usuario: string;
    hostname: string;
    observacion: string;
    ubicacion: string;
}

export interface NoveltyTypeOption {
    value: NoveltyType;
    displayValue: string;
}

export interface NoveltyStateOption {
    value: ProcessState;
    displayValue: string;
}

export interface NoveltyFilters {
    tipoNovedad: NoveltyType[] | null;
    estado: ProcessState[] | null;
    fechaDesde: string | null;
    fechaHasta: string | null;
    nroReserva: string | null;
}

export interface CustomCard<T> {
    header: string;
    icon: string;
    value: string;
    color: string;
}