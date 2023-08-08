import { BuildingSerialState, BuildingState, BuildingStateType, BuildingType } from "./model";

export type ActionName = "update" | "delete" | "detail";

/** El detalle del building */
export interface BuildingDetail {
    building: Building;
    flujo: BuildingFlow[];
    series: BuildingSerial[];
}

/** Los datos que contiene el edificio */
export interface Building {
    id: string
    floors: number
    letter: string 
    appartments: any[]
    createdAt: string 
    updatedAt: string
    address: string
    location: string
    images: string[]
    /*
    id_estado: BuildingState,
    estado: BuildingStateType, 
    nombre: string,
    hostname: string,
    flujo: BuildingFlow[];
    eventos: BuildingEvent[];
    series: BuildingSerial[]; 
    */
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
    address: string
    location: string
    floors: number
    letter: string
    images: string[] | null
}

/** Payload para informar un building */
export interface UpdateBuildingPayload extends CreateBuildingPayload {
    id: string;
}

/** Payload para cancelar un building */
export interface IDBuildingPayload {
    id: string
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
    address: string | null
    location: string | null
    floors: number | null
}

export interface CustomCard {
    header: string;
    icon: string;
    value: string;
    color: string;
}