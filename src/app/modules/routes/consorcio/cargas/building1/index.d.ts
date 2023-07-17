import { BuildingSerialState, BuildingState, BuildingStateType, BuildingType } from "./model";

export type ActionName = "informar" | "cancelar" | "detalle";

/** El detalle del building */
export interface BuildingDetail {
    building: Building;
    flujo: BuildingFlow[];
    series: BuildingSerial[];
}

/** El building de uno o de todos los productos */
export interface Building {
    id_building: number, 
    id_estado: BuildingState,
    estado: BuildingStateType,
    id_tipo_building: number,
    tipo_building: string, 
    plu: string | null, 
    producto?: BuildingsListProduct,
    fecha: string, 
    legajo: string,
    nombre: string,
    hostname: string,
    flujo: BuildingFlow[];
    eventos: BuildingEvent[];
    series: BuildingSerial[];
}
export interface BuildingsResolvedData {
    Buildings: Building[];
}

/**El producto del building en caso de ser para un plu */
export interface BuildingsListProduct {
    plu: string,
    descripcion?: string,
    imagen: string,
}

/** La accion que se puede realizar del building */
export interface BuildingAction {
    name: ActionName;
    title: string;
    icon: string;
    color?: string;
    availableStates: BuildingState[] | null;
    permission?: string;
}

/** Evento de un building */
export interface BuildingEvent{
    estado: BuildingStateType,
    fecha: string,
    usuario: string,
}


/** Evento de un building */
export interface BuildingSerial {
    producto?: BuildingsListProduct,
    descripcion: string,
    fecha: string,
    fecha_ult_actualizacion: string,
    grupo: number,
    hostname: string,
    id_building: number,
    id_estado: BuildingSerialState,
    id_serie: string,
    idt_buildings_serie: number,
    legajo: string,
    nombre: string,
    plu: string,
    sububicacion_esperada: string | null,
    sububicacion_leida: string | null,
}

/** Evento de un building */
export interface BuildingFlow {
    estado: BuildingStateType,
    fecha: string, 
    hostname: string,
    id_building: number, 
    id_estado: BuildingState,
    idt_building_flujo: number,
    legajo: string,
    nombre: string,
}

export interface BuildingStateStyle {
    label: string;
    color: string;
    backgroundColor: string;
}


/** Payload para la creacion de un building */
export interface CreateBuildingPayload{
    id_tipo_building: number,
    plu: string | null,
    hostname: string | null,
}

/** Payload para informar un building */
export interface InformBuildingPayload {
    id_building: number,
    hostname: string | null;
}

/** Payload para cancelar un building */
export interface CancelBuildingPayload {
    id_building: number,
    hostname: string | null;
}

export interface BuildingTypeOption {
    value: BuildingType,
    displayValue: string,
}

export interface BuildingStateOption {
    value: BuildingState,
    displayValue: string,
}

export interface BuildingListFilters {
    tipo_building: BuildingType[],
    fechaDesde: string | null,
    fechaHasta: string | null,
    estado: BuildingState[],
    id_building: number | null,
    plu: string | null,
    usuario: string | null,
}

export interface CustomCard {
    header: string;
    icon: string;
    value: string;
    color: string;
}