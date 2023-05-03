
import { Observable } from "rxjs";
import { StationConfiguration } from "../../../station-configuration";



export interface error {
    CODIGO: number;
    MENSAJE: string;
}


export interface CustomCard {
    header: string;
    icon: string;
    value: string;
    color: string;
}




/**
 * Filtros para el alta/modificacion del perfil del empleado.
 */
 export interface FormPsico {
    legajo: string | null;
    sucursalsolicitante: string | null;
    fecha: Date | null;
    sector: string | null;
    puestopostulado: string | null;
    postula: string | null;
    result: string | null;
    psicologo: string | null;
    bateriatests: string | null;
    tieneveraz: boolean | null;
    observaciones: string | null;
    activo: boolean | null;
    apellidonombre: string | null;
    cargo: string | null;
    refpsico: boolean| null;
    gr_prof: string| null;
    doc_tipo: string | null;
    doc_nro: string | null;
    idcarga: string| null;
    nombreusuario: string| null;
    nombreequipo: string| null;
    tab: string| null;
    id: number;
  
}


export interface Building {
    id: number;
    address: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    photo: string | null;
    status: Status | null;
    __entity: string;
}



export interface Appartment {
    id: number;
    building: Building;
    tenant: Tenant | null;
    floor: number;
    division: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    photo: string | null;
    status: Status;
    __entity: string;
}

export interface Tenant {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    id_appartment: number;
    id_user: number
    __entity: string;
}


export interface Owner {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    id_appartment: number;
    id_user: number
    __entity: string;
}


export interface Status{
    id: number;
    name: string;
    __entity: string;
}

