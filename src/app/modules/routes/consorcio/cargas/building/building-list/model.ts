import { BuildingStateStyle } from "..";
import { BuildingState } from "../model";



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


// CREADO = "Creado",
// INFORMADO = "Informado", 
// INICIADO = "Iniciado",  
// FINALIZADO = "Finalizado", 
// CERRADO_CONFORME = "Cerrado conforme", 
// CERRADO = "Cerrado con diferencias", 
// CANCELADO = "Cancelado",