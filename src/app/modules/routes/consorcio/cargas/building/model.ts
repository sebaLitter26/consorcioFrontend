import { BuildingStateStyle } from ".";

/** Tipo de conteo en formato `string`. */
export type BuildingStateType = "Creado" | "Informado" | "Iniciado" | "Pausado" | "Finalizado" | "Cerrado conforme" | "Cerrado" | "Cancelado";

/** Mapa de `BuildingStateType` a `BuildingState`. */
export const BUILDING_STATE_ENUM_MAP: {[keys in BuildingStateType]: BuildingState} = {
    "Creado": BuildingState.CREADO,
    "Informado": BuildingState.INFORMADO,
    "Iniciado": BuildingState.INICIADO,
    "Pausado": BuildingState.PAUSADO,
    "Finalizado": BuildingState.FINALIZADO,
    "Cerrado conforme": BuildingState.CERRADO_CONFORME,
    "Cerrado": BuildingState.CERRADO,
    "Cancelado": BuildingState.CANCELADO,
}

/** Estados que puede tomar un conteo */
export const enum BuildingState {
    CREADO = 1,
    INFORMADO = 2, 
    INICIADO = 3,
    PAUSADO = 4,  
    FINALIZADO = 5, 
    CERRADO_CONFORME = 6, 
    CERRADO = 7, 
    CANCELADO = 8,
}

/** Tipos de un conteo */
export enum BuildingType {
    TODOS_LOS_PLU = 1,
    UN_PLU = 2,
}
 
/** Estados de un serie de un conteo. */
export enum BuildingSerialState {
    PENDIENTE = 1,
    NO_LEIDO = 2,
    LEIDO = 3,
    AGREGADO = 4,
}

/** 
 * Mapa de estilos de etiquetas para los estados de los conteos.
 * Define la forma en la que se muestran los estados de los conteos en el listado de conteos.
 */
 export const BUILDING_STATE_MAP: {[keys in BuildingState]: BuildingStateStyle} = {
    1: {
        label: "Creado",
        color: "white",
        backgroundColor: "#45B39D ",
    },
    2: {
        label: "Informado",
        color: "white",
        backgroundColor: "#85C1E9",
    },
    3: {
        label: "Iniciado",
        color: "white",
        backgroundColor: "#F5B041",
    },
    4: {
        label: "Pausado",
        color: "white",
        backgroundColor: "#FFC300",
    },
    5: {
        label: "Finalizado",
        color: "white",
        backgroundColor: "#99A3A4",
    },
    6: {
        label: "Cerrado conforme",
        color: "white",
        backgroundColor: "#99A3A4",
    },
    7: {
        label: "Cerrado",
        color: "white",
        backgroundColor: "#99A3A4",
    },
    8: {
        label: "Cancelado",
        color: "white",
        backgroundColor: "#E74C3C",
    },
}

/** 
 * Mapa de estilos de etiquetas para los estados de los series de un conteo.
 * Define la forma en la que se muestran los estados de los series de un conteo en el listado de series de un conteo.
 */
export const BUILDING_SERIAL_STATE_MAP: {[keys in BuildingSerialState]: BuildingStateStyle} = {
    1: {
        label: "Pendiente",
        color: "white",
        backgroundColor: "#45B39D ",
    },
    2: {
        label: "No leído",
        color: "white",
        backgroundColor: "#85C1E9",
    },
    3: {
        label: "Leído",
        color: "white",
        backgroundColor: "#F5B041",
    },
    4: {
        label: "Agregado",
        color: "white",
        backgroundColor: "#FFC300",
    },
}