
export const RESOURCE_CRM: string = "crm";

export const RESOURCE_WAREFLOW: string = "wareflow";

export const RESOURCE_TRACK: string = "track";

export const RRHH: string = "RRHH";

export const GRAL: string = "GRAL";

export const ACCOUNT: string = "ACCOUNT";



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


export interface Building{
    id: number;
    localidad: string;
    direccion: string;
    altura: number;
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
    status: string;
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
    id_user: number;
}

export interface Identification{

    building: string;
    depto: string;
    floor: number;
    phone: number;
}


export interface Order extends Identification{
    cart: Product[];
    observaciones: string;
    id: number;
}

export interface Product{
    brand: string;
    photo: string;
    price: number;
    name: string;
    stock: number;

}
